import React from 'react'
import type { AppProps } from 'next/app'
import 'bootstrap/dist/css/bootstrap.min.css';
import '../style/main.css';
import { MessageProvider } from '../context/messageContext';
import { useState } from 'react';
import { StateProvider } from '../context/StateContext';
import Head from 'next/head';
import reducer, { initialState } from '../context/StateReducers';

export default function App({ Component, pageProps }: AppProps) {
	const [message, setMessage] = useState([])

	const addMessage = (msg) => {
		setMessage(msg)
	}

	return (
		<StateProvider initialState={initialState} reducer={reducer}>
			<Head>
				<title>Kotha App</title>
				<link rel='shortcut icon' href='/favicon.png'></link>
			</Head>
			<Component {...pageProps} />
		</StateProvider>
	);
}
