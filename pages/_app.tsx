import React from 'react'
import type { AppProps } from 'next/app'
import 'bootstrap/dist/css/bootstrap.min.css';
import '../style/main.css';
import { MessageProvider } from '../context/messageContext';
import { useState } from 'react';

export default function App({ Component, pageProps }: AppProps) {
	const [message, setMessage] = useState([])

	const addMessage = (msg) => {
		setMessage(msg)
	}

	return (
		<>
			<MessageProvider value={{ message, addMessage }}>
				<Component {...pageProps} />
			</MessageProvider>
		</>
	);
}
