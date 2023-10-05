import React from 'react';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';


export default function SideBarItemAfter({ data }) {
  return (
    <div className='d-flex align-items-center '>
      <div>
        <Image src={data?.image} style={{ height: "50px", width: "50px" }} roundedCircle />
      </div>
      <div className='ms-3' >
        <p style={{ fontSize: "15px" }} className='m-0 fw-medium'>{data?.name}</p>
        <p style={{ fontSize: "12px" }} className='m-o fw-light'>{data?.email}</p>
      </div>
    </div>
  )
}
