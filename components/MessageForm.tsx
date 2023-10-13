import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button, Form, Image, InputGroup } from 'react-bootstrap'

import Toast from 'react-bootstrap/Toast';

export default function MessageForm() {
    const [showB, setShowB] = useState(true);

    const toggleShowB = () => setShowB(!showB);
    return (
        <>
            <div className='w-100 h-100 text-white d-flex align-items-center justify-content-between px-3'>
                <Button variant='' >
                    <Image onClick={toggleShowB} className='img-fluid' src="https://i.ibb.co/ZW7ZFVP/add-148781.png" alt="" height={25} width={25} />
                </Button>
                <InputGroup size='sm' className="px-1 py-1 rounded" style={{ background: "rgb(0,0,0,0.5)" }}>
                    <Button variant=''>
                        <Image className='img-fluid' src="https://i.ibb.co/sWJ1ktH/emojipng-com-14031904.png" alt="" height={20} width={20} />
                    </Button>
                    <Form.Control autoFocus
                        aria-describedby="basic-addon2"
                        style={{ background: "none", border: "none", color: "#fff" }}
                        className='py-2'
                    />
                    <Button variant='' >
                        <Image className='img-fluid' src="https://i.postimg.cc/0N4P1xJr/microphone-8369015.png" alt="" height={20} width={20} />
                    </Button>
                </InputGroup>
                {/* <InputGroup className="mb-3">
                <Button variant="outline-secondary">Button</Button>
                <Button variant="outline-secondary">Button</Button>
                <Form.Control aria-label="Example text with two button addons" />
            </InputGroup> */}
                <Button variant='' >
                    <Image className='img-fluid' src="https://i.ibb.co/QdZ8jVf/send-10109845.png" alt="" height={25} width={25} />
                </Button>
            </div>
            <div className='position-absolute' style={{ top: "-100%", left: 0,width:"100%" }}>
                <Toast show={showB} animation={false}>
                    <Toast.Header>
                        <img
                            src="holder.js/20x20?text=%20"
                            className="rounded me-2"
                            alt=""
                        />
                        <strong className="me-auto">Bootstrap</strong>
                        <small>11 mins ago</small>
                    </Toast.Header>
                    <Toast.Body>Woohoo, you're reading this text in a Toast!</Toast.Body>
                </Toast>
            </div>
        </>
    )
}
