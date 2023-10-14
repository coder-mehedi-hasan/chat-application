import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button, Form, Image, InputGroup } from 'react-bootstrap'

import Toast from 'react-bootstrap/Toast';

export default function MessageForm() {
    const [showB, setShowB] = useState(false);

    const toggleShowB = () => setShowB(!showB);
    return (
        <>
            <div className='w-100 h-100 text-white d-flex align-items-center justify-content-between px-3'>
                <Button variant='' >
                    <Image onClick={toggleShowB} className='img-fluid' src={showB ? "https://i.ibb.co/rmd3Jj3/minus-8637529.png" : "https://i.ibb.co/ZW7ZFVP/add-148781.png"} alt="" height={25} width={25} />
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
            <div className='position-absolute py-2' style={{ top: "-35px", left: 0, width: "100%", }}>
                <Toast show={showB} animation={false} className='w-100 rounded-0' style={{ background: "rgba(33, 37, 41, 0.95)" }}>
                    <div className="d-flex align-items-center justify-content-center">
                        <div>
                            <label htmlFor="share_gallery"><Image className='cursor-pointer' width={22} src="https://i.ibb.co/YXhV2hc/gallery.png" alt="gallery" /></label>
                            <input type="file" className='d-none' id="share_gallery" />
                        </div>
                    </div>
                </Toast>
            </div>
        </>
    )
}
