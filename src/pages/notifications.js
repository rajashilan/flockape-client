import React, { Component } from "react";

import Notifications from "../components/Notifications";

import {
  markNotificationsRead,
  getNotificationsPagination,
  clearNoticiationsPagination,
} from "../redux/actions/userActions";

import { resetScrollListener } from "../redux/actions/dataActions";

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
    window.addEventListener("scroll", this.handleScroll);
  }

  componentWillUnmount() {
    this.props.resetScrollListener();
    this.props.clearNoticiationsPagination();
    window.removeEventListener("scroll", this.handleScroll);
  }

  handleScroll = () => {
    let difference = document.documentElement.scrollHeight - window.innerHeight;
    var scrollposition = document.documentElement.scrollTop;

    if (
      difference - scrollposition <= 250 &&
      !this.props.user.loadingNotifications &&
      this.props.data.scrollListener
    ) {
      if (this.props.notifications.length > 0) {
        const notificationDetail = {
          limit: this.props.notifications[this.props.notifications.length - 1],
        };

        this.props.getNotificationsPagination(notificationDetail);
      }
    }
  };

  render() {
    const notifications = this.props.notifications;
    const loading = this.props.user.loading;
    const loadingNotifications = this.props.user.loadingNotifications;

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

    let loadingNotificationsText = loadingNotifications ? (
      <p>Loading pagination</p>
    ) : null;

    return (
      <div className="notifications-main-overall-container">
        <div className="notifications-card-container">
          <div className="notifications-main-container">
            {notificationDisplay}
          </div>
          {loadingNotificationsText}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
  data: state.data,
  notifications: state.user.notifications,
});

const mapActionToProps = {
  markNotificationsRead,
  getNotificationsPagination,
  clearNoticiationsPagination,
  resetScrollListener,
};

notifications.propTypes = {
  user: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
  notifications: PropTypes.array.isRequired,
  markNotificationsRead: PropTypes.func.isRequired,
  getNotificationsPagination: PropTypes.func.isRequired,
  clearNoticiationsPagination: PropTypes.func.isRequired,
  resetScrollListener: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapActionToProps)(notifications);
