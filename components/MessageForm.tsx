import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button, Form, Image, InputGroup } from 'react-bootstrap'
import { BsFillXCircleFill, BsX } from "react-icons/bs";
import Toast from 'react-bootstrap/Toast';

export default function MessageForm() {
    const [showB, setShowB] = useState(false);
    const toggleShowB = () => setShowB(!showB);
    const [image, setImage] = useState([])
    const handleImage = (e) => {
        const selectedFIles = [];
        const targetFiles = e.target.files;
        const targetFilesObject = [...targetFiles]
        targetFilesObject.map((file) => {
            return selectedFIles.push(URL.createObjectURL(file))
        })
        setImage(selectedFIles);
    }
    // const getPreviewImage = () => {
    //     return (

    //     )
    // }
    const deletePreviewImage = (index) => {
        const img = image.splice(index, 1)
        const newArray = image.filter((element) => element !== img[0]);
        setImage(newArray)

    }

    return (
        <>
            {

                image ?

                    <div className='w-100 d-flex bg-dark' style={{ position: "absolute", top: "-170%", left: "0", overflow: "scroll" }}>
                        {
                            image?.map((item, index) => {
                                return (
                                    <div key={index} className='mx-2 my-3 position-relative'>
                                        <div style={{ height: "20px", width: "20px", borderRadius: "50%", position: "absolute", top: "-5px", right: "0px", cursor: "pointer", }} className='bg-white d-flex justify-content-center align-items-center fs-4' onClick={() => deletePreviewImage(index)}><BsX /></div>
                                        <Image draggable src={item} height={80} width={80} rounded />
                                    </div>
                                )
                            })
                        }
                    </div>

                    : ""

            }
            <div style={{ flex: 1, background: "#fff" }} className='position-relative w-100 h-100 text-white d-flex align-items-center justify-content-between px-3'>
                <Button variant='' >
                    <Image onClick={toggleShowB} className='img-fluid' src={showB ? "https://i.ibb.co/rmd3Jj3/minus-8637529.png" : "https://i.ibb.co/ZW7ZFVP/add-148781.png"} alt="" height={25} width={25} />
                </Button>
                <div>
                    <label htmlFor="share_gallery"><Image className='cursor-pointer' width={22} src="https://i.ibb.co/YXhV2hc/gallery.png" alt="gallery" /></label>
                    <input multiple onChange={handleImage} type="file" className='d-none' id="share_gallery" />
                </div>
                <InputGroup size='sm' className="px-1 py-1 rounded bg-secondary">
                    <Button variant=''>
                        <Image className='img-fluid' src="https://i.ibb.co/sWJ1ktH/emojipng-com-14031904.png" alt="" height={20} width={20} />
                    </Button>
                    <Form.Control autoFocus
                        aria-describedby="basic-addon2"
                        style={{ background: "none", border: "none", color: "#000" }}
                        className='py-1'
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
