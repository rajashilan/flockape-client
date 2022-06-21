import React, { Component } from "react";
import { Link } from "react-router-dom";

import "../styles/notFound.css";

import errorImage from "../components/images/404Error@2x.png";

export class notFound extends Component {
  render() {
    return (
      <div className="notFound-main-container">
        <div className="notFound-card-container">
          <div className="notFound-inner-container">
            <div className="notFound-text-container">
              <h3 className="notFound-text">Oops! Looks like you're lost.</h3>
            </div>
            <div className="notFound-link-container">
              <h3 className="notFound-text">Let's take you back</h3>
              <Link to="/" className="notFound-link">
                home.
              </Link>
            </div>
          </div>
          <div className="notFound-img-container">
            <img className="notFound-img" src={errorImage} alt="" />
          </div>
        </div>
      </div>
    );
  }
}

export default notFound;
