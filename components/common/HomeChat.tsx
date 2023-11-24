import React from 'react'
import { useMediaQuery } from 'react-responsive'

export default function HomeChat() {
  const isMobileWidth = useMediaQuery({ maxWidth: 576 })

  return (
    <>
      {
        isMobileWidth ?
          ""
          :
          <div style={{ height: "100vh", background: "rgb(0,0,0,0.3)", width: "100%" }} className='d-flex align-items-center justify-content-center'>
            <h3 className='m-0 p-0 text-white fw-medium'>Wellcome to Chatting Application</h3>
          </div>
      }
    </>
  )
}
