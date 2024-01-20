import React, { useEffect, useState } from 'react'
import { useStateProvider } from '../context/StateContext';
import { io } from 'socket.io-client';
import { reducerCases } from '../context/constant';
import Link from 'next/link';
import { Button, ButtonGroup, Card, CardGroup } from 'react-bootstrap';
import user from '../fake_data/user.json'
import { Router, useRouter } from 'next/router';
import { useMutation } from '@tanstack/react-query';

export default function Home() {
	const [{ userInfo }, dispatch] = useStateProvider()
	const [loading, setLoading] = useState(false)

	// const {} = useMutation()

	const router = useRouter()

	const login = async (user) => {
		setLoading(!loading)
		const res = await fetch("https://user-dev.kotha.im/mobile/oauth2/authorize?client_id=1235&response_type=code&redirect_uri=https%3A%2F%2Fuser-dev.kotha.im%2Fmobile%2Foauth2%2Fcode", {
			method: "GET",
			headers: {
				"Authorization": "Basic Kzg4MDE4NDMzNjk4NDM6MTIzNDU=",
				"Content-Type": "application/json"
			}
		})
		const data: any = await res?.json()
		if (!data?.code) {
			return alert('failed your login')
		}

		const loginResponse = await fetch('https://user-dev.kotha.im/mobile/oauth2/token', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
				"Authorization": "Basic MTIzNTpfMTIzNXRlc3Qk"
			},
			body: new URLSearchParams({
				'code': `${data?.code}`,
				'grant_type': 'authorization_code'
			})
		});

		const loginData = await loginResponse?.json()
		if (!loginData?.access_token) {
			return alert('failed your login')
		}
		window.localStorage.setItem('userName', user?.name)
		window.localStorage.setItem('messageToken', user?.messageToken)
		window.localStorage.setItem('userToken', loginData?.access_token?.value)
		window.localStorage.setItem('userId', user?.id)
		if (userInfo === undefined) {
			dispatch({
				type: reducerCases.SET_USER_INFO, userInfo: {
					id: user?.id,
					messageToken: user?.messageToken,
					userToken: loginData?.access_token?.value,
					name: user?.name
				}
			})
		}
		router.push('/chat')
		setLoading(!loading)
	}

	const handleLogout = () => {
		window.localStorage.removeItem("userId")
		window.localStorage.removeItem("userName")
		window.localStorage.removeItem("messageToken")
		window.localStorage.removeItem("userToken")
		window.location.reload()
	}

	return (
		<>
			<CardGroup>
				{
					user?.map(item => {
						return (
							<Card style={{ width: '18rem' }} key={item?.id}>
								<Card.Img variant="top" src={item?.image} style={{maxWidth:"200px"}} className='img-fluid' />
								<Card.Body>
									<Card.Title>{item?.name}</Card.Title>
									<Card.Text>
										Id: {item?.id}
									</Card.Text>
									{
										userInfo?.id === item?.id ? <>
											<ButtonGroup>
												<Button variant="primary" disabled>Logged</Button>
												<Button variant="primary" onClick={() => router.push('chat')}>Go to chat</Button>
												<Button variant="primary" className='mx-2' onClick={handleLogout}>Log Out</Button>
											</ButtonGroup>
										</>
											:
											<Button variant="primary" onClick={() => login(item)}>LogIn

												{
													loading ?
														<div className="spinner-border spinner-border-sm ms-1" role="status">
															<span className="visually-hidden">Loading...</span>
														</div> : ""
												}
											</Button>
									}
								</Card.Body>
							</Card>
						)
					})
				}
			</CardGroup>
		</>
	);
}
