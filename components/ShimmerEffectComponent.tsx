import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'


export default function ShimmerEffectComponent({ children, message, ...props }) {
    const [loading, setLoading] = useState(message?.isLoading ?? false)
    const url = message?.messageFiles?.length && message?.messageFiles[0]?.filepath;
    let style = {
        height: "200px", width: "200px", borderRadius: "20px"
    }
    if (props.style) {
        style = { ...style, ...props.style }
    }

    const { data, isLoading, refetch } = useQuery({
        queryKey: [`image loading ${message?._id}`],
        queryFn: () => validateImageUrl(url),
        staleTime: 0,
        enabled: loading
    })

    function validateImageUrl(imageUrl: any) {
        fetch(imageUrl)
            .then(response => {
                if (response.ok) {
                    setLoading(false)
                } else {
                    setLoading(true)
                }
            })
            .catch(error => {
                setLoading(true)
            });
        return loading
    }

    useEffect(() => {
        let intervalId: any;
        if (loading) {
            intervalId = setInterval(() => {
                refetch();
            }, 1000);
        } else {
            clearInterval(intervalId);
        }
        return () => {
            clearInterval(intervalId);
        };
    }, [loading]);

    if (loading) {
        return <Skeleton highlightColor='#c5c5c5' style={style} />
    } else {
        return <>{children}</>
    }
}
