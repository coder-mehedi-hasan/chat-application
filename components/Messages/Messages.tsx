import React from 'react'
import { Image } from 'react-bootstrap'
import { useMediaQuery } from 'react-responsive'


export default function Messages({ img }) {

  const isMobileWidth = useMediaQuery({ maxWidth: 768 })
  const isSmallWidth = useMediaQuery({ maxWidth: 480 })

  return (
    <div className="row my-3 w-100">
      <div className="d-flex align-items-end" style={{ maxWidth: isMobileWidth ? isSmallWidth ? "100%" : "80%" : "70%" }}>
        <div>
          <Image height={30} width={30} roundedCircle src={img}></Image>
        </div>
        <div className='bg-white mx-3 p-2 mb-4 rounded message-side-pill'>
          <div className=''>
            <p className='text-black m-0'>
              it amet consectetur adipisicing elit. Et impedit suscipit nulla dolor non sed, sapiente modi magni ea consequatur, quam eos pariatur, voluptatum laboriosam quasi temporibus provident recusandae aspernatur? Ex esse quam fugit aut animi fugiat, assumenda libero dignissimos iure magni cupiditate hic nostrum vero autem, doloribus ipsam eaque.
            </p>
          </div>
        </div>
      </div>
    </div >
  )
}
