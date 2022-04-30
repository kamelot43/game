import {Link} from "react-router-dom";
import {useSelector, useDispatch} from 'react-redux';
import React, { useEffect } from 'react';

export default function Welcome() {
  const dispatch = useDispatch();
  const easyDifficulty = () => dispatch({ type: 'game/chooseGameDifficulty', payload: 'easy'});
  const normalDifficulty = () => dispatch({ type: 'game/chooseGameDifficulty', payload: 'normal'});
  const hardDifficulty = () => dispatch({ type: 'game/chooseGameDifficulty', payload: 'hard'});
  const newGameStatus = () => dispatch({ type: 'game/newGameStatus', payload: {}});
  const clearGameCounter = () => dispatch({ type: 'game/clearGameCounter', payload: {}});
  const currentDifficultyLevel = useSelector((state) => state.game.difficultyLevel);

  useEffect(() => {
    newGameStatus();
    clearGameCounter();
  }, []);

  return (
    <div>
      <div className="container">
        <main>
          <h2>Welcome to Game</h2>
          <p>Сhoose the size of the playing field</p>
          <h2>current difficulty level is {currentDifficultyLevel}</h2>

          <div>
            <button type="button" className="button" onClick={easyDifficulty}>2 x 2</button>
            <button type="button" className="button" onClick={normalDifficulty}>3 x 3</button>
            <button type="button" className="button" onClick={hardDifficulty}>4 x 4</button>
          </div>
        </main>
        <nav>
          <Link to="/game">Play</Link>
        </nav>
      </div>
    </div>
  );
}
