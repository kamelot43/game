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
  const [activeIndex, setActiveIndex] = useState(null);

  const dispatch = useDispatch();
  const roundCounter = useSelector((state) => state.game.round);
  const increaseRoundCounter = () => dispatch({ type: 'game/increaseGameCounter', payload: {}});
  const increaseRightAnswersCounter = () => dispatch({ type: 'game/increaseRightAnswers', payload: {}});
  const clearRightAnswersCounter = () => dispatch({ type: 'game/clearRightAnswers', payload: {}});
  const currentDifficultyLevel = useSelector((state) => state.game.difficultyLevel);
  const rightAnswersCounter = useSelector((state) => state.game.rightAnswers);

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

  const visitedPostItem = uuid => {

    let cloneData = [...data];
    let indexOfItem = cloneData.findIndex(item => item.uuid === uuid);

    cloneData[indexOfItem] = {
      ...cloneData[indexOfItem],
      visited: true
    };

    setData(cloneData);
  };

  const checkGameStatus = (it) => {
    console.log(it)
    // if (currentDifficultyLevel === 'easy' && rightAnswersCounter === EASY_LEVEL_BOARD_SIZE) {
    //   alert(`Поздравляем ! Игра пройдена. Текущий уровень сложности ${currentDifficultyLevel}. Правильных ответов : ${rightAnswersCounter}`);
    // } else if (currentDifficultyLevel === 'normal' && rightAnswersCounter === NORMAL_LEVEL_BOARD_SIZE) {
    //   alert(`Поздравляем ! Игра пройдена. Текущий уровень сложности ${currentDifficultyLevel}. Правильных ответов : ${rightAnswersCounter}`);
    // } else if (currentDifficultyLevel === 'hard' && rightAnswersCounter === HARD_LEVEL_BOARD_SIZE) {
    //   alert(`Поздравляем ! Игра пройдена. Текущий уровень сложности ${currentDifficultyLevel}. Правильных ответов : ${rightAnswersCounter}`);
    // }
  };

  const checkActiveIndex = uuid => {

    let indexOfItem = data.findIndex(item => item.uuid === uuid);
    const target = data[indexOfItem];

    if(activeIndex === null) {
      setActiveIndex(target.id);
    } else if (activeIndex === target.id)  {
      setActiveIndex(null);
      increaseRightAnswersCounter();
    } else if (activeIndex !== target.id) {
      alert('Игра окончена');
      setActiveIndex(null);
      clearRightAnswersCounter();
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
        <main>
          <h2>Game Page !</h2>
          <p>You can do this, I believe in you.</p>
          <div>Round : {roundCounter}</div>
          <div>Right Answers Counter : {rightAnswersCounter}</div>
          <button
            onClick={() => {
              setData(prepareData);
              setActiveIndex(null);
              increaseRoundCounter();
            }
          }
          >
            Обновить данные
          </button>
          <div
            className={`game__wrapper game__wrapper_${currentDifficultyLevel}`}
          >
            {data.length > 0 && data.map((element, index) => {
              return (
                <Card
                  key={uuidv4()}
                  data={element}
                  onClick={(uuid) =>{
                    visitedPostItem(uuid);
                    checkActiveIndex(uuid);
                    checkGameStatus(rightAnswersCounter);
                  }}
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
