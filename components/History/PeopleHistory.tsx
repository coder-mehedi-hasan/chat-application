import React from 'react'
import TopNavBar from '../common/TopNavBar'
import { useQuery } from '@tanstack/react-query';
import { get } from '../../services/api';


export default function PeopleHistory() {
    const { isError, data: users, isSuccess } = useQuery({
        queryKey: ['contact list'],
        queryFn: () => get('https://jsonplaceholder.typicode.com/users'),
        select: (data) => (data?.data)
    })

    return (
        <>
            <TopNavBar type={"people"} />
            <div style={{ width: "100%", height: "100%", overflow: "scroll" }} className='chat_history'>
                <div className='my-2'>
                    <div className='h-100 align-items-start' style={{ overflow: "scroll" }}>
                        {
                            users?.map((user: any) => {
                                return (
                                    <div key={user?.id} className='d-flex align-items-center  my-1 py-2 px-1'>
                                        <div className='mx-1 overflow-hidden' style={{ maxWidth: "20px", objectFit: "cover", }}>
                                            <img className='img-fluid' src="https://w7.pngwing.com/pngs/178/595/png-transparent-user-profile-computer-icons-login-user-avatars-thumbnail.png" alt={""} />
                                        </div>
                                        <div><p className='m-0 fs-7'>{user?.name}</p></div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </>
    )
}
