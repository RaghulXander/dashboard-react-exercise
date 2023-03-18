// src/components/Card.js

import React from "react";
import cx from "classnames";

const Card = ({ id = "card", className = "", title, description }) => {
  return (
    <div id={`card-${id}`} className={cx("stats-box", className)}>
      <div className="stats-box-heading">{title}</div>
      <div className="stats-box-info" id={id}>
        {description}
      </div>
    </div>
  );
};

export default Card;
