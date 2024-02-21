"use client"
import React, { useEffect, useRef, useState } from 'react'
import SearchBox from '../Dashboard/SearchBox'
import user from '../../fake_data/user.json';
import ActiveUser from '../ActiveUser';
import { BsArrowRight, BsSearch } from 'react-icons/bs';
import TopNavBar from '../common/TopNavBar';
import ChatListItem from './ChatListItem';
import { useStateProvider } from '../../context/StateContext';
import { useQuery } from '@tanstack/react-query';
import { get } from '../../services/api';
import { Button, Form, InputGroup } from 'react-bootstrap';


export default function ChattingHistory() {
    const [users, setUsers] = useState<any>(user)
    const [{ userInfo, otherMessages, chatHistoryUsers }, dispatch]: any = useStateProvider()
    const activeUserRef = useRef(null)
    const [searchInput, setSearchInput] = useState('')

    const { isError, data: searchHistory, isSuccess } = useQuery({
        queryKey: ["searchHistory"],
        queryFn: () => get('https://jsonplaceholder.typicode.com/users'),
        enabled: !!(searchInput?.length),
        select: (data) => data?.data,
    })

    const handleGrabbing = (e: any) => {
    }

    const handleOver = (e: any) => {
    }

    useEffect(() => {
        if (otherMessages?.length) {
            const topUsers = users?.find((user: any) => user?.id === otherMessages[0]?.messageFromUserID)
            setUsers((users: any) => {
                const filterdUsers = users?.filter((user: any) => user?.id !== topUsers?.id)
                return [...[topUsers], ...filterdUsers]
            })
        }
    }, [otherMessages])

    useEffect(() => {
        setUsers(chatHistoryUsers)
    }, [chatHistoryUsers])

    // console.log("from chat history",users)


    return (
        <>
            <TopNavBar type={"chats"} />
            <div style={{ width: "100%", height: "100%", overflow: "scroll" }} className='chat_history'>
                <div className='my-2'>
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
                {
                    searchInput?.length ? <>
                        {
                            (searchHistory?.filter(obj =>
                                obj?.name.toLowerCase()?.includes(searchInput.toLowerCase())
                            ))?.map((user: any) => {
                                return (
                                    <div key={user?.id} className='d-flex  my-1 py-2 px-1'>
                                        <div className='mx-1 overflow-hidden' style={{ maxWidth: "30px", objectFit: "cover", }}>
                                            <img className='img-fluid' src="https://w7.pngwing.com/pngs/178/595/png-transparent-user-profile-computer-icons-login-user-avatars-thumbnail.png" alt={""} />
                                        </div>
                                        <div><p className='m-0 fs-7'>{user?.name}</p></div>
                                    </div>)
                            })
                        }
                    </> :
                        <>
                            <div className='my-2'>
                                <div className='h-100 d-flex align-items-start active-users' style={{ overflow: "scroll", scrollBehavior: "smooth", transition: ".4s" }} ref={activeUserRef} onMouseOver={handleOver} onMouseDown={handleGrabbing}>
                                    {
                                        users?.slice(0, 10)?.map((item: any, index: number) => {
                                            return (
                                                <div key={index} className='active-users-wrapper'>
                                                    {
                                                        userInfo?.id !== item?.id ?
                                                            <ActiveUser user={item} /> : ""
                                                    }
                                                </div>
                                            )
                                        })
                                    }
                                    {
                                        users?.length > 10 ?
                                            <div style={{ paddingRight: "10px" }} className='d-flex justify-content-center'>
                                                <div style={{ width: "60px", height: "60px", borderRadius: "50%", overflow: "hidden" }} className='flex-column text-white d-flex justify-content-center align-items-center bg-secondary rounded-circle'>
                                                    <BsArrowRight className="fs-4" />
                                                </div>
                                            </div>
                                            :
                                            ""
                                    }
                                </div>
                            </div>
                            <div>
                                {
                                    users?.map((item: any) => {
                                        // console.log("from history map",item)
                                        return (
                                            <span key={item?.id}>
                                                {
                                                    userInfo?.id !== item?.id ?
                                                        <ChatListItem user={item} key={item?.id} /> : ""
                                                }
                                            </span>
                                        )
                                    })
                                }
                            </div>
                        </>
                }

            </div>
        </>
    )
}
