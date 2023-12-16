import React, { useState } from 'react'
import TestChilderm from '../components/Test'
import { Modal, Button } from 'react-bootstrap';

export default function Test() {
    const [modal, setModal] = useState(false)
    return (
        <>
            <Button onClick={() => setModal(!modal)}>Show</Button>
            <Modal show={modal} size='xl'>
                <Button onClick={() => setModal(!modal)}>Hide</Button>

            </Modal>
        </>
    )
}