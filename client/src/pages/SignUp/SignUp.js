import React, { Component } from "react";
import { Redirect } from "react-router";
import "./SignUp.css";
import Input from "../../components/Input";
import API from "../../utils/API";
import Header from "../../components/Header";
import Footer from "../../components/Footer";


class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: '',
      signUpUser: '',
      signUpPass: '',
      fireRedirect: false
    }

    this.HandleInputChangeSignUpUser = this.HandleInputChangeSignUpUser.bind(this);
    this.HandleInputChangeSignUpPass = this.HandleInputChangeSignUpPass.bind(this);
    this.onSignUp = this.onSignUp.bind(this);
  }

  HandleInputChangeSignUpUser(event) {
    this.setState({
      signUpUser: event.target.value
    });
  }

  HandleInputChangeSignUpPass(event) {
    this.setState({
      signUpPass: event.target.value
    });
  }

  onSignUp(e) {
    e.preventDefault()
    this.setState({ fireRedirect: true });
    const {
      signUpUser,
      signUpPass
    } = this.state
    console.log(signUpUser + signUpPass);
    let suObj = {
      username: signUpUser,
      password: signUpPass
    }
    API.signUp(suObj);
  }

  render() {
    const {
      signUpUser,
      signUpPass,
      fireRedirect
    } = this.state;
    

    return (
      // <Container fluid>
      <div className="signUpPage">
          <Header />
          <form className="signUp-form">
            <h1 className="signup-heading"> Create a Profile </h1>
            <Input
              type="text"
              placeholder="Username"
              value={signUpUser}
              onChange={this.HandleInputChangeSignUpUser} />
            <Input
              type="password"
              placeholder="Password"
              value={signUpPass}
              onChange={this.HandleInputChangeSignUpPass} />
            <br />
            <button type="button" className="btn btn-sucess" id="signup" onClick={this.onSignUp}>Sign Up</button>
          </form>
          {fireRedirect && (
            <Redirect to={'/signin'} />
          )}
          <Footer />
        </div>
      // </Container>
    );
  }
}



export default SignUp;
