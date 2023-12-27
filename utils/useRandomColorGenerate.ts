import { useState } from 'react';

const useGenerateRandomColor = () => {
    const [color, setColor] = useState("")
    const generateColor = () => {
        const col = Math.random().toString(16).substr(-6)
        setColor("#" + col);
    };
    return { color, generateColor };

};
export default useGenerateRandomColor;