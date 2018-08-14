import React from "react";
import { Link } from "react-router-dom";
import "./LogOutBtn.css";

const LogOutBtn = props => (

    <div>
        <button id="logout" type="button" className="btn btn-success"
        onClick={this.logout}>
            Log Out
        </button>
    </div>
);

export default LogOutBtn;
