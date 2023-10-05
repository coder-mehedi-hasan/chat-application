import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';

import React, { useState } from 'react'
import SideBarItemAfter from './SideBar/SideBarItemAfter';
import user from '../../fake_data/user.json';
import SideBarItemBefore from './SideBar/SideBarItemBefore';
import Image from 'react-bootstrap/Image';
import Image50X50 from '../common/Image50X50';
import UserHead from '../common/UserHead';
import SearchBox from './SearchBox';
import HomeChat from '../common/HomeChat';
import ChattingInterFace from '../common/ChattingInterFace';
import UserInfoBox from '../common/UserInfoBox';

export default function Dashboard() {
    const [check, setCheck] = useState(false)

    const [contactId, setContactId] = useState(null)


    return (
        <div className='w-100 p-0 container-fluid bg-dark' >
            <div className="d-flex">
                <div>
                    <Sidebar
                        collapsed={check}
                        backgroundColor='#212529'
                        width='300px'
                        collapsedWidth='65px'
                        style={{ height: "100vh" }}
                    >
                        <div className='py-3'>
                            <UserHead sideBarHandler={() => check ? setCheck(false) : setCheck(true)} />
                            <SearchBox />
                        </div>
                        <Menu style={{ height: "75%", overflowY: "scroll" }}
                            menuItemStyles={{
                                button: ({ level, active, disabled }) => {
                                    if (level === 0)
                                        return {
                                            color: disabled ? '#A7A9B7' : '#fff',
                                            backgroundColor: active ? '#22E19E' : undefined,
                                            "&:hover": {
                                                backgroundColor: "#024439b5 !important",
                                                color: "#f5f5f5 !important",
                                                fontWeight: "bold !important"
                                            },
                                        };

                                },
                            }}

                        >
                            {
                                user.map(item => {
                                    return (
                                        <MenuItem onClick={() => setContactId(item?.id)} key={item?.id} style={{ padding: "0px 5px", height: "65px" }} >
                                           <UserInfoBox user={item} size={45}/>
                                        </MenuItem>
                                    )
                                })
                            }
                        </Menu>
                    </Sidebar>
                </div>
                <div id='chat-app-layout'>
                    {
                        contactId === null ? <HomeChat /> : ""
                    }
                    {
                        contactId !== null ? <ChattingInterFace contact_id={contactId} /> : ""
                    }
                </div>
            </div>
        </div>
    )
}
