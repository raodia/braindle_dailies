const ADD_TYPING = 'ADD-TYPING';

let typing_reducer = (state, action) => {
    if (action.type === ADD_TYPING) {
        let newText = { id: 0, text: '' };
            if (action.textInput.length < 300 && action.textInput.trim().length > 100) {
                newText.id = state.length + 1;
                newText.text = action.textInput;
            }
    }
    return state;
}

export default typing_reducer;