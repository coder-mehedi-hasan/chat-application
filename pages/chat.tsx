import { useEffect, useState } from 'react'
import Dashboard from '../components/Dashboard//Dashboard'
import { useStateProvider } from '../context/StateContext';


export default function Chat() {
   

    return (
        <>
            <Dashboard />
            {/* <StickersByCategory />
            <StickerCategories /> */}
            
        </>
    )
}

const StickerCategories = () => {
    const [categories, setCategories] = useState([]);
    const [{ userInfo }, dispatch] = useStateProvider()
    console.log(userInfo)
    useEffect(() => {
        fetch('https://user-dev.kotha.im/mobile/api/stickers/categories', {
            method: 'GET',
            headers: {
                'Authorization': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVjMThlZmE1YzJhNDdkMDAwY2MxNDY1YiIsImlhdCI6MTY5OTM4MjE1OSwiZXhwIjoxNzA0NTY2MTU5fQ.36t-i2E7c2-1Lqy7r8drr3qOWPmhJtuTaifNvE9JalQ"
            }
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Authentication Failed'); // Customize the error message as needed
                }
                return response.json();
            })
            .then(data => setCategories(data))
            .catch(error => console.error('Error fetching categories:', error));

    }, []);

    return (
        <div>
            <h2>Sticker Categories</h2>
            <ul>
                {/* {categories?.map((category, index) => (
                    <li key={index}>{category}</li>
                ))} */}
            </ul>
        </div>
    );
};

const StickersByCategory = () => {
    const [stickers, setStickers] = useState([]);
    const [{ userInfo }, dispatch] = useStateProvider()

    useEffect(() => {
        const category = 'Cricket'; // Replace with the desired category
        fetch(`https://user-dev.kotha.im/mobile/api/stickers/public?category=${category}`, {
            method: 'GET',
            headers: {
                'Authorization': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVjMThlZmE1YzJhNDdkMDAwY2MxNDY1YiIsImlhdCI6MTY5OTM4MjE1OSwiZXhwIjoxNzA0NTY2MTU5fQ.36t-i2E7c2-1Lqy7r8drr3qOWPmhJtuTaifNvE9JalQ"
            }
        })
            .then(response => response.json())
            .then(data => setStickers(data))
            .catch(error => console.error(`Error fetching ${category} stickers:`, error));
    }, []);

    return (
        <div>
            <h2>{`Stickers in Category: Cricket`}</h2>
            <ul>
                {/* {stickers?.map((sticker, index) => (
                    <li key={index}>
                        <img src={sticker?.Url} alt={`Sticker ${index}`} />
                    </li>
                ))} */}
            </ul>
        </div>
    );
};
