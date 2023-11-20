import React, { useEffect, useState } from 'react'
import Dashboard from '../components/Dashboard//Dashboard'
import { useStateProvider } from '../context/StateContext'
import { reducerCases } from '../context/constant'
import { io } from 'socket.io-client'

export default function Chat() {


    return (
        <>
            <Dashboard />
        </>
    )
}
