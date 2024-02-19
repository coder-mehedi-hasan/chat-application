import { reducerCases } from "./constant";
import users from "../fake_data/user.json"

export const initialState = {
    current_location: undefined,
    userInfo: undefined,
    currentChatUser: undefined,
    socket: undefined,
    messages: [],
    socketEvent: false,
    otherMessages: [],
    chatContainerRef: null,
    sendMessages: [],
    draftMessages: [],
    users: [],
    editMessage: null,
    replayMessage: null,
    chatHistoryUsers: users
}

const reducer = (state: any, action: any) => {
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
        case reducerCases.ADD_OTHERS_MESSAGE:
            return {
                ...state,
                otherMessages: [...state.otherMessages, action?.newMessage]
            }
        case reducerCases.SET_OTHERS_MESSAGE:
            return {
                ...state,
                otherMessages: action.otherMessages
            }
        case reducerCases.ADD_SEND_MESSAGE:
            return {
                ...state,
                sendMessages: [...state.sendMessages, action?.newMessage]
            }
        case reducerCases.SET_SEND_MESSAGE:
            return {
                ...state,
                sendMessages: action.sendMessages
            }
        case reducerCases.ADD_DRAFT_MESSAGE:
            return {
                ...state,
                draftMessages: [...state.draftMessages, action?.newMessage]
            }
        case reducerCases.SET_DRAFT_MESSAGE:
            return {
                ...state,
                draftMessages: action.draftMessages
            }
        case reducerCases.SET_CHAT_CONTAINER_REF:
            return {
                ...state,
                chatContainerRef: action.chatContainerRef
            }
        case reducerCases.SET_USERS:
            return {
                ...state,
                users: action.users
            }
        case reducerCases.ADD_USERS:
            return {
                ...state,
                users: [...state.users, action?.newUser]
            }
        case reducerCases.ADD_EDIT_MESSAGE:
            return {
                ...state,
                editMessage: action.editMessage
            }
        case reducerCases.ADD_REPLAY_MESSAGE:
            return {
                ...state,
                replayMessage: action.replayMessage
            }
        case reducerCases.SET_HISTORY_USERS:
            return {
                ...state,
                chatHistoryUsers: action.users
            }
        default:
            return state;
    }
}

export default reducer