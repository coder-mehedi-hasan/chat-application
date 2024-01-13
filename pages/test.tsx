// pages/index.js
import { useQuery } from '@tanstack/react-query';
import React, { useState, useEffect, useRef } from 'react';

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
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


  const fetchMoreData = async () => {
    setLoading(true);
    const response = await fetch(`https://api.espd.school/api/v1/teacher?page=${page}`);
    const newData = await response.json();
    setData((prevData) => [...prevData, ...newData?.data?.data]);
    setPage((prevPage) => prevPage + 1);
    setLoading(false);
  };


  useEffect(() => {
    
    const handleScroll = (e) => {
      const scrollHeight = e.target.documentElement.scrollHeight
      const currentHeight = e.target.documentElement.scrollTop + window.innerHeight
      if (
        currentHeight + 1 >= scrollHeight
      ) {
        // When user reaches the bottom of the page, load more data
        fetchMoreData();
      }
    };

    // Add event listener for scroll
    window.addEventListener('scroll', handleScroll);

    // Remove event listener on component unmount
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);


  console.log(data)

  return (
    <div  >
      <h1>Infinite Scrolling Example</h1>
      {data?.map((item: any, index) => (
        <div className="card" style={{ width: "18rem" }}>
          <img src={item?.profile_photo} className="card-img-top" alt={item?.first_name} />
          <div className="card-body">
            <h5 className="card-title">{item?.first_name} {item?.last_name}</h5>
            <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
            <a href="#" className="btn btn-primary">Go somewhere</a>
          </div>
        </div>
      ))}
      {loading && <p>Loading...</p>}
    </div>
  );
};
export default Home;
