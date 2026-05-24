const ADD_SUDOKU = 'ADD-SUDOKU';

let sudoku_reducer = (state, action) => {
    if (action.type === ADD_SUDOKU) {
        let newPuzzle = {
            puzzles: {
                id: 0,
                puzzle: [
                    [0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0]
                ]
            },
            solutions:
            {
                id: 0,
                solution: [
                    [0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0]
                ]
            }
        };
        if (action.sudokuInput && action.solutionInput) {
            newPuzzle.puzzles.id = state.puzzles.length + 1;
            newPuzzle.puzzles.puzzle = action.sudokuInput;
            newPuzzle.solutions.id = state.solutions.length + 1;
            newPuzzle.solutions.solution = action.solutionInput;
            state.push(newPuzzle)
        }
        return state;
    }
    return state;
}

export default sudoku_reducer;