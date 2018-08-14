require('dotenv').config();
const aws = require('aws-sdk');
const multerS3 = require('multer-s3');
const multer = require('multer');
const VisualRecognitionV3 = require('watson-developer-cloud/visual-recognition/v3');
const db = require('../models');
const mongoose = require('mongoose');


// Initialize Mongo
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/leafy";
mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI);
//---*

// Initiaize Watson Visual Recognition
const visualRecognition = new VisualRecognitionV3({
  version: process.env.WATSON_VERSION,
  iam_apikey: process.env.WATSON_APIKEY
});
//---*

// Initialize AWS
aws.config.update({
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  region: 'us-east-1'
});

const s3 = new aws.S3();

let upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: "leafy-me/public",
        key: function (req, file, cb) {
            console.log(file);
            let path = "https://s3.amazonaws.com/leafy-me/public/";
            let newImage = file.fieldname + Date.now() + ".jpg";
            path += newImage;
            cb(null, newImage);
        }
    })
});  
//---*

module.exports = function (app) {

  // Function 
  app.get('/api/user_trees/:token', function(req, res) {
    console.log(req.params.token);
    console.log(mongoose.Types.ObjectId(req.params.token));
    db.UserSession.find({_id: mongoose.Types.ObjectId(req.params.token)}) //req.params.token
        .then(function(session) {
          db.Post.find({user_id: session[0].userId})
            .then(function(trees) {
              console.log("hello");
              res.send(trees);
            })
            .catch(function(err) {
              return res.json(err);
            });
          })
          .catch(function(err) {
            return res.json(err);
          });
    });

  // Route for image upload to AWS, Watson processing, etc.
  app.post('/api/image/image-upload/:token', upload.single('photo'), function(req, res, next) {

      let token = req.params.token; 
      let user_id = '';
      db.UserSession.find({_id: mongoose.Types.ObjectId(req.params.token)})
        .then(function(res) {
          console.log(res);
          user_id = res[0].userId;
          console.log(res[0].userId);
        })
      // Set up Watson parameters

      let image_url =  req.file.location;
      const classifier_ids = ["trees_447821576"];
      const threshold = 0.6;

      let params = {
          url: image_url,
          classifier_ids: classifier_ids,
          threshold: threshold
      };
      //---*

      visualRecognition.classify(params, function(err, response) { // Watson request
          if (err) {
            console.log(err);
          }
          else //get Watson results back
            console.log(JSON.stringify(response, null, 2));
            let trees = response.images[0].classifiers[0].classes; // Access Watson returned tree types
            if (trees.length === 0) { // If there are no tree types, respond client that the image isn't recognized
              res.send("Image not recognized");
            } else if (trees.length === 1) { // If there is one tree type, make a database entry and return tree data to client
            // Mongo storage
              let result = {};
              result.path = image_url;
              result.name = trees[0].class;
              console.log(user_id);
              db.Tree.find({name: result.name})
                  .then(function(tree) {
                      result.user_id = user_id;
                      result.sciName = tree[0].sciName;
                      result.range = tree[0].range;
                      db.Post.create(result)
                          .then(function(dbPost) {
                              console.log(dbPost)
                              res.send(dbPost);
                          })
                          .catch(function(err) {
                              return res.json(err);
                          });
                  })
            //---*
              } else { // If there are more than one tree types identified, ask client for help.
                  res.send("Please pick one of these images");
              }
      });
  });

  // --------------sign up------------------------------------------------------------
  app.post('/api/account/signup', (req, res, next) => {
    const { body } = req;
    const {
      username,
      password
    } = body;

    if (!username) {
      return res.send({
        success: false,
        message: "Username required."
      });
    }

    if (!password) {
      return res.send({
        success: false,
        message: "Password required."
      });
    }

    db.User.find({
      username: username
    }, (err, previousUsers) => {
      if (err) {
        return res.send({
          success: false,
          message: "Error"
        });
      } else if (previousUsers.length > 0) {
        return res.send({
          success: false,
          message: "Username is taken."
        })
      }

      const newUser = new db.User();
      newUser.username = username;
      newUser.password = newUser.generateHash(password);
      newUser.save((err, user) => {
        if (err) {
          return res.send({
            success: false,
            message: "Server error"
          })
        }
        return res.send({
          success: true,
          message: "Sign Up successful!"
        })
      })
    })
  });

  // --------------sign in -----------------------------------------------------------
  app.post('/api/account/signin', (req, res, next) => {
    const { body } = req;
    const {
      username,
      password
    } = body;

    if (!username) {
      return res.send({
        success: false,
        message: "Username required."
      });
    }

    if (!password) {
      return res.send({
        success: false,
        message: "Password required."
      });
    }

    db.User.find({
      username: username
    }, (err, users) => {
      if (err) {
        return res.send({
          success: false,
          message: "Server Error"
        });
      }
      if (users.length != 1) {
        return res.send({
          success: false,
          message: "Invalid"
        })
      }

      const user = users[0];
      if (!user.validPassword(password)) {
        return res.send({
          success: false,
          message: "Invalid"
        })
      }

      const userSession = new db.UserSession();
      userSession.userId = user._id;
      userSession.save((err, doc) => {
        if (err) {
          return res.send({
            success: false,
            message: "Server Error"
          });
        }
        console.log(doc);
        return res.send({
          success: true,
          message: "Sign In successful",
          token: doc._id
        });
      });
    });
  });

  // --------------verify--------------------------------------------------------------
  app.get('/api/account/verify', (req, res, next) => {

    const { query } = req;
    const { token } = query;

    db.UserSession.find({
      _id: token,
      isDeleted: false
    }, (err, sessions) => {
      if (err) {
        return res.send({
          success: false,
          message: "Server Error"
        })
      }

      if (sessions.length != 1) {
        return res.send({
          success: false,
          message: "Invalid"
        })
      }

      else {
        return res.send({
          success: true,
          message: 'good'
        })
      }
    })
  })

  // ---------------logout-------------------------------------------------------------
  app.get('/api/account/logout', (req, res, next) => {
    const { query } = req;
    const { token } = query;

    db.UserSession.findOneAndUpdate({
      _id: token,
      isDeleted: false
    }, {
        $set: { isDeleted: true }
      }, null, (err, sessions) => {
        if (err) {
          return res.send({
            success: false,
            message: "Server Error"
          })
        }

        return res.send({
          success: true,
          message: 'good'
        })
      })
  })
};
