const INITIAL_STATE = {
    userNames: []
};


export default (state = INITIAL_STATE, action) => {
    console.log("action.type:",action.type);
    console.log("action.type:",action.userNames);
    if (action.type == "SETUSERNAMES") {
        return { ...state, userNames: action.userNames }
    }

    return state;
}