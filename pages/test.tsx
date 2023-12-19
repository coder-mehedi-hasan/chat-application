import React from 'react';
import AudioRecorder from '../components/audio';

const Test = () => {
  return (
    <div>
      <h1>Audio Recorder Example</h1>
      <AudioRecorder />
      {/* <input type="file" name="" id="" onChange={(e)=> console.log(e?.target?.files)} /> */}
    </div>
  );
};

export default Test;
