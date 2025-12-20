
import {BrowserRouter, Route, Routes} from 'react-router-dom'

import TypingGame from './../TypingGame/TypingGame';
import HomePage from './../HomePage/HomePage';
import ChessGame from './../ChessGame/ChessGame';
import LOTGame from './../LOTGame/LOTGame';
import WordleGame from './../Wordle/wordle';
import SudokuGame from './../Sudoku/Sudoku';

const MainScreen = () => {
    return (
        <BrowserRouter>
            <Routes>

            <Route path='blind-typer' Component={TypingGame} />
            <Route path='true-or-lie' Component={LOTGame}/>
            <Route path='chess' Component={ChessGame}/>
            <Route path='home' Component={HomePage}/>
            <Route path='wordle' Component={WordleGame}/>
            <Route path='sudoku6' Component={SudokuGame}/>
            <Route path='' Component={HomePage}/>
            </Routes>

            
        </BrowserRouter>

    )
}

export default MainScreen;