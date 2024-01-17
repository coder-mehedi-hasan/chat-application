"use client"
import { useQuery } from '@tanstack/react-query';
import React, { useState, useEffect, useRef } from 'react';

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(50);
  const containerRef = useRef(null);
  const [data, setData] = useState([])

  // const fetchMoreData = async (page: any) => {
  //   const response = await fetch(`https://api.espd.school/api/v1/teacher?page=${page}`);
  //   const newData = await response.json();
  // };

  // const {
  //   isLoading,
  //   isError,
  //   error,
  //   data,
  //   isFetching,
  // } = useQuery({
  //   queryKey: ['projects', page],
  //   queryFn: () => fetchMoreData(page),
  //   staleTime: 1,
  //   enabled:!!page
  // })


  // useEffect(() => {
  //   const handleScroll = (e) => {
  //     const scrollHeight = e.target.documentElement.scrollHeight
  //     const currentHeight = e.target.documentElement.scrollTop + window.innerHeight
  //     if (currentHeight + 1 >= scrollHeight) {
  //       setPage(pre => pre + 1)
  //     }
  //   }
  //   window.addEventListener('scroll', handleScroll)
  //   return () => window.removeEventListener('scroll', handleScroll)
  // }, [page])


  // const fetchMoreData = async () => {
  //   setLoading(true);
  //   const response = await fetch(`https://api.espd.school/api/v1/teacher?page=${page}`);
  //   const newData = await response.json();
  //   setData((prevData) => [...prevData, ...newData?.data?.data]);
  //   setPage((prevPage) => prevPage + 1);
  //   setLoading(false);
  // };

  // useEffect(() => {
  //   const handleScroll = (e) => {
  //     const scrollHeight = e.target.documentElement.scrollHeight
  //     const currentHeight = e.target.documentElement.scrollTop + window.innerHeight
  //     if (
  //       currentHeight + 1 >= scrollHeight
  //     ) {
  //       // When user reaches the bottom of the page, load more data
  //       fetchMoreData();
  //     }
  //   };

  //   // Add event listener for scroll
  //   window.addEventListener('scroll', handleScroll);

  //   // Remove event listener on component unmount
  //   return () => {
  //     window.removeEventListener('scroll', handleScroll);
  //   };
  // }, []);

  const showNotification = () => {
    if (Notification.permission === 'granted') {
      new Notification('Hello, this is a notification!')
    } else if (Notification.permission !== 'denied') {
      Notification.requestPermission().then(permission => {
        if (permission === 'granted') {
          new Notification('Permission granted! You can now receive notifications.');
        }
      });
    }
  };

  return (
    <div>
      <h1>Welcome to My Next.js App</h1>
      <button onClick={() => showNotification()}>Show Notification</button>
    </div>

  );
};
export default Home;
