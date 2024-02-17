import { updateMessage } from "../updateMessage";

const handleDeleteMessage = (messageId, score, socket, messages, dispatch) => {
    const params = {
        "_id": messageId,
        "score": score,
        "messageBody": "This message has been removed",
    }
    socket.current.emit("editMessage", params
        , (err: any, res: any) => {
            if (!err) {
                updateMessage({ _id: messageId, ...res, message: res?.messageBody }, messages, dispatch)
            }
        }
    );
}
export default handleDeleteMessage