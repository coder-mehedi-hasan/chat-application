import React from 'react'
import { Image } from 'react-bootstrap'
import { useMediaQuery } from 'react-responsive'
import { BsCheck2All, BsCheck2, BsCheckLg, BsCheckAll } from "react-icons/bs";

export default function Messages({ img, del }) {
  const isMediumWidth = useMediaQuery({ maxWidth: 768 })
  const isLargeWidth = useMediaQuery({ maxWidth: 992 })
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

  return (
    <div className="row my-3 w-100">
      <div className="d-flex align-items-end" style={{ width: isMediumWidth ? "100%" : isLargeWidth ? "90%" : "75%", transition: ".4s" }}>
        <div>
          <Image height={30} width={30} roundedCircle src={img}></Image>
        </div>
        <div className='bg-white mx-3 p-2 mb-4 rounded message-side-pill'>
          <div className='w-100'>
            <p className='text-black m-0'>
              it amet consectetur adipisicing elit. Et impedit suscipit nulla dolor non sed, sapiente modi magni ea consequatur, quam eos pariatur, voluptatum laboriosam quasi temporibus provident recusandae aspernatur? Ex esse quam fugit aut animi fugiat, assumenda libero dignissimos iure magni cupiditate hic nostrum vero autem, doloribus ipsam eaque.
            </p>
          </div>
          <div className='d-flex justify-content-end align-items-center text_gray'>
            <span style={{fontSize:"12px"}} className='mx-1'>
              {
                currTime.toLocaleLowerCase()
              }
            </span>
            <span style={{fontSize:"14px"}} className='mx-1'>
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
