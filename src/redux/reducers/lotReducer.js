const ADD_LOT = 'ADD-LOT';

let lot_reducer = (state, action) => {
    if (action.type === ADD_LOT) {
        let newPuzzle = {
            id: 0,
            fact: '',
            isTrue: false,
            explanation: ''
        }
        if (action.factInput !== '' && action.istrueInput !== '' && action.explanationInput !== '') {
            newPuzzle.id = state.length;
            newPuzzle.fact = action.factInput;
            newPuzzle.isTrue = action.istrueInput;
            newPuzzle.explanation = action.explanationInput;
            state.push(newPuzzle)
        }
        return state;
    }
    return state;
}

export default lot_reducer;