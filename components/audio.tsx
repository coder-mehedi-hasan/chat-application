// components/AudioRecorder.js
// import React, { useState, useRef } from 'react';

// const AudioRecorder = () => {
//   const [isRecording, setIsRecording] = useState(false);
//   const [audioBlob, setAudioBlob] = useState(null);
//   const [recordingTime, setRecordingTime] = useState(0);
//   const mediaRecorderRef = useRef(null);

//   const handleStartRecording = async () => {
//     try {
//       const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
//       const mediaRecorder = new MediaRecorder(stream);
//       mediaRecorderRef.current = mediaRecorder;

//       let chunks = [];
//       let startTime = Date.now();

//       mediaRecorder.ondataavailable = e => {
//         if (e.data.size > 0) {
//           chunks.push(e.data);
//         }
//       };

//       mediaRecorder.onstop = () => {
//         const recordedBlob = new Blob(chunks, { type: 'audio/wav' });
//         setAudioBlob(recordedBlob);
//       };

//       mediaRecorder.start();
//       setIsRecording(true);

//       const timer = setInterval(() => {
//         setRecordingTime(Math.floor((Date.now() - startTime) / 1000));
//       }, 1000);

//       mediaRecorderRef.current.onstop = () => {
//         clearInterval(timer);
//       };
//     } catch (error) {
//       console.error('Error accessing microphone:', error);
//     }
//   };

//   const handleStopRecording = () => {
//     if (mediaRecorderRef.current && isRecording) {
//       mediaRecorderRef.current.stop();
//       setIsRecording(false);
//     }
//   };

//   const handleReset = () => {
//     setAudioBlob(null);
//     setRecordingTime(0);
//   };

//   const handleSend = () => {
//     // Implement sending logic here (e.g., send audioBlob to a server, etc.)
//     console.log(audioBlob)
//     if (audioBlob) {
//       // Example: Sending audioBlob to a hypothetical function sendAudioToServer
//       sendAudioToServer(audioBlob);
//     }
//   };

//   const sendAudioToServer = audioBlob => {
//     // Placeholder function for sending audio data to the server
//     console.log('Sending audio to server:', audioBlob);
//     // Include your code here to send the audioBlob to your server or perform further actions
//   };


//   return (
//     <div>
//       <button onClick={handleStartRecording} disabled={isRecording || audioBlob}>
//         Start Recording
//       </button>
//       <button onClick={handleStopRecording} disabled={!isRecording}>
//         Stop Recording
//       </button>
//       <button onClick={handleReset} disabled={!audioBlob}>
//         Reset
//       </button>
//       <p>Recording Time: {recordingTime} seconds</p>
//       <button onClick={handleSend}>Send</button>
//       {audioBlob && (
//         <div>
//           <p>Recorded Audio:</p>
//           <audio controls>
//             <source src={URL.createObjectURL(audioBlob)} type="audio/wav" />
//             Your browser does not support the audio element.
//           </audio>
//           <button onClick={handleSend}>Send</button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default AudioRecorder;
import React, { useState, useEffect } from 'react';
// Import your CSS file

const AutoWidthElement = () => {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      // Increase the width by 1% per second until it reaches 100%
      if (width < 100) {
        setWidth(prevWidth => prevWidth + 1);
      } else {
        clearInterval(interval); // Stop interval when width reaches 100%
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [width]);

  return (
    <div style={{
      width: "80%",
      margin: "50px auto"
    }}>
      <div
        className="auto-width-element"
        style={{
          width: `${width}%`,
          backgroundColor: "#3498db",
          height: "50px",
          transition: "width 0.5s ease-in -out"
        }}
      ></div>
    </div >
  );
};

export default AutoWidthElement;
