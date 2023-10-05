import React from 'react'
import type { AppProps } from 'next/app'
import 'bootstrap/dist/css/bootstrap.min.css';
import '../style/main.css';

export default function App({ Component, pageProps }: AppProps) {


	return (

		<>

			<Component {...pageProps} />
		</>
	);
}
