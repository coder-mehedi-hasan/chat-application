import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button, Form, Image, InputGroup } from 'react-bootstrap'


export default function MessageForm() {
    return (
        <div className='w-100 h-100 text-white d-flex align-items-center justify-content-between px-3'>
            <Button variant='' >
                <Image className='img-fluid' src="https://i.ibb.co/MGVXKG8/plus-icon-13062.png" alt="" height={25} width={25} />
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
                    <Image className='img-fluid' src="https://i.ibb.co/FxrqnWq/kisspng-microphone-computer-icons-5b31ba8a041718-3335175915299856740168.png" alt="" height={20} width={20} />
                </Button>
            </InputGroup>
            {/* <InputGroup className="mb-3">
                <Button variant="outline-secondary">Button</Button>
                <Button variant="outline-secondary">Button</Button>
                <Form.Control aria-label="Example text with two button addons" />
            </InputGroup> */}
            <Button variant='' >
                <Image className='img-fluid' src="https://i.ibb.co/g9pyrsj/pngkit-send-icon-png-1882365.png" alt="" height={25} width={25} />
            </Button>

        </div>
    )
}
