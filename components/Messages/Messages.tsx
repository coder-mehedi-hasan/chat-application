import React from 'react'
import { Image } from 'react-bootstrap'

export default function Messages() {
  return (
    <div className="row my-3 w-100">
      <div className="d-flex align-items-end" style={{ maxWidth: "70%" }}>
        <div>
          <Image height={30} width={30} roundedCircle src='https://i.ibb.co/cx2BgRC/image-32.png'></Image>
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
