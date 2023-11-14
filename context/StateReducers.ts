import { reducerCases } from "./constant";

export const initialState = {
    current_location: undefined,
    userInfo: undefined,
    currentChatUser: undefined,
    messages: [],
}

const reducer = (state, action) => {
    switch (action.type) {
        case reducerCases.CHANGE_CURRENT_CHAT_USER:
            return {
                ...state,
                currentChatUser: action.user
            }
        case reducerCases.SET_USER_INFO:
            return {
                ...state,
                userInfo: action.userInfo
            }
        case reducerCases.SET_MESSAGES:
            return {
                ...state,
                messages: action.messages
            }
        case reducerCases.SET_LOCATION:
            return {
                ...state,
                current_location: action.current_location
            }
        case reducerCases.ADD_MESSAGE:
            return {
                ...state,
                messages: [...state.messages,action.newMessage]
            }
        default:
            return state;
    }
}

export default reducer