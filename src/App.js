import React, { useState } from "react";
import { Board } from "./components/Board";
import { ResetButton } from "./components/ResetButton";
import { ScoreBoard } from "./components/ScoreBoard";
import "./App.css";

function App() {

  const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  const [xPlaying, setXPlaying] = useState(true);
  const [board, setBoard] = useState(Array(9).fill(null));
  const [scores, setScores] = useState({ xScore: 0, oScore: 0 });
  const [gameOver, setGameOver] = useState(false)

  //Update the Board
  const handleBoxClick = (boxIndex) => {
    const updateBoard = board.map((value, index) => {
      if (index === boxIndex) {
        return xPlaying ? "X" : "O";
      } else {
        return value;
      }
    });

    setBoard(updateBoard)
    setXPlaying(!xPlaying);
   
    //Check if Either player has won the game
    const winner = checkWinner(updateBoard);
    if (winner) {
      if (winner === "O") {
        scores.oScore += 1;
        setScores(scores);
      } else {
        scores.xScore += 1;
        setScores(scores);
      }
    }
    // checkWinner(updateBoard);
    // setBoard(updateBoard);
    
  };

  const checkWinner = (board) => {
    for (let i = 0; i < winConditions.length; i++) {
      const [x, y, z] = winConditions[i];

      if (board[x] && board[x] === board[y] && board[y] === board[z]) {
        setGameOver(true)
        return board[x];
      }
    }
  };

  const resetBoard = () => {
    setGameOver(false);
    setBoard(Array(9).fill(null))
  }

  return (
    <div className="App">
      <ScoreBoard scores={scores} xPlaying={xPlaying} />
      <Board board={board} onClick={gameOver ? resetBoard : handleBoxClick} />
      <ResetButton resetBoard={resetBoard}/>
    </div>
  );
}

export default App;
