import React from "react";
import PropTypes from "prop-types";
import "./Card.css";

const Card = props => {
  let style = {};
  if (props.showing) {
    style.backgroundColor = props.backgroundColor;
  }
  return <div onClick={props.onClick} className="card" style={style} />;
};

Card.prototypes = {
  showing: PropTypes.bool.isRequired,
  backgroundColor: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
};

export default Card;
