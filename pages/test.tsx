import React from 'react';
import AutoWidthElement from '../components/audio';
import { useStateProvider } from '../context/StateContext';
import useGenerateRandomColor from '../utils/useRandomColorGenerate';


const Test = () => {
  const [{ currentChatUser, socket, userInfo }] = useStateProvider()
  const { color, generateColor } = useGenerateRandomColor()
  const handleReaction = () => {

    // socket.current.emit("editMessage",
    //   {
    //     _id: "658afe7784d64b6d69ee5186",
    //     react: true,
    //     reactionParams: {
    //       score: '1',
    //       reaction: "UP_VOTE",
    //       reactedBy: "5c18efa5c2a47d000cc1465b",
    //       cancel: false
    //     }
    //   },
    //   (response) => {
    //     console.log({ response })
    //   })
  }

  return (
    <div>
      <button onClick={generateColor} style={{ backgroundColor: color }}>
        check react
      </button>
      {/* <h1>Audio Recorder Example</h1> */}
      {/* <AutoWidthElement /> */}
      {/* <input type="file" name="" id="" onChange={(e)=> console.log(e?.target?.files)} /> */}
    </div>
  );
};

export default Test;
