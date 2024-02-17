import { reducerCases } from "../context/constant";

export const updateMessage = (newObj, messages, dispatch) => {
    const updatedMessages = updateByIdInPlace(messages, newObj?._id, newObj)
    dispatch({ type: reducerCases.SET_MESSAGES, messages: updatedMessages })
}

export const updateMessageStatus = (newObj, messages, dispatch) => {
    const updatedMessages = updateByIdInPlace(messages, newObj?._id, newObj)
    dispatch({ type: reducerCases.SET_MESSAGES, messages: updatedMessages })
}

export const updateSendMessagesStatus = (newObj, messages, dispatch) => {
    const updatedMessages = updateByIdInPlace(messages, newObj?._id, newObj)
    dispatch({ type: reducerCases.SET_SEND_MESSAGE, sendMessages: updatedMessages })
}

export const updateOtherMessageStatus = (newObj, messages, dispatch) => {
    const updatedMessages = updateByIdInPlace(messages, newObj?._id, newObj)
    dispatch({ type: reducerCases.SET_OTHERS_MESSAGE, otherMessages: updatedMessages })
}

function updateByIdInPlace(arr: any[], idToUpdate: string, newObj: any) {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i]._id === idToUpdate) {
            arr[i] = { ...arr[i], ...newObj };
            break;
        }
    }
    return arr
}