import React, { useEffect, useState } from 'react'
import Dashboard from '../components/Dashboard//Dashboard'
import { useStateProvider } from '../context/StateContext'
import { reducerCases } from '../context/constant'

export default function Chat() {
    const [lon, setLon] = useState<any>()
    const [lat, setLat] = useState<any>()
    const [{ currentChatUser, userInfo, current_location }, dispatch] = useStateProvider()

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

    })

    useEffect(() => {
        dispatch({
            type: reducerCases.SET_LOCATION, current_location: {
                lat: lat,
                lon: lon
            }
        })
    }, [lat, lon])

    return (
        <>
            <Dashboard />
        </>
    )
}
