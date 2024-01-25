"use client"
import React, { useState, useEffect } from 'react'
import EditPost from '@/components/Post/EditPost'
import axios from 'axios'
import server from '@/utils/server'
import { useCookies } from 'react-cookie'

const Page = ({ params }) => {
    console.log("prams id", params?.id)
    const [data, setData] = useState({})
    const [cookies] = useCookies(['x-auth-token']);

    // Fetch post data using postId
    useEffect(() => {
        const fetchPostData = async () => {
            try {
                const res = await axios.get(`${server}/api/post/post-id/${params?.id}`, {
                    headers: {
                        'x-auth-token': cookies['x-auth-token'],
                    },
                });
                setData(res?.data?.post);
                console.log("data", res?.data?.post)
            } catch (error) {
                console.error(error);
            }
        };

        fetchPostData();
    }, [params?.id]);
    return (
        <EditPost post={data} />
    )
}

export default Page
