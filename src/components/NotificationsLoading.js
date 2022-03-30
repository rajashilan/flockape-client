import React, { Component } from "react";

import "../styles/Notifications.css";

export class NotificationsLoading extends Component {
  render() {
    return (
      <div className="notifications-container">
        <div className="notifications-sender-profileImg-loading"></div>
        <div className="notifications-details-container">
          <div className="notifications-details-action-loading"></div>
          <div className="notifications-details-contentCreatedAt-loading"></div>
        </div>
        <div className="notifications-contentImg-loading"></div>
      </div>
    );
  }
}

export default NotificationsLoading;
