const ADD_USER = 'ADD-USER';

let usersReducer = (state, action) => {
    if (action.type === ADD_USER) {
        let newUser = {
            id: 0,
            username: '',
            password: '',
            isAdmin: false,
            streakEveryGame: {
                wordleStreak: 0,
                sudokuStreak: 0,
                typerStreak: 0,
                lotStreak: 0,
                chessStreak: 0
            },
            anyGameStreak: 0,
            fullSetStreak: 0,
            todayGames: {
                isWordleDone: false,
                isSudokuDone: false,
                isTyperDone: false,
                isLotDone: false,
                isChessDone: false
            }
        };
        if (action.userdata.username !== '' || !state.find(some => some.username === action.userdata.username)) {
            if (this._isSafePassword(action.userdata.password).isValid) {
                newUser.username = action.userdata.username;
                newUser.password = action.userdata.password;
                newUser.id = state.length + 1;
                state.push(newUser);
                console.log(state);
            }
        }

    }
    return state;
}

export default usersReducer;