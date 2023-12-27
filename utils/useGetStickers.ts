import { useState } from 'react';
import { apiUrl } from './constant';

const useGetStickers = () => {
    const [stickersCategories, setStickersCategory] = useState([])
    const generateStickersCategory = async () => {
        const res = await fetch(apiUrl.stickerCategories, {
            method: "GET",
            headers: {
                'Authorization': `Bearer `,
                'Content-Type': 'application/json'
            }
        })
        const data = await res.json()
        setStickersCategory(data)

    };
    return { stickersCategories, generateStickersCategory };

};
export default useGetStickers;