import React from 'react'
import { Button, Form, InputGroup } from 'react-bootstrap'
import { BsSearch } from "react-icons/bs";

export default function SearchBox() {
    return (
        <InputGroup size='sm' className="p-1 rounded-pill bg_gray" >
            <Button variant="">
                <BsSearch />
            </Button>
            <Form.Control
                placeholder="find your friend..."
                aria-describedby=""
                style={{ background: "none", border: "none" }}
                className='py-1'
            />
        </InputGroup>
    )
}
