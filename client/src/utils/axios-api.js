import axios from "axios";


export default {


  signUp: function(obj) {
    return axios.post('/api/account/signup', obj);
  },
  // .then(function (response) {
  // this.setState({
  //   signUpError: json.message,
  //   signUpUser: '',
  //   signUpPass: ''
  // })
  signIn: function(obj) {
    return axios.get('/api/account/signup', obj);
  },

  logOut: function(obj) {
    return axios.post('/api/account/signup', obj);
  },

  verify: function(token) {
    return axios.get('/api/account/verify?token=' + token)
}

}
