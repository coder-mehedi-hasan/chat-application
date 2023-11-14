import React, { useEffect } from 'react'

export default function Home() {
	useEffect(() => {
		const data = fetch('https://messaging-dev.kotha.im/mobile/api/messages/unread/-1?currentPageIndex=0&recordPerPage=500', {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'x-access-token': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVjMThlZmE1YzJhNDdkMDAwY2MxNDY1YiIsImlhdCI6MTY5OTM4MjE1OSwiZXhwIjoxNzA0NTY2MTU5fQ.36t-i2E7c2-1Lqy7r8drr3qOWPmhJtuTaifNvE9JalQ" // Pass the token in the header
			}
		})
			.then(response => {
				if (response.ok) {
					return response.json(); // If response is successful, parse the JSON data
				}
				throw new Error('Network response was not ok.');
			})
			.then(data => {
				// Handle the data fetched
				console.log({ data });
			})
			.catch(error => {
				// Handle errors during the fetch
				console.error('There was a problem with the fetch operation:', error);
			});
		console.log({ data })
	})
	return (

		<>
		</>
	);
}
