import { useState } from "react"
import { Modal } from "react-bootstrap"
import { reactionEmojis } from "../../utils/constant"
import { useQuery } from "@tanstack/react-query"
import { useStateProvider } from "../../context/StateContext"



const Reactions = ({ reaction, handleReactionSend }: any) => {
    const [show, setShow] = useState(false)

    return (
        <>
            <div onClick={() => setShow(!show)} className='reaction-wrapper cursor-pointer'>
                {
                    getReactions(reaction?.reaction)
                }
            </div>
            <Modal show={show} className='reaction-modal' onHide={() => setShow(!show)}>
                <ListOfReactions messageId={reaction?.messageId} handleReactionSend={handleReactionSend} />
            </Modal>
        </>
    )
}

const getReactions = (reactionName: any) => {
    const reactionFind = reactionEmojis.find(item => item?.name === reactionName)
    return (
        <>
            <img src={reactionFind?.src} alt={reactionName?.name} style={{ maxHeight: "13px" }} />
        </>
    )
}

const ListOfReactions = ({ messageId, handleReactionSend }: any) => {
    const [{ userInfo, socket }, dispatch]: any = useStateProvider()
    const { refetch, isSuccess, data: reactions, isError }: any = useQuery({
        queryKey: ["reaction list for modal"],
        queryFn: () => getReactionsApi()
    })

    const getReactionsApi = async () => {
        const response = await fetch(`https://messaging-dev.kotha.im/mobile/api/messages/reactions/${messageId}?skip=0&limit=10`, {
            method: 'GET',
            headers: {
                'Authorization': userInfo?.messageToken
            }
        })
        const json = await response.json()
        if (response) {
            return json
        }
        return []
    }

    const handleDeleteReaction = () => {
        handleReactionSend(messageId, "", false)
    }


    return <div>
        {
            reactions?.map((item:any) => {
                return (
                    <div key={item?._id}>
                        <div className="d-flex justify-content-between align-items-center">
                            <div className="d-flex">
                                <div style={{ height: "50px", width: "50px", borderRadius: "50%" }} className="d-flex overflow-hidden">
                                    <img src={item?.reactedByUser?.picture} alt="" style={{ maxHeight: "100%" }} />
                                </div>
                                <p>{item?.reactedByUser?.name}</p>
                            </div>
                            <div>
                                <button className="btn btn-danger" onClick={handleDeleteReaction}>remove</button>
                            </div>
                        </div>
                    </div>
                )
            })
        }
    </div>
}

export default Reactions