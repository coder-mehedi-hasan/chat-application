import React from 'react'
import { Image } from 'react-bootstrap'
import { useMediaQuery } from 'react-responsive'


export default function Messages({ img }) {

  const isMediumWidth = useMediaQuery({ maxWidth: 768 })
  const isLargeWidth = useMediaQuery({ maxWidth: 992 })

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
        </div>
      </div>
    </div >
  )
}
