const INITIAL_STATE = {
    userNames: []
};


export default (state = INITIAL_STATE, action) => {
    if (action.type == "SETUSERNAMES") {
        state.userNames = action.userNames;
        return state
    }

    return state;
}