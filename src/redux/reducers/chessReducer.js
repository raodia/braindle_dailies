const ADD_CHESS = 'ADD-CHESS';

let chess_reducer = (state, action) => {
    if (action.type === ADD_CHESS) {
        let some = {
            id: 0,
            fen: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR - w',
            solution: ['a1', 'a1'],
            description: 'there is no puzzle (to continue: a1 -> a1)'
        };
        if (action.fenInput !== '' && action.solutionInput !== '' && action.descriptionInput !== '') {
            some.id = state.length;
            some.fen = action.fenInput;
            some.solution = action.solutionInput;
            some.description = action.descriptionInput;
            state.push(some);
        }
    }
    return state;
}

export default chess_reducer;