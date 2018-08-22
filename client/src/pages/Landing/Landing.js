import React, { Component } from "react";
import "./Landing.css";
import Header from "../../components/Header";
import Jumbotron from "../../components/Jumbotron";
import Footer from "../../components/Footer";

class Landing extends Component {

  render() {
    return (
      <div className="background">
        <Header />

        <Jumbotron />

        <Footer />
      </div>  
    );
  }
}

export default Landing;
