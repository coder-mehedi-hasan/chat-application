import React, { useEffect } from 'react'
import { useStateProvider } from '../context/StateContext';
import { io } from 'socket.io-client';
import { reducerCases } from '../context/constant';
import Link from 'next/link';
import { Button, ButtonGroup, Card, CardGroup } from 'react-bootstrap';
import user from '../fake_data/user.json'
import { Router, useRouter } from 'next/router';

export default function Home() {
	const [{ userInfo }, dispatch] = useStateProvider()

	const router = useRouter()

	const login = (user) => {
		window.localStorage.setItem('userName', user?.name)
		window.localStorage.setItem('token', user?.token)
		window.localStorage.setItem('userId', user?.id)
		if (userInfo === undefined) {
			dispatch({
				type: reducerCases.SET_USER_INFO, userInfo: {
					id: user?.id,
					token: user?.token,
					name: user?.name
				}
			})
		}

		router.push('/chat')
	}

	return (
		<>
			<CardGroup>
				{
					user?.map(item => {
						return (
							<Card style={{ width: '18rem' }} key={item?.id}>
								<Card.Img variant="top" src={item?.image} />
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

											</ButtonGroup>
										</>
											:
											<Button variant="primary" onClick={() => login(item)}>LogIn</Button>
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
