import React, { Component } from "react";
import { Link } from "react-router-dom";

import Notifications from "../components/Notifications";

import { markNotificationsRead } from "../redux/actions/userActions";

import "../styles/Notifications.css";

import PropTypes from "prop-types";
import { connect } from "react-redux";

export class notifications extends Component {
  componentDidMount() {
    //return an array of notification ids of reads that are false
    if (this.props.notifications) {
      let unreadNotificationIds = this.props.notifications
        .filter((notification) => !notification.read)
        .map((notification) => notification.notificationID);
      this.props.markNotificationsRead(unreadNotificationIds);
    }
  }

  render() {
    const notifications = this.props.notifications;
    const loading = this.props.user.loading;

    let notificationDisplay = !loading ? (
      notifications && notifications.length > 0 ? (
        notifications.map((notification) => (
          <Notifications
            key={notification.notificationID}
            notification={notification}
          />
        ))
      ) : (
        <h2 className="notifications-default-title">
          You don't have any notifications.
        </h2>
      )
    ) : (
      <h2 className="notifications-default-title">Loading...</h2>
    );

    return (
      <div className="notifications-main-container">{notificationDisplay}</div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
  notifications: state.user.notifications,
});

const mapActionToProps = {
  markNotificationsRead,
};

notifications.propTypes = {
  user: PropTypes.object.isRequired,
  notifications: PropTypes.array.isRequired,
  markNotificationsRead: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapActionToProps)(notifications);
