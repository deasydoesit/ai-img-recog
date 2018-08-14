import axios from "axios";

export default {

  postImage: function(token, data) {
    return axios.post('/api/image/image-upload/' + token, data);
  },

  signUp: function(obj) {
    return axios.post('/api/account/signup', obj);
  },

  signIn: function(obj) {
    return axios.post('/api/account/signin', obj);
  },

  logOut: function(token) {
    return axios.get('/api/account/logout?token=' + token);
  },

  verify: function(token) {
    return axios.get('/api/account/verify?token=' + token);
  },

  getTrees: function(token) {
    return axios.get('/api/user_trees/' + token);
  }

};
