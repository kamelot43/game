import { useSelector, useDispatch } from 'react-redux'
import Card from "./components/Card/Card";
import React, { useEffect, useState } from 'react';

//styles
import "./Game.scss";

//lib
import {shuffle} from "./lib/ shuffle";
import { v4 as uuidv4 } from 'uuid';

//components
import Aside from "./components/Aside/Aside";

export default function Game() {
  const [data, setData] = useState([]);
  const [activeIndex, setActiveIndex] = useState(null);

  const dispatch = useDispatch();
  const increaseRightAnswersCounter = () => dispatch({ type: 'game/increaseRightAnswers', payload: {}});
  const checkGameStatus = () => dispatch({ type: 'game/checkGameStatus', payload: {}});
  const gameOverStatus = () => dispatch({ type: 'game/gameOverStatus', payload: {}});
  const newGameStatus = () => dispatch({ type: 'game/newGameStatus', payload: {}});
  const clearGameCounter = () => dispatch({ type: 'game/clearGameCounter', payload: {}});
  const currentDifficultyLevel = useSelector((state) => state.game.difficultyLevel);
  const gameStatus = useSelector((state) => state.game.gameStatus);

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
      const multiplyData = mutateData.concat(mutateData);
      const transformData = multiplyData.map((it) => {
        return Object.assign({'uuid': uuidv4().slice(0, 7), 'visited' : false}, it);
      });
      return shuffle(transformData);
    });
    return post;
  }

  const prepareData = PrepareBoard();

  const visitedPostItem = payload => {
    if(gameStatus === 'progress') {
      let cloneData = [...data];
      let indexOfItem = cloneData.findIndex(item => item.uuid === payload.uuid);

      cloneData[indexOfItem] = {
        ...cloneData[indexOfItem],
        visited: true
      };

      setData(cloneData);
    }
  };

  const clearVisitedStatus = () => {
    let cloneData = [...data];
    const transformData = cloneData.map((it) => {
      return Object.assign(it, {'visited' : false});
    });

    setData(transformData);
  }

  const checkActiveIndex = payload => {
    if(gameStatus === 'progress') {
      let indexOfItem = data.findIndex(item => item.uuid === payload.uuid);
      const target = data[indexOfItem];

      if(activeIndex === null && target.visited !== true) {
        setActiveIndex(
          {'id': target.id, 'uuid': target.uuid}
        );
      } else if (activeIndex.id === target.id && activeIndex.uuid !== target.uuid && target.visited !== true) {
        setActiveIndex(null);
        increaseRightAnswersCounter();
        checkGameStatus();
      } else if (activeIndex.id !== target.id && activeIndex.uuid !== target.uuid) {
        gameOverStatus();
        setActiveIndex(null);
      }
    }
  };

  useEffect(() => {
    if(!data.length > 0) {
      setData(prepareData);
    }
  }, [data]);

  return (
    <div className="game">
      <div className="container">
        <div className="game__aside">
          <Aside
            winStatusClickHandler={() => {
              setData(prepareData);
              setActiveIndex(null);
              clearGameCounter();
              newGameStatus();
            }}
            looseStatusClickHandler={() => {
              clearVisitedStatus();
              setActiveIndex(null);
              newGameStatus();
            }}
          >
          </Aside>
        </div>

        <div
          className={`game__wrapper game__wrapper_${currentDifficultyLevel}`}
        >
          {data.length > 0 && data.map((element) => {
            return (
              <Card
                key={uuidv4()}
                data={element}
                onClickHandler={(payload) =>{
                  visitedPostItem(payload);
                  checkActiveIndex(payload);
                }}
              />
            )
          })}
        </div>
      </div>
    </div>
  );
}
