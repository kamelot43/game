import {Link} from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import Card from "./components/Card/Card";
import React, { useEffect, useState } from 'react';

//styles
import "./Game.scss";

//lib
import {shuffle} from "./lib/ shuffle";
import { v4 as uuidv4 } from 'uuid';

export default function Game() {
  const [data, setData] = useState([]);
  const dispatch = useDispatch();
  const roundCounter = useSelector((state) => state.game.round);
  const increaseRoundCounter = () => dispatch({ type: 'game/increaseGameCounter', payload: {}});
  const currentDifficultyLevel = useSelector((state) => state.game.difficultyLevel);
  const EASY_LEVEL_BOARD_SIZE = 2;
  const NORMAL_LEVEL_BOARD_SIZE = 3;
  const HARD_LEVEL_BOARD_SIZE = 4;

  const PrepareBoard = () => {
    let actualBoardSize;

    switch (currentDifficultyLevel) {
      case 'easy':
        actualBoardSize = EASY_LEVEL_BOARD_SIZE;
        break;
      case 'normal':
        actualBoardSize = NORMAL_LEVEL_BOARD_SIZE;
        break;
      case 'hard':
        actualBoardSize = HARD_LEVEL_BOARD_SIZE;
        break;
      default:
        actualBoardSize = EASY_LEVEL_BOARD_SIZE;
    }

    const post = useSelector(state => {
      const prepareData = state['photos'].photos.slice();
      const mutateData = shuffle(prepareData).filter((item, index) => index < actualBoardSize);
      const MultiplyData = mutateData.concat(mutateData);
      const finishedData = shuffle(MultiplyData);
      return finishedData;
    });
    return post;
  }

  const prepareData = PrepareBoard();

  useEffect(() => {
    if(!data.length > 0) {
      setData(prepareData);
    }
  }, [data]);

  return (
    <div className="game">
      <div className="container">
        <main>
          <h2>Game Page !</h2>
          <p>You can do this, I believe in you.</p>
          <div>Round : {roundCounter}</div>
          <button
            onClick={() => {
              setData(prepareData);
              increaseRoundCounter();
            }
          }
          >Обновить данные</button>
          <div className={`game__wrapper game__wrapper_${currentDifficultyLevel}`}>
            {data.length > 0 && data.map((element, index) => {
              return (
                <Card
                  key={uuidv4()}
                  data={element}
                />
              )
            })}
          </div>
        </main>
        <nav>
          <Link to="/">Main</Link>
        </nav>
      </div>
    </div>
  );
}
