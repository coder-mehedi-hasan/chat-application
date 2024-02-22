import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { Button, Modal, Offcanvas, InputGroup, Form } from 'react-bootstrap';
import { BsFillXCircleFill, BsSearch } from 'react-icons/bs';
import { FaBars, FaHome } from 'react-icons/fa';
import { FaPenToSquare } from "react-icons/fa6";
import { get } from '../../services/api';
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import { useStateProvider } from '../../context/StateContext';
import { reducerCases } from '../../context/constant';
import { useMediaQuery } from 'react-responsive'


const TopNavBar = ({ type }: any) => {

    const router = useRouter()
    const [canvas, setCanvas] = useState(false);
    const [newChatModal, setNewChatModal] = useState(false)


    return (
        <>
            <div style={{ height: "50px", width: "100%" }}>
                <div className="d-flex justify-content-between align-items-center h-100 p-2">
                    <div>
                        <Offcanvas className="bg-dark" show={canvas} onHide={() => setCanvas(!canvas)}>
                            <div className='d-flex justify-content-end'>
                                <div onClick={() => setCanvas(!canvas)} className='me-2 fs-4 rounded-circle text-white' style={{ cursor: 'pointer', }}>
                                    <BsFillXCircleFill />
                                </div>
                            </div>
                        </Offcanvas>
                        <div className='m-0 d-flex align-items-center'>
                            <div onClick={() => setCanvas(!canvas)} style={{ height: "30px", width: "30px", cursor: "pointer" }} className='bg-secondary rounded-circle d-flex justify-content-center align-items-center'>
                                <FaBars style={{ color: "gray", fontSize: "14px" }} />
                            </div>
                            <span className='text-dark fs-5 fw-medium mx-1'>
                                {type === "chats" && "Chats"}
                                {type === "calls" && "Calls"}
                                {type === "people" && "People"}
                                {type === "stories" && "Stories"}
                            </span>
                        </div>
                    </div>
                    <div>
                        {
                            type === "chats" &&
                            <div onClick={() => setNewChatModal(true)} style={{ height: "30px", width: "30px", cursor: "pointer" }} className='bg-secondary rounded-circle d-flex justify-content-center align-items-center'>
                                <FaPenToSquare style={{ color: "gray", fontSize: "14px" }} />
                            </div>
                        }
                    </div>
                </div>

            </div >
            <Modal show={newChatModal} onHide={() => setNewChatModal(!newChatModal)} animation={false}>
                <div>
                    <AddNewUser setNewChatModal={setNewChatModal}></AddNewUser>
                </div>
            </Modal>
        </>
    )
}

const AddNewUser = ({ setNewChatModal }) => {
    const [{ currentChatUser, userInfo, socket, messages, socketEvent, otherMessages, sendMessages, chatHistoryUsers }, dispatch]: any = useStateProvider()
    const [searchInput, setSearchInput] = useState('')
    const [selectUser, setSelectUser] = useState<any>(null)
    const isMobileWidth = useMediaQuery({ maxWidth: 576 })

    const { isError, data: searchHistoy, isSuccess } = useQuery({
        queryKey: ['contact listusers'],
        queryFn: () => get('https://jsonplaceholder.typicode.com/users'),
        select: (data) => (data?.data)
    })

    const handleSelect = (user) => {
        if (user?.id === selectUser?.id) {
            setSelectUser(null)
        }
        else {
            setSelectUser(user)
        }

    }

    const handleSave = () => {
        if (!selectUser) {
            alert('You have to must on select')
        } else {
            dispatch({ type: reducerCases.SET_HISTORY_USERS, users: [...chatHistoryUsers, ...[{ ...selectUser, image: "https://picsum.photos/200" }]] })
            dispatch({ type: reducerCases.CHANGE_CURRENT_CHAT_USER, user: selectUser })
            setSelectUser(null)
            setNewChatModal(false)
        }
    }

    "use client"
    const height = window && window.innerHeight - 180

    return (
        <div className='m-2 d-flex align-items-start flex-column'>
            <div >
                <p className='m-0 fs-5 fw-bold'>Add New User</p>
            </div>
            <div style={{ width: "100%", height: "100%", }} className='chat_history' >
                <div className='my-2 sticky-top'>
                    <InputGroup size='sm' className="p-1 rounded-pill bg_gray" >
                        <Button variant="">
                            <BsSearch />
                        </Button>
                        <Form.Control
                            placeholder="find your friend..."
                            aria-describedby=""
                            style={{ background: "none", border: "none" }}
                            className='py-1'
                            onChange={(e) => setSearchInput(e.target?.value)}
                        />
                    </InputGroup>
                </div>
                <div style={{ height: !isMobileWidth ? "300px" : "auto", overflowY: "scroll", maxHeight: isMobileWidth ? `${height}px` : "auto" }} className='scrollbar_visible_y'>
                    {/* {
                        searchInput?.length ? <> */}
                    {
                        (searchHistoy?.filter(obj =>
                            obj?.name.toLowerCase()?.includes(searchInput.toLowerCase())
                        ))?.map((user: any) => {
                            // console.log(user)
                            return (
                                <div key={user?.id} className={`d-flex align-items-center justify-content-between  my-1 py-2 rounded px-1 border ${selectUser?.id === user?.id && "selected-new-user"}`} onClick={() => handleSelect(user)}>
                                    <div className='d-flex align-items-center'>
                                        <div className='mx-1 overflow-hidden' style={{ maxWidth: "30px", objectFit: "cover", }} >
                                            <img className='img-fluid' src="https://w7.pngwing.com/pngs/178/595/png-transparent-user-profile-computer-icons-login-user-avatars-thumbnail.png" alt={""} />
                                        </div>
                                        <div><p className='m-0 fs-7'>{user?.name}</p></div>
                                    </div>
                                    <div>
                                        {
                                            selectUser && selectUser?.id === user?.id ?
                                                <><IoIosCheckmarkCircleOutline className="brand-color" />
                                                </> : ""
                                        }
                                    </div>
                                </div>)
                        })
                    }
                </div>
            </div>
            <div className='w-100 d-flex justify-content-end'>
                <Modal.Footer>
                    <Button variant="secondary" className='' onClick={() => setNewChatModal(false)}>
                        Close
                    </Button>
                    <Button variant="primary" className='brand-bg' onClick={handleSave}>
                        + Add
                    </Button>
                </Modal.Footer>
            </div>
        </div>
    )
}

export default TopNavBar