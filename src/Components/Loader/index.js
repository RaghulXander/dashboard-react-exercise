// src/components/Loader.js

import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames/bind";

import styles from "./style.css";

const cx = classNames.bind(styles);

const Loader = ({ className, small, bttn, active, disabled }) => {
  const classes = cx(
    "segment-spinner",
    {
      "segment-spinner--small": small,
      "segment-spinner--bttn": bttn,
      "segment-spinner--disabled": !active && disabled,
    },
    className
  );

  return (
    <div className={cx("loadingBar")}>
      <span className={classes} />
    </div>
  );
};

Loader.displayName = "Loader";

Loader.propTypes = {
  /** Display Active. */
  active: PropTypes.bool,
  /** For Loaders in Button. */
  bttn: PropTypes.bool,
  /** Extend Styles. */
  className: PropTypes.string,
  /** Display Disabled. */
  disabled: PropTypes.bool,
  /** Small Loader. */
  small: PropTypes.bool,
};

Loader.defaultProps = {
  active: true,
  className: null,
  disabled: false,
  small: false,
};

export default Loader;
