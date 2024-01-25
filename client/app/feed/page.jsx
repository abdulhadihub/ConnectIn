'use client'
import React, { useState, useEffect } from 'react'
import UserWidget from '@/components/UserWidget/UserWidget'
import Post from '@/components/Post/Post'
import SuggestionsWidget from '@/components/SuggestionsWidget/SuggestionsWidget'
import { useUser } from '@/utils/Context/UserContext'
import isAuth from '@/components/isAuth/isAuth.jsx'
import { feedPosts } from '@/utils/data'
import axios from 'axios'
import { useCookies } from 'react-cookie'
import server from '@/utils/server'

function Page() {
    const { user } = useUser();
    const [posts, setPosts] = useState([]);
    //eslint-disable-next-line
    const [cookies, setCookie] = useCookies(['x-auth-token']);
    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const res = await axios.get(`${server}/api/post/feed-posts`, {
                    headers: {
                        'x-auth-token': cookies['x-auth-token']
                    }
                });
                setPosts(res?.data?.posts);
                console.log(res.data.posts)
            } catch (error) {
                console.log(error)
            }
        }
        fetchPosts();
    }, [])
    return (
        <>
            <div className='w-full bg-[#f4f2ee]'>
                <div className='w-[90%] mx-auto'>
                    <div className='grid grid-cols-12 py-5 gap-5'>
                        <div className='col-span-12 md:col-span-3'>
                            <UserWidget user={user} />
                        </div>

                        <div className='col-span-12 md:col-span-10 lg:col-span-6'>
                            {/* <div className='flex text-sm justify-end my-3'>

                                Sort by: <select className='border border-gray-300 rounded-md px-2 py-1 ml-2'>
                                    <option>Top</option>
                                    <option>New</option>
                                </select>
                            </div> */}
                            <div className='flex flex-col'>
                                {posts?.length === 0 && <div className='text-center text-gray-500'>No posts to show</div>}
                                {posts?.map((post, index) => (
                                    <Post key={index} post={post} />
                                ))}
                            </div>

                        </div>

                        <div className='col-span-12 lg:col-span-3'>
                            <SuggestionsWidget />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default isAuth(Page)