import { useState } from "react"
import { Modal } from "react-bootstrap"
import { reactionEmojis } from "../../utils/constant"

const Reactions = ({ reaction }) => {
    const [show, setShow] = useState(false)

    return (
        <>
            <div onClick={() => setShow(!show)} className='reaction-wrapper cursor-pointer'>
                {
                    getReactions(reaction?.reaction)
                }
            </div>
            <Modal show={show} className='reaction-modal' onHide={() => setShow(!show)}>
                <Modal.Body>Woohoo, you are reading this text in a modal!</Modal.Body>
                <button onClick={() => setShow(!show)}>close</button>
            </Modal>

        </>
    )
}

const getReactions = (reactionName: any) => {
    const reactionFind = reactionEmojis.find(item => item?.name === reactionName)
    return (
        <>
            <img src={reactionFind?.src} alt={reactionName?.name} style={{maxHeight:"13px"}} />
        </>
    )
}

export default Reactions