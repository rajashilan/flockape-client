import React, { Component } from "react";

import "../styles/ProfileCardMain.css";

export class ProfileCardMainLoading extends Component {
  render() {
    return (
      <div>
        <div className="profileCardMain-top-container">
          <div className="profileCardMain-img-loading" />
          <div className="profileCardMain-username-loading"></div>
          <div className="profileCardMain-details-container">
            <div className="profileCardMain-details-loading"></div>
            <div className="profileCardMain-details-loading"></div>
            <div className="profileCardMain-details-loading-last"></div>
          </div>
        </div>
        <div className="profileCardMain-bottom-container">
          <div className="profileCardMain-name-loading"></div>
          <div className="profileCardMain-other-details-loading"></div>
          <div className="profileCardMain-other-details-loading"></div>
          <div className="profileCardMain-other-details-loading"></div>
          <div className="profileCardMain-other-details-loading"></div>
        </div>
      </div>
    );
  }
}

export default ProfileCardMainLoading;
