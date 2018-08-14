import React from "react";
import "./Loading.css";
import loader from "../../images/loader.gif";

const Loading = props => {
    <div className="loader-wrapper" style={{ display: "inline-block" }}>
        <img src={ loader } />
    </div>   
};

export default Loading;


