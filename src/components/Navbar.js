import React from "react";
import PropTypes from "prop-types";
import "./Navbar.css";

const Navbar = ({ onNewGame }) => (
  <ul className="nav">
    <li>Memory Game</li>
    <li>
      <button onClick={onNewGame}>new Game</button>
    </li>
  </ul>
);

Navbar.propTypes = {
  onNewGame: PropTypes.func.isRequired
};

export default Navbar;
