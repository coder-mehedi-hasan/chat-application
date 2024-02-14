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
import fakeUsers from '../fake_data/user.json'


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
	const [{ currentChatUser, userInfo, current_location, messages, socketEvent, otherMessages, chatContainerRef, users }, dispatch]: any = useStateProvider()
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
			const fUser = fakeUsers?.filter(item => item?.id !== userId)
			dispatch({
				type: reducerCases.SET_USERS, users: fUser
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
		if (userInfo && current_location) {
			const connectionKey = `${process.env.NEXT_PUBLIC_SOCKET_URL}?userId=${userInfo?.id}&name=${userInfo?.name}&lastSocketId=${"LAST_CONNECTED_SOCKETID"}&location={"longitude": ${current_location?.lon}, "latitude": ${current_location?.lat}}&token=${userInfo?.messageToken}`
			socket.current = io(connectionKey)

			dispatch({ type: reducerCases.SET_SOCKET, socket: socket })
			socket.current.on('onlineClient', (online: any) => {
			})
			socket.current.on('onlineClientList', (onlineList: any) => {
			})

			// socket?.current?.onAny((event, ...args) => {
			// 	console.log(`Received event: ${event}, with data:`, args);
			// });


		}
		return () => {
			if (socket.current) {
				socket.current.off('onlineClientList');
				socket.current.off('onlineClient');
			}
		};



	}, [userInfo, current_location, dispatch]);


	useEffect(() => {
		socket?.current?.on('clientToClientMessage', (response: any) => {
			// const find = users?.find((user: any) => user?.id === response?.sMessageObj?.messageFromUserID)
			// if (!find) {
			// 	dispatch({
			// 		type: reducerCases.ADD_USERS, newUser:
			// 		{
			// 			"id": response?.sMessageObj?.messageFromUserID,
			// 			"name": "Unknown User",
			// 			"email": "tatorfun@gmail.com",
			// 			"phone": "88099956234",
			// 		},

			// 	})
			// }
			console.log("clientToClientMessage",response)
			if (response.sMessageObj.messageFromUserID == currentChatUser?.id) {
				dispatch({ type: reducerCases.ADD_MESSAGE, newMessage: response.sMessageObj })
				socket.current.emit('updateMessageStatusV2', {
					_ids: [response?.sMessageObj?._id],
					currentStatus: 3
				})
				chatContainerRef?.current?.scrollIntoView();
			} else {
				dispatch({ type: reducerCases.ADD_OTHERS_MESSAGE, newMessage: response.sMessageObj })
				const find = users?.find((user: any) => user?.id === response?.sMessageObj?.messageFromUserID)
				if(!find){
					console.log("developer received", response.sMessageObj)
				}
			}

		})

		// socket?.current?.on('updateSenderMessageStatusV2', (data: any) => {
		// 	console.log("updateSenderMessageStatusV2 09090", data)
		// 	// if (data) {
		// 	// 	// handlStatusData(data)
		// 	// }
		// });

		// socket?.current?.on('updateReceiverMessageStatusV2', function (data: any) {
		// 	console.log("updateReceiverMessageStatusV2rece 09090", data)
		// 	// if (data) {
		// 	// 	// handlStatusData(data)
		// 	// }
		// });
		return () => {
			if (socket.current) {
				socket?.current?.off('clientToClientMessage');
				// socket?.current?.off('updateSenderMessageStatusV2')

				// socket?.current?.off('updateReceiverMessageStatusV2')

				dispatch({ type: reducerCases.SOCKET_EVENT, socketEvent: false })
			}
		};
		// }
	}, [socket.current, currentChatUser]);

	return (
		<Component pageProps={...pageProps} />
	)
}

