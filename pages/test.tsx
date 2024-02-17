"use client"
import { useRef, useState } from 'react';

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
  /*
  "contentInfo":"{
    "c":false,
    "i":"65cf48902296f80686cfb3c2",
    "n":"Mehedi",
    "o":"Hello",
    "r":"Testing",
    "rc":false
  }"
  ,
  "{
    "c":true,
    "i":"65cf4ef52296f80686cfb3ce",
    "n":"Mehedi",
    "o":"https://cdn.kotha.app/messaging/1708084978537_user_feed_17080849770823550786385508246157.webp",
    "r":"Oóo",
    "rc":false
  }"
  

  */

  return (
    <div>
      {/* <h1>Welcome to My Next.js App</h1>
      <button onClick={() => showNotification()}>Show Notification</button> */}
      {/* <iframe width="560" height="315" src="https://www.youtube.com/embed/707roYCfOts?si=SNuy29cuZNuhmm8s" title="YouTube video player" allowFullScreen={true}  frameborder="0" allow='autoplay'></iframe> */}
      <iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/707roYCfOts?si=SNuy29cuZNuhmm8s" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
    </div>

  );
};
export default Home;
