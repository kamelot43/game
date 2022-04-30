import "./Card.scss";

import PropTypes from "prop-types";
import React from 'react';

const Card = ({data = [],  onClickHandler = () => {}}) => {
  const {url, id, uuid, visited} = data;

  return (
    <div
      className={`card${visited ? ' card_visible' : ''}`}
      onClick={() => {
        onClickHandler({'id': id, 'uuid' : uuid});
      }}
    >
      <div className="card__inner">
        <div className="card__front">
          <div className="card__uuid">{uuid}</div>
          <img src={url} alt="/"/>
        </div>
        <div className="card__back">
          <div>Back Side</div>
        </div>
      </div>
    </div>
)}

Card.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.string,
    uuid: PropTypes.string,
    visited: PropTypes.bool,
    url: PropTypes.string,
  }),
  onClickHandler: PropTypes.func,
}

export default Card;