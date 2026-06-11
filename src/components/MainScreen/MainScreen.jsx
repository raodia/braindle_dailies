import { Route, Routes } from "react-router-dom";

import TypingGame from "./../TypingGame/TypingGame";
import HomePage from "./../HomePage/HomePage";
import ChessGame from "./../ChessGame/ChessGame";
import LOTGame from "./../LOTGame/LOTGame";
import WordleGame from "./../Wordle/wordle";
import SudokuGame from "./../Sudoku/Sudoku";
import SignupPage from "./../SignupPage/SignupPage";
import LoginPage from "./../LoginPage/LoginPage";

const MainScreen = (props) => {
  return (
    <Routes>
      <Route path="blind-typer" element={ <TypingGame state={props.state.PUZZLES_STATE.typing_puzzles} puzzlesDispatch={props.puzzlesDispatch} /> } />
      <Route path="true-or-lie" element={  <LOTGame state={props.state.PUZZLES_STATE.lot_puzzles} puzzlesDispatch={props.puzzlesDispatch}/> } />
      <Route path="chess" element={ <ChessGame state={props.state.PUZZLES_STATE.chess_puzzles} puzzlesDispatch={props.puzzlesDispatch}/> } />
      <Route path="wordle" element={ <WordleGame state={props.state.PUZZLES_STATE.wordle_puzzles} puzzlesDispatch={props.puzzlesDispatch}/>  } />
      <Route path="sudoku6" element={ <SudokuGame state={props.state.PUZZLES_STATE.sudoku_puzzles} puzzlesDispatch={props.puzzlesDispatch}/> }  />
      <Route path="signup" element={ <SignupPage users={props.state.USERS_STATE} puzzlesDispatch={props.puzzlesDispatch} /> } />
      <Route path="login" element={ <LoginPage users={props.state.USERS_STATE} test={props.state.CURRENT_USER} puzzlesDispatch={props.puzzlesDispatch} /> } />
      <Route path="home" Component={HomePage} />
      <Route path="" Component={HomePage} />
    </Routes>
  );
};

export default MainScreen;
