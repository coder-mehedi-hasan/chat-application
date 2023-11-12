import { reduceCases } from "./constant";

export const initialState = {
    userInfo: undefined,
    currentChatUser: undefined
}

const reducer = (state, action) => {
    switch (action.type) {
        case reduceCases.CHANGE_CURRENT_CHAT_USER:
            return {
                ...state,
                currentChatUser: action.user
            }
        default:
            return state;
    }
}

export default reducer