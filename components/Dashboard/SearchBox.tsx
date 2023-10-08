import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button, Form, Image, InputGroup } from 'react-bootstrap'

export default function SearchBox() {
    return (
        <InputGroup size='sm' className="px-1 mb-3 rounded-pill" style={{background:"rgb(0,0,0,0.5)"}}>
            <Form.Control
                placeholder="find your friend..."
                aria-describedby="basic-addon2"
                style={{background:"none", border:"none", color:"#fff"}}
                className='py-1'
                
            />
            <Button variant="" id="button-addon2">
                <Image className='img-fluid' src="https://i.ibb.co/chTSXb5/oil-5320478.png" alt="" height={20} width={20} /> 
            </Button>
        </InputGroup>
    )
}
