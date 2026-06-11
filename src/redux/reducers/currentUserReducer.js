const LOGIN_USER = 'LOGIN-USER';
let currentuserReducer = (state, action) => {
    debugger;

    let newState = 0;
    if (action.type === LOGIN_USER) {
        // тут я проверяю, есть ли такой пользователь
        if (this.isUserExists(action.userdata.username)) {
            let currentUser = this.usersData.find(some => some.username === action.userdata.username);
            if (action.userdata.password === currentUser.password) {
                newState = action.userdata.userid;
            }

        }
    }

    return newState;
}

export default currentuserReducer;