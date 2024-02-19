import { reducerCases } from "../../context/constant"
import { updateTempMessage } from "../updateMessage"

export const handleMessageStatus = (ids: string[], socket: any, status: number) => {
    socket.current.emit('updateMessageStatusV2', {
        _ids: ids,
        currentStatus: status
    })
}

export const handleSentMessage = (messageObj: any, socket: any, dispatch: any, drafts: [], tempId: any = null, messages: any = []) => {
    if (messageObj.messageFiles) {
        messageObj.messageFiles = { ...messageObj?.messageFiles[0] }
    }
    let isSuccess = false
    if (!messageObj.score) {
        messageObj.score = 1
    }
    socket.current.emit('messageFromClient', messageObj, (response: any) => {
        if (response?.status === "success") {
            const currentDate = new Date()?.toISOString()
            if (response.sMessageObj?.messageFiles && tempId) {
                updateTempMessage(
                    {
                        ...response.sMessageObj,
                        messageSentTime: currentDate,
                        messageBody: response.sMessageObj?.message,
                        messageFiles: [response.sMessageObj?.messageFiles],
                        tempId: tempId
                    },
                    messages,
                    dispatch
                )
            }
            else {
                dispatch({ type: reducerCases.ADD_MESSAGE, newMessage: { ...response.sMessageObj, messageSentTime: currentDate, messageBody: response.sMessageObj?.message, messageFiles: [response.sMessageObj?.messageFiles] } })
            }
            dispatch({ type: reducerCases.SOCKET_EVENT, socketEvent: true })
            isSuccess = true
            dispatch({ type: reducerCases.ADD_SEND_MESSAGE, newMessage: { ...response.sMessageObj, messageSentTime: currentDate, messageBody: response.sMessageObj?.message, messageFiles: [response.sMessageObj?.messageFiles] } })
            // if (drafts?.length) {
            //     const filterDraftsWithoutThis = drafts?.filter((item: any) => item?.messageToUserID !== messageObj?.messageToUserID)
            //     dispatch({ type: reducerCases.SET_DRAFT_MESSAGE, draftMessages: filterDraftsWithoutThis })
            // }
        }
    })
    return isSuccess
}

export const handleSortByDateTime = (arr: any[]) => {
    const compareDateTimesDesc = (a, b) => b?.messageSentTime - a?.messageSentTime;
    const sortedArray = arr?.sort(compareDateTimesDesc);

    return sortedArray
}

export const arrayIsEmpty = (array: any[]) => {
    if (!Array.isArray(array)) {
        return false;
    }
    if (array.length == 0) {
        return true;
    }
    return false;
}