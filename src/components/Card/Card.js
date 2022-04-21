import "./Card.scss";

import PropTypes from "prop-types";
import React, { useState } from 'react';

const Card = ({data = [], onClick}) => {
  const {albumId, id, title, url, uuid, visited} = data;

  return (
    <div
      className={`card${visited ? ' card_visible' : ''}`}
      onClick={() => {
        onClick(uuid);
      }}
    >
      <div className="card__inner">
        <div className="card__front">
          <div>Front Side</div>
          <div>albumId is {albumId}</div>
          <div>id is {id}</div>
          <div>title is {title}</div>
          <img src={url} alt="" width={150} height={150}/>
        </div>
        <div className="card__back">
          <div>Back Side</div>
        </div>
      </div>
    </div>
)}

Card.propTypes = {
  data: PropTypes.shape({
    albumId: PropTypes.number,
    id: PropTypes.number,
    uuid: PropTypes.string,
    visited: PropTypes.bool,
    title: PropTypes.string,
    url: PropTypes.string,
  })
}

export default Card;