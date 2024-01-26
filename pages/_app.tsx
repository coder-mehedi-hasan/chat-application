import React, { useEffect, useRef, useState } from 'react'
import type { AppProps } from 'next/app'
import 'bootstrap/dist/css/bootstrap.min.css';
import '../style/main.css';
import { StateProvider, useStateProvider } from '../context/StateContext';
import Head from 'next/head';
import reducer, { initialState } from '../context/StateReducers';
import { io } from 'socket.io-client';
import { reducerCases } from '../context/constant';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'


export default function App({ Component, pageProps }: AppProps) {
	const [queryClient] = React.useState(() => new QueryClient());

	return (
		<StateProvider initialState={initialState} reducer={reducer}>
			<QueryClientProvider client={queryClient}>
				<Head>
					<title>Kotha App</title>
					<link rel='shortcut icon' href='/favicon.png'></link>
				</Head>
				{/* <Component {...pageProps} /> */}
				<Main Component={Component} pageProps={pageProps} />
			</QueryClientProvider>
		</StateProvider>
	);
}


export function Main({ Component, pageProps }: any) {
	const [lat, setLat] = useState<any>()
	const [lon, setLon] = useState<any>()
	const [{ currentChatUser, userInfo, current_location, messages, socketEvent }, dispatch]: any = useStateProvider()
	const socket: any = useRef()

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
		const messageToken = window.localStorage.getItem("messageToken")
		const userToken = window.localStorage.getItem("userToken")
		const userName = window.localStorage.getItem("userName")
		if (userInfo === undefined) {
			dispatch({
				type: reducerCases.SET_USER_INFO, userInfo: {
					id: userId,
					messageToken: messageToken,
					userToken: userToken,
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
			const connectionKey = `${process.env.NEXT_PUBLIC_SOCKET_URL}?userId=${userInfo?.id}&name=${userInfo?.name}&lastSocketId=${"LAST_CONNECTED_SOCKETID"}&location={"longitude": ${current_location?.lon}, "latitude": ${current_location?.lat}}&token=${userInfo?.messageToken}`
			// console.log("message Token",connectionKey)
			socket.current = io(connectionKey)

			// console.log("connection",io(connectionKey))
			dispatch({ type: reducerCases.SET_SOCKET, socket: socket })
			socket.current.on('onlineClient', (online: any) => {
				// console.log({ online })
			})
			socket.current.on('onlineClientList', (onlineList: any) => {
				// console.log({ onlineList })
			})

		}
		return () => {
		    if (socket.current) {
		        socket.current.off('onlineClientList');
		        socket.current.off('onlineClient');
		    }
		};



	}, [userInfo, current_location, dispatch]);

	return (
		<Component pageProps={...pageProps} />
	)
}

