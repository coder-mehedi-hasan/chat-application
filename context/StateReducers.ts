import { reducerCases } from "./constant";

export const initialState = {
    current_location: undefined,
    userInfo: undefined,
    currentChatUser: undefined,
    socket: undefined,
    messages: [],
    socketEvent: false,
    otherMessages:[]
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
                messages: [...state.messages, action.newMessage]
            }
        case reducerCases.SET_SOCKET:
            return {
                ...state,
                socket: action.socket
            }
        case reducerCases.SOCKET_EVENT:
            return {
                ...state,
                socketEvent: action.socketEvent
            }
        case reducerCases.SET_OTHERS_MESSAGE:
            return {
                ...state,
                otherMessages: [...state.otherMessages,action?.newMessage]
            }
        default:
            return state;
    }
}

export default reducer