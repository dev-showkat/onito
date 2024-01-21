const initialState = {
    users: []
};

const userReducer = (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case 'ADD':
            return {
                users: [...state.users, payload]
            };
        default:
            return state;
    }
};

export default userReducer;
