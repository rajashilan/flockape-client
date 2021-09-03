import React, { Component } from "react";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

import "../styles/Notifications.css";

import PropTypes from "prop-types";
import { connect } from "react-redux";

export class Notifications extends Component {
  render() {
    const {
      notification: {
        sender,
        recipient,
        contentName,
        contentID,
        contentImg,
        read,
        senderProfileImg,
        createdAt,
        type,
      },
    } = this.props;

    dayjs.extend(relativeTime);

    let time;
    time = dayjs(createdAt).fromNow();

    let notificationTitle;
    let albumDetailsDisplay;
    if (type === "album") {
      notificationTitle = `@${sender} started following your Book
        "${contentName}."`;
      albumDetailsDisplay = (
        <Link to={`/${recipient}/book/${contentID}`}>
          <div className="notifications-details-container">
            <h3 className="notifications-details-action">
              {notificationTitle}
            </h3>
            <p className="notifications-details-contentCreatedAt">{time}</p>
          </div>
        </Link>
      );
    } else if (type === "link") {
      notificationTitle = `@${sender} liked your page
        "${contentName}."`;
      albumDetailsDisplay = (
        <div className="notifications-details-container">
          <h3 className="notifications-details-action">{notificationTitle}</h3>
          <p className="notifications-details-contentCreatedAt">{time}</p>
        </div>
      );
    }

    return (
      <div className="notifications-container">
        <Link to={`/@${sender}`} className="notifications-link">
          <img
            src={senderProfileImg}
            className="notifications-sender-profileImg"
          />
        </Link>
        {albumDetailsDisplay}
        <img src={contentImg} className="notifications-contentImg" />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
});

Notifications.propTypes = {
  user: PropTypes.object.isRequired,
  notification: PropTypes.object.isRequired,
};

export default connect(mapStateToProps)(Notifications);
