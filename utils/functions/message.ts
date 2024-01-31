import { reducerCases } from "../../context/constant"

export const handleMessageStatus = (ids: string[], socket: any, status: number) => {
    socket.current.emit('updateMessageStatusV2', {
        _ids: ids,
        currentStatus: status
    })
}

export const handleSentMessage = (messageObj: any, socket: any, dispatch: any) => {
    let isSuccess = false
    socket.current.emit('messageFromClient', messageObj, (response: any) => {
        if (response?.status === "success") {
            const currentDate = new Date()
            dispatch({ type: reducerCases.ADD_MESSAGE, newMessage: { ...response.sMessageObj, messageSentTime: currentDate } })
            dispatch({ type: reducerCases.SOCKET_EVENT, socketEvent: true })
            isSuccess = true
            handleMessageStatus([response?._id], socket, 1)
        }
    })
    return isSuccess
}