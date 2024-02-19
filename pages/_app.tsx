import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import 'bootstrap/dist/css/bootstrap.min.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import React, { useEffect, useRef, useState } from 'react';
import { io } from 'socket.io-client';
import { StateProvider, useStateProvider } from '../context/StateContext';
import reducer, { initialState } from '../context/StateReducers';
import { reducerCases } from '../context/constant';
import fakeUsers from '../fake_data/user.json';
import '../style/main.css';
import { handleMessageStatus } from '../utils/functions/message';


export default function App({ Component, pageProps }: AppProps) {
	const [queryClient] = React.useState(() => new QueryClient());

	return (
		<StateProvider initialState={initialState} reducer={reducer}>
			<QueryClientProvider client={queryClient}>
				<Head>
					<title>Kotha App</title>
					<link rel='shortcut icon' href='/favicon.png'></link>
				</Head>
				<Main Component={Component} pageProps={pageProps} />
			</QueryClientProvider>
		</StateProvider>
	);
}


export function Main({ Component, pageProps }: any) {
	const [lat, setLat] = useState<any>()
	const [lon, setLon] = useState<any>()
	const [{ currentChatUser, userInfo, current_location, chatContainerRef, chatHistoryUsers }, dispatch]: any = useStateProvider()
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
			// console.log("clientToClientMessage", response)
			if (response.sMessageObj?.messageMeta?.contentType === 3) {
				response.sMessageObj = { ...response.sMessageObj, isLoading: true }
			}
			if (response.sMessageObj.messageFiles) {
				response.sMessageObj.messageFiles = [response.sMessageObj.messageFiles]
			}
			const currentDate = new Date()?.toISOString()
			if (response.sMessageObj.messageFromUserID == currentChatUser?.id) {
				dispatch({ type: reducerCases.ADD_MESSAGE, newMessage: { ...response.sMessageObj, messageBody: response?.sMessageObj?.message, messageSentTime: currentDate, isLoading: true } })
				handleMessageStatus([response?.sMessageObj?._id], socket, 3)
				chatContainerRef?.current?.scrollIntoView();
			} else {
				const find = chatHistoryUsers?.find(user => user?.id == response.sMessageObj?.messageToUserID)
				console.log(find)
				if (find) {
					dispatch({ type: reducerCases.SET_HISTORY_USERS, users: [...chatHistoryUsers, ...[{ id: response.sMessageObj?.messageFromUserID, name: `Unknown User-${chatHistoryUsers?.length}`, image: "https://picsum.photos/200" }]] })
				}
				dispatch({ type: reducerCases.ADD_OTHERS_MESSAGE, newMessage: { ...response.sMessageObj, messageBody: response?.sMessageObj?.message, messageSentTime: currentDate } })
				handleMessageStatus([response?.sMessageObj?._id], socket, 2)
			}

		})

		return () => {
			if (socket.current) {
				socket?.current?.off('clientToClientMessage');
				dispatch({ type: reducerCases.SOCKET_EVENT, socketEvent: false });
			}
		};
	}, [socket.current, currentChatUser]);

	return (
		<Component pageProps={...pageProps} />
	)
}

