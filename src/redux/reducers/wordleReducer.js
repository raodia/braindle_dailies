const ADD_WORDLE = 'ADD-WORDLE';

let wordle_reducer = (state, action) => {
    if (action.type === ADD_WORDLE) {
        
            let newWord = { id: 0, word: '' };
            if (action.word.length === 5 && !state.find(some => some.word.toLowerCase() === action.word)) {
                newWord.id = state.length + 1;
                newWord.word = action.word;
                state.push(newWord);
            }
    }
    return state;
}

export default wordle_reducer;