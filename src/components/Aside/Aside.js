import "./Aside.scss";

import PropTypes from "prop-types";
import React from 'react';
import {Link} from "react-router-dom";
import Button from "../Button/Button";
import {useSelector} from "react-redux";

const Aside = ({title, subtitle, winStatusClickHandler = () => {}, looseStatusClickHandler = () => {}}) => {
  const roundCounter = useSelector((state) => state.game.round);
  const rightAnswersCounter = useSelector((state) => state.game.rightAnswers);
  const gameStatus = useSelector((state) => state.game.gameStatus);

  return (
    <div className="aside">
      <nav>
        <Link to="/">
          <Button type="black" text="BACK"/>
        </Link>
      </nav>
      <h2>{title}</h2>
      <p>{subtitle}</p>
      <div className="aside__text">Round : <strong>{roundCounter}</strong></div>
      <div className="aside__text">Right Answers Counter :  <strong>{rightAnswersCounter}</strong></div>
      <div className="aside__text">Game status is  <strong>{gameStatus}</strong></div>
      <div className="aside__button-section">
        {gameStatus === 'win' &&
          <Button
            onClickHandler={() => {
              winStatusClickHandler();
            }}
            type="green"
            text="Repeat Game"
          />
        }
        {gameStatus === 'loose' &&
          <Button
            onClickHandler={() => {
              looseStatusClickHandler();
            }}
            type="blue"
            text="Next round"
          />
        }
      </div>
    </div>
  )}

Aside.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  winStatusClickHandler: PropTypes.func,
  looseStatusClickHandler: PropTypes.func,
}

Aside.defaultProps = {
  title: 'Game Page!',
  subtitle: 'You can do this, I believe in you.',
};

export default Aside;