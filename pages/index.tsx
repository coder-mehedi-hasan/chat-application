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
		window.localStorage.setItem('messageToken', user?.messageToken)
		window.localStorage.setItem('userToken', user?.userToken)
		window.localStorage.setItem('userId', user?.id)
		if (userInfo === undefined) {
			dispatch({
				type: reducerCases.SET_USER_INFO, userInfo: {
					id: user?.id,
					messageToken: user?.messageToken,
					userToken: user?.userToken,
					name: user?.name
				}
			})
		}

		router.push('/chat')
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
												<Button variant="primary" className='mx-2' onClick={handleLogout}>Log Out</Button>
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
