import axios from "axios";

export default {

  postImage: function(data) {
    return axios.post("/api/image-upload", data);
  },

  signUp: function(obj) {
    return axios.post('/api/account/signup', obj);
  },

  signIn: function(obj) {
    return axios.post('/api/account/signin', obj);
  },

  logOut: function(obj) {
    return axios.post('/api/account/logout', obj);
  },

  verify: function(token) {
    return axios.get('/api/account/verify?token=' + token)
}

};
