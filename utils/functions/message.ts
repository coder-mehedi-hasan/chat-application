export const handleMessageStatus = (ids: string[], socket: any, status: number) => {
    socket.current.emit('updateMessageStatusV2', {
        _ids: ids,
        currentStatus: status
    })
}