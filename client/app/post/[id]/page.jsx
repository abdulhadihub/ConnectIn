"use client"
import React, { useState, useEffect } from 'react'
import server from '@/utils/server'
import axios from 'axios'
import { useCookies } from 'react-cookie'
import Detailed from '@/components/Profile/Detailed'
import IsAuth from '@/components/isAuth/isAuth'


const Page = ({ params }) => {
  const [post, setPost] = useState({});
  //eslint-disable-next-line
  const [cookies, setCookie] = useCookies(['x-auth-token']);
  const [load, setLoad] = useState(false);
  const reload = () => {
    setLoad(!load);
  }
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get(`${server}/api/post/feed-post/${params?.id}`, {
          headers: {
            'x-auth-token': cookies['x-auth-token']
          }
        });
        setPost(res?.data?.post);
        console.log("outside", res.data.post)
      } catch (error) {
        console.log(error)
      }
    }
    fetchPosts();
  }, [load])
  return (
    <div className='bg-[#f4f2ee]'>
      <div className='sm:mx-40 mx-10 py-5'>
        <Detailed post={post} reload={reload} />
      </div>
    </div>
  )
}

export default IsAuth(Page)
