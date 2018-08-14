import React from "react";
import "./Jumbotron.css";
import LogInBtn from "../LogInBtn";
import SignUpBtn from "../SignUpBtn";

const Jumbotron = props => (

    <div className="jumbotron">
        <h1 className="display-4">Discovery: From Leaf to Tree!</h1>

      <p className="lead">You find a leaf and we'll do the rest.</p>

       <hr className="my-4" />

      
      <LogInBtn />
      <SignUpBtn />


    </div>
);

export default Jumbotron;
