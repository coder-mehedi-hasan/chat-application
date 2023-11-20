import React, { useEffect } from 'react'
import type { AppProps } from 'next/app'
import 'bootstrap/dist/css/bootstrap.min.css';
import '../style/main.css';
import { StateProvider, useStateProvider } from '../context/StateContext';
import Head from 'next/head';
import reducer, { initialState } from '../context/StateReducers';
import { io } from 'socket.io-client';
import { reducerCases } from '../context/constant';
import Main from './main';

export default function App() {

	return (
		<StateProvider initialState={initialState} reducer={reducer}>
			<Head>
				<title>Kotha App</title>
				<link rel='shortcut icon' href='/favicon.png'></link>
			</Head>
			{/* <Component {...pageProps} /> */}
			<Main />
		</StateProvider>
	);
}
