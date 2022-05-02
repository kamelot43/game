import "./Button.scss";

import PropTypes from "prop-types";
import React from 'react';

const Button = ({type, isActive, text, onClickHandler = () => {}}) => {
  return (
    <div
      className={`button${isActive ? ` button_${type}_active` : ''} button_${type}`}
      onClick={() => {
        onClickHandler();
      }}
    >
      {text}
    </div>
  )}

Button.propTypes = {
  type: PropTypes.string,
  text: PropTypes.string,
  isActive: PropTypes.bool,
  onClickHandler: PropTypes.func,
}

Button.defaultProps = {
  type: 'green'
};

export default Button;