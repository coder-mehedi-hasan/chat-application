import React, { useEffect, useRef, useState } from 'react'
import { useStateProvider } from '../context/StateContext'
import { io } from 'socket.io-client';
import { reducerCases } from '../context/constant';
import { AppProps } from 'next/app';

export default function Main({ Component, pageProps }) {
    const [lat, setLat] = useState<any>()
    const [lon, setLon] = useState<any>()
    const [{ currentChatUser, userInfo, current_location, messages, socketEvent }, dispatch] = useStateProvider()
    const socket = useRef()

    const getLocation = () => {
        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition((position) => {
                const { longitude, latitude } = position.coords
                setLon(longitude)
                setLat(latitude)
            })
        }
    }

    useEffect(() => {
        getLocation()
        const userId = window.localStorage.getItem("userId")
        const token = window.localStorage.getItem("token")
        const userName = window.localStorage.getItem("userName")
        if (userInfo === undefined) {
            dispatch({
                type: reducerCases.SET_USER_INFO, userInfo: {
                    id: userId,
                    token: token,
                    name: userName
                }
            })
        }
    }, [])

    useEffect(() => {
        dispatch({
            type: reducerCases.SET_LOCATION, current_location: {
                lat: lat,
                lon: lon
            }
        })
    }, [lat, lon])

    useEffect(() => {
        // console.log("socket   =>>>:", { userInfo })
        // console.log("socket   =>>>:", { current_location })
        if (userInfo && current_location) {
            const connectionKey = `${process.env.NEXT_PUBLIC_SOCKET_URL}?userId=${userInfo?.id}&name=${userInfo?.name}&lastSocketId=${"LAST_CONNECTED_SOCKETID"}&location={"longitude": ${current_location?.lon}, "latitude": ${current_location?.lat}}&token=${userInfo?.token}`
            socket.current = io(connectionKey)
            dispatch({ type: reducerCases.SET_SOCKET, socket: socket })
            socket.current.on('onlineClient', (online) => {})
        }
        // return () => {
        //     if (socket.current) {
        //         socket.current.disconnect();
        //     }
        // };
    }, [userInfo, current_location, dispatch]);


    useEffect(() => {
        if (socket.current && socketEvent) {
            socket.current.on('clientToClientMessage', (response) => {
                dispatch({ type: reducerCases.ADD_MESSAGE, newMessage: response.sMessageObj })
                dispatch({ type: reducerCases.SOCKET_EVENT, socketEvent: false })
            })
        }


        return () => {
            // Remove the event listener when the component unmounts if necessary
            if (socket.current) {
                socket.current.off('clientToClientMessage');
            }
        };
    }, [socket.current, dispatch, socketEvent]);
    return (
        <Component pageProps={...pageProps} />
    )
}
