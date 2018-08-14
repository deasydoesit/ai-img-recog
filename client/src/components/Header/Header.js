import React, { Component } from "react";
import "./Header.css";
import magnifiedleaf from "../../images/magnified-leaf.png";
import { Link } from "react-router-dom";

class Header extends Component {
    render() {
        return (
            <div className="logo">
                <Link to="/">
                <img src={magnifiedleaf} alt="Leaf under magnifying glass"/>
                </Link>
                <h1>Leafy</h1>

            </div>
        );
    }
}
export default Header;
