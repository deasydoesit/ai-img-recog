import React, { Component } from "react";
import { Redirect } from "react-router";
import { setInStorage } from '../../utils/storage';
import Input from "../../components/Input";
import API from "../../utils/API";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

import "./SignIn.css";


class SignIn extends Component {
  constructor(props) {
      super(props);
      this.state = {
          token: '',
          signInUser: '',
          signInPass: '',
          signInError: '',
          fireRedirect: false
      }

    this.HandleInputChangeSignInPass = this.HandleInputChangeSignInPass.bind(this);
    this.HandleInputChangeSignInUser = this.HandleInputChangeSignInUser.bind(this);
    this.onSignIn = this.onSignIn.bind(this);
  }

  HandleInputChangeSignInUser(event) {
    this.setState({
      signInUser: event.target.value
    });
  }

  HandleInputChangeSignInPass(event) {
    this.setState({
      signInPass: event.target.value
    });
  }

  onSignIn(e) {
    e.preventDefault()
    const {
      signInUser,
      signInPass
    } = this.state

    let siObj = {
      username: signInUser,
      password: signInPass
    }

    API.signIn(siObj)
      .then(json => {
        console.log(json)
        if (json.data.success === true) {
          console.log(json.data.token);
          console.log(json.data);
          setInStorage('the_main-app', { token: json.data.token });
          this.setState({
            signInError: json.data.message,
            isLoading: false,
            signInUser: '',
            signInPass: '',
            token: json.data.token
          });
          this.setState({ fireRedirect: true });
        } else {
          console.log(json.data.success);
          this.setState({
            signInError: json.message,
            isLoading: false
          })
          this.setState({ signInError: true });
        }

      });
  }

  render() {
    const {
      signInUser,
      signInPass,
      fireRedirect
    } = this.state;
      return (
        <div className="signInPage">
          {/* <Container> */}
            <Header/>
            <form className="signIn-form">
                <h3 className="signin-heading"> Hello </h3>
                <Input
                    type="text"
                    placeholder="Username"
                    value={signInUser}
                    onChange={this.HandleInputChangeSignInUser}/>
                <Input
                    type="password"
                    placeholder="Password"
                    value={signInPass}
                    onChange={this.HandleInputChangeSignInPass}/>
                <br />
                <button type="button" className="btn btn-success" id="signin" onClick={this.onSignIn}>Sign In</button>
                <br></br>
                  {
                    this.state.signInError ? <p id="error">Invalid Username or Password</p> : <br/>
                  }
            </form>
            {fireRedirect && (
              <Redirect to={'/profile'} />
            )}
            <Footer />

        {/* </Container> */}
      </div>
    );
  }

}


export default SignIn;
