import React, { useState } from 'react'
import { Image } from 'react-bootstrap'
import { useMediaQuery } from 'react-responsive'
import { BsCheck2All, BsCheck2, BsCheckLg, BsCheckAll } from "react-icons/bs";
import { useEffect } from 'react';
import { useRef } from 'react';
import { useContext } from 'react';
import { MessageConsumer } from '../../context/messageContext';

export default function Messages({ img, data }) {
  const isMediumWidth = useMediaQuery({ maxWidth: 768 })
  const isLargeWidth = useMediaQuery({ maxWidth: 992 })
  const messageContext = useContext(MessageConsumer)
  const [del, setDel] = useState(false)
  const divRef = useRef()

  const currentDate = new Date()
  const getTime = (date) => {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    const amOrPm = hours >= 12 ? 'PM' : 'AM';
    const timeString = hours + ":" + (minutes < 10 ? "0" : "") + minutes + " " + amOrPm;
    return timeString
  }

  const currTime = getTime(currentDate)
  useEffect(() => {
    divRef.current.scrollIntoView();
    if(currTime + 2000){
      setDel(true)
    }else{
      setDel(false)
    }
  }, [messageContext.message]);


  return (
    <div className="row my-3 w-100" ref={divRef}>
      <div className="d-flex align-items-end" style={{ width: isMediumWidth ? "100%" : isLargeWidth ? "90%" : "50%", transition: ".4s" }}>
        <div>
          <Image height={30} width={30} roundedCircle src={img}></Image>
        </div>
        <div className='mx-3 bg-white p-2 mb-4 rounded message-side-pill'>
          {
            data?.content !== null ?
              <div className='w-100 p-2'>
                <p className='text-black m-0'>
                  {
                    data?.content
                  }
                </p>
              </div>
              : ""
          }
          {
            data?.content_img !== null ?
              <>
                <img src={data?.content_img} className='img-fluid' alt="sender img" />
              </> : ""
          }
          <div className='d-flex justify-content-end align-items-center text_gray'>
            <span style={{ fontSize: "12px" }} className='mx-1'>
              {
                currTime.toLocaleLowerCase()
              }
            </span>
            <span style={{ fontSize: "14px" }} className='mx-1'>
              {
                del ?
                  <BsCheckAll />
                  :
                  <BsCheckLg />
              }
            </span>
          </div>
        </div>
      </div>
    </div >
  )
}
