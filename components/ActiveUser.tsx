import { useStateProvider } from '../context/StateContext'
import { reducerCases } from '../context/constant'

export default function ActiveUser({ user }:any) {
    const [{ currentChatUser, userInfo }, dispatch]:any = useStateProvider()

    const handleClickContact = () => {
        dispatch({ type: reducerCases.CHANGE_CURRENT_CHAT_USER, user: user })
    }
    return (
        <div style={{ padding: "0 5px" }} className='d-flex flex-column justify-content-center' onClick={handleClickContact}>
            <div className='active-user d-flex justify-content-center align-items-center'>
                <div style={{ height: "60px", width: "60px", borderRadius: "50%", overflow: "hidden" }}>
                    <img src={user?.image} className='img-fluid' />
                </div>
            </div>
            <p className='text-center text-black m-0' style={{ wordWrap: "break-word" }}>{user?.name}</p>
        </div>
    )
}
