import React, { Component, Fragment } from "react";

import PropTypes from "prop-types";
import { connect } from "react-redux";

export class VerificationLabel extends Component {
  render() {
    return (
      <Fragment>
        <p className="label-verification">
          A verification link has been sent to your email. Please click the link
          and complete your registration process to start creating Books.
        </p>
        <p className="label-verification-yellow">
          If you have already verified, please log out and log in. Thank you :)
        </p>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
});

VerificationLabel.propTypes = {
  user: PropTypes.object.isRequired,
};

export default connect(mapStateToProps)(VerificationLabel);
