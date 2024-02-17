import { updateMessage } from "../updateMessage";

const handleReactionSend = (messageId: string, reactionName: string, sendingType: boolean, socket: any, userInfo: any, messages: any, dispatch: any) => {
    let params: any = {
        "_id": messageId,
        "react": true,
        "reactionParams": {
            "score": 1,
            "reaction": reactionName,
            "reactedBy": userInfo?.id,
            "cancel": false
        }
    }
    if (!sendingType) {
        params = {
            "_id": messageId,
            "react": true,
            "reactionParams": {
                "reactedBy": userInfo?.id,
                "cancel": true
            }
        }
    }
    socket.current.emit("editMessage", params
        , (err: any, res: any) => {
            if (!err) {
                updateMessage(res, messages, dispatch)
            }
        }
    );
}

export default handleReactionSend