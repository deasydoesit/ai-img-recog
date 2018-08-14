import React from "react";
import { Link } from "react-router-dom";
import "./SignUpBtn.css";

const SignUpBtn = props => (

    <Link to="/signup">
        <button type="button" className="btn btn-success"
          id="suButton">
            Sign Up
        </button>
    </Link>
);

export default SignUpBtn;
