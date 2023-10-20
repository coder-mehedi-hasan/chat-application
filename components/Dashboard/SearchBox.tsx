import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button, Form, Image, InputGroup } from 'react-bootstrap'
import { BsSearch } from "react-icons/bs";


export default function SearchBox() {
    return (
        <InputGroup size='sm' className="p-1 rounded-pill bg-secondary" >
            <Button variant="" id="button-addon2">
                <BsSearch />
            </Button>
            <Form.Control
                placeholder="find your friend..."
                aria-describedby="basic-addon2"
                style={{ background: "none", border: "none", color: "#fff" }}
                className='py-1'

            />
        </InputGroup>
    )
}
