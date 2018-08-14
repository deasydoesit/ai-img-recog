import React from "react";
import { Link } from "react-router-dom";
import "./LogInBtn.css";

const LogInBtn = props => (

    <Link to="/signin">
      <button
        className="submit-button btn btn-success"
        type="button"
        id="siButton">
        Sign In
    </button></Link>
);

export default LogInBtn;
