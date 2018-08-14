# Leafy
> Discovery: From Leaf to Tree. You find a leaf and we'll do the rest!

Leafy is a full stack, MERN application that identifies user submitted leaves. A user may post a picture of a leaf that they've come across and Leafy will perform image recognition analysis on the image to identify what species of tree to which the leaf belongs. Currently, Leafy serves as a minimum viable product / proof of concept as it is able to seamlessly identify a select quantity of trees (e.g., Eastern redbud, Ginkgo, Pine, Southern Magnolia, and Swamp White Oak) focalized around the Washington, D.C. region. It is our intention to continue to train the image recognition analysis engine to identify a greater variety of species in our local area, then expand into additional regions. 

If you'd like to contribute to our efforts, we are actively looking for contributors to help us expand our identification capabilities! To do so, just submit a .zip file comprising 25-30 images of your particular tree species in .jpg/.png format with a minimum resolution of 250 x 250 px. Please name your .zip file with the following semantic convention and specify the common name of the tree (e.g., american_sycamore.zip, ginkgo.zip, swamp_white_oak.zip, etc.) and we'll handle retraining our image recognition analysis engine.

## Tech

On the front-end, Leafy is driven by React and interfaces with a Node/Express server and Mongo database. In order to enable user image submission, we used react-cropper to allow users to create base64 square croppings of their image. We then generate a .jpg image file from the base64 cropping, which is submitted to the server. Doing so had the dual benefit of standardizing image dimensions for rendering purposes later on and also reducing image file size for upload. 

At the server, the user submitted image is stored in an AWS S3 bucket. The path to the AWS stored image is then sent to a custom-trained IBM Watson visual recognition instance for analysis. Upon analysis completion from Watson, a database insert is made capturing the AWS path, Watson results, and metadata corresponding to the image such as name, scientific name, and range image path information. Lastly, the resulting database insert is returned to the client for rendering.

Please see below for further information about the technologies used in this project:

  https://github.com/roadmanfong/react-cropper
  
  https://www.ibm.com/watson/services/visual-recognition/
  

## Instructions

In order to use Leafy, you first must create an account. This allows us to associate your submitted images with your account and return them to you upon accessing the profile page. 

Once on the profile page, simply upload an image which you wish to be identified. Leafy will request that you take a square cropping of the image. Don't fret if you cannot get the whole image in the square cropping, but just make sure that you get as many prominent features of your leaf in the cropping. Next, hit crop then submit and Leafy will do the remainder of the work behind the scenes. The results will be dynamically generated when ready!
  
## Contributing

1. Fork it (<https://github.com/deasydoesit/ai-img-recog>)
2. Create your feature branch (`git checkout -b feature/fooBar`)
3. Commit your changes (`git commit -am 'Add some fooBar'`)
4. Push to the branch (`git push origin feature/fooBar`)
5. Create a new Pull Request 
