'use client'
import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { postImages } from '@/utils/data'
import { AiFillLike, AiOutlineLike } from "react-icons/ai";
import { FaRegCommentDots } from "react-icons/fa6";
import Options from '@/components/Options/Options'
import Comment from '@/components/Post/Comment'
import calculateTime from '@/utils/calculateTime';
import { useUserById, useCommentOnPost, useAddLike } from '@/utils/Hooks/UseHooks';
import { useUser } from '@/utils/Context/UserContext';
import { notification } from 'antd';
import server from '@/utils/server';
import Link from 'next/link'
import axios from 'axios'
import { useCookies } from 'react-cookie';

function Post({ post, reload }) {
    const [showComment, setShowComment] = useState(false)
    const [cookies, setCookie] = useCookies(['x-auth-token'])
    const [comments, setComments] = useState(post?.comments)
    const [newComment, setNewComment] = useState('')
    const [likes, setLikes] = useState(post?.likes)
    const { user, loading, error } = useUserById(post?.user?._id)
    const { user: currentUser } = useUser()
    const { addComment } = useCommentOnPost()
    const { addLike } = useAddLike()
    const [isLiked, setIsLiked] = useState(post?.isLikedByUser)
    const [isCommentEdited, setIsCommentEdited] = useState(false)
    const [comment, setComment] = useState()

    const handleEdited = (comment) => {
        setIsCommentEdited(true)
        setComment(comment)
        setNewComment(comment?.comment)
    }
    const handleDeleted = (comment) => {
        deleteComment(comment?._id)
    }

    const editComment = async (commentId, newComment) => {
        try {
            const { data } = await axios.put(`${server}/api/post/comment/${post?._id}/edit/${commentId}`, { newCommentText: newComment }, {
                headers: {
                    'x-auth-token': cookies['x-auth-token']
                }
            })
            if (data?.success) {
                notification.success({
                    message: 'Success',
                    description: data?.message,
                })
                setComments(comments.map(comment => comment?._id === commentId ? { ...comment, comment: newComment } : comment))
                setNewComment('')
            }
            else {
                notification.error({
                    message: 'Error',
                    description: data?.message,
                })
            }
        }
        catch (err) {
            console.log(err)
        }
    }
    const handleAddComment = async (e) => {
        e.preventDefault()
        if (isCommentEdited) {
            editComment(comment?._id, newComment)
            setIsCommentEdited(false)
            return
        } else {
            try {
                const data = await addComment(post?._id, newComment)
                if (data?.success) {
                    setNewComment('')
                    const newCommentObj = {
                        user: {
                            _id: currentUser?._id,
                            fName: currentUser?.fName,
                            lName: currentUser?.lName,
                            userName: currentUser?.userName,
                            profileImage: currentUser?.profileImage
                        },
                        _id: data?.comment?._id,
                        comment: newComment,
                        createdAt: Date.now()

                    }
                    let newComments = [...comments]
                    newComments.unshift(newCommentObj)
                    setComments(newComments)
                    notification.success({
                        message: 'Success',
                        description: data?.message,
                    })
                }
                else {
                    notification.error({
                        message: 'Error',
                        description: data?.message,
                    })
                }
            }
            catch (err) {
                console.log(err)
            }
        }


    }

    const handleAddLike = async () => {
        try {
            const data = await addLike(post?._id)
            if (data?.success) {
                setIsLiked(!isLiked)
                if (isLiked) {
                    setLikes(likes.filter(like => like?._id !== currentUser._id))
                }
                else {
                    setLikes([...likes, currentUser._id])
                }
                notification.success({
                    message: 'Success',
                    description: data?.message,
                })
            }
            else {
                notification.error({
                    message: 'Error',
                    description: data?.message,
                })
            }
        }
        catch (err) {
            console.log(err)
        }
    }

    const deleteComment = async (commentId) => {
        try {
            const { data } = await axios.delete(`${server}/api/post/comment/${post?._id}/edit/${commentId}`, {
                headers: {
                    'x-auth-token': cookies['x-auth-token']
                }
            })
            if (data?.success) {
                notification.success({
                    message: 'Success',
                    description: data?.message,
                })
                setComments(comments.filter(comment => comment?._id !== commentId))
            }
            else {
                notification.error({
                    message: 'Error',
                    description: data?.message,
                })
            }
        }
        catch (err) {
            console.log(err)
        }
    }

    const replyToComment = async (commentId, reply) => {
        try {
            const { data } = await axios.put(`${server}/api/post/reply-comment/${post?._id}/edit/${commentId}`, { replyText: reply }, {
                headers: {
                    'x-auth-token': cookies['x-auth-token']
                }
            })
            if (data?.success) {
                notification.success({
                    message: 'Success',
                    description: data?.message,
                })
                const da = {
                    user: {
                        _id: currentUser?._id,
                        fName: currentUser?.fName,
                        lName: currentUser?.lName,
                        userName: currentUser?.userName,
                        profileImage: currentUser?.profileImage
                    },
                    _id: Date.now(),
                    comment: reply,
                    createdAt: Date.now()
                }
                const arr = []
                const commentPromise = comments.map((comment) => {
                    if (comment?._id === commentId) {
                        if (!comment?.reply) {
                            arr.push(da)
                        } else {
                            arr.push(...comment?.reply)
                            arr.push(da)
                        }
                    }
                    return { ...comment, reply: arr }
                })

                setComments(commentPromise)
            }
            else {
                notification.error({
                    message: 'Error',
                    description: data?.message,
                })
            }
        }
        catch (err) {
            console.log(err)
        }
    }


    if (loading) return <div>Loading...</div>
    if (error) return <div>{error}</div>

    return (
        <div className='bg-white shadow-md rounded-md p-3 relative  my-2'>
            <div className='absolute top-5 right-5'>
                {/* <Options userId={post?.userId} /> */}
            </div>
            <div className='flex'>
                <Link href={`/profile/${user?.userName}`}>
                    <img src={`${server}/images/${post?.user?.profileImage}`} width={50} height={50} className='object-cover rounded-full mr-3' />
                </Link>
                <div>
                    <Link href={`/profile/${user?.userName}`} className='text-md block'>{user?.fName} {user?.lName}</Link>
                    <Link href={`/profile/${user?.userName}`} className='block text-[12px] text-black'>@{user?.userName}</Link>
                    <p className='text-[12px] text-gray-500'>{post?.isEdited ? calculateTime(post?.postUpdatedAt) : calculateTime(post?.createdAt)} {post?.isEdited && "• Edited"}</p>
                </div>
            </div>
            <div>
                <Link href={`/post/${post?._id}`} className='text-lg my-3'>{post?.title}</Link>
                <p className='text-sm font-normal text-gray-800 my-5 flex flex-wrap'>
                    {post?.description?.length > 200 ? post?.description?.slice(0, 150) + '' : post?.description}
                </p>
                <div className='flex justify-end my-2 font-normal'>
                    <Link href={`/post/${post?._id}`} className='text-blue-600 hover:underline cursor-pointer'>... see more</Link>
                </div>
                <div className='w-full h-[300px]'>
                    <img src={`${server}/images/${post?.postImage}`} width={300} height={300} className='object-cover w-full h-full' />
                </div>
                {/* <div className='grid grid-cols-3 gap-1'>

                    {postImages.map((image, index) => {
                        return (
                            <div key={index}>
                                <Image src={image} width={200} height={200} className='w-full h-full' />
                            </div>
                        )
                    })}
                </div> */}
            </div>

            <div className='mt-5'>
                <div className='flex justify-between items-center'>
                    <div onClick={handleAddLike} className='flex items-center gap-2 cursor-pointer px-5 py-2 hover:bg-slate-200 transition-all rounded-full'>
                        {isLiked ? <AiFillLike className='text-xl text-blue-500' /> : <AiOutlineLike className='text-xl text-gray-500' />}
                        <p className='text-gray-500'>Likes {likes?.length}</p>
                    </div>
                    <div onClick={() => setShowComment(!showComment)} className='flex items-center gap-2 cursor-pointer px-5 py-2 hover:bg-slate-200 transition-all rounded-full'>
                        <FaRegCommentDots className='text-xl text-gray-500' />
                        <p className='text-gray-500'>Comments {comments?.length}</p>
                    </div>
                </div>
            </div>

            {
                showComment && (
                    <div>

                        <div className='flex mt-5'>
                            <img src={`${server}/images/${currentUser?.profileImage}`} width={30} height={30} className='object-cover rounded-full mr-3' />
                            <form onSubmit={handleAddComment} className='w-[80%]' >
                                <input value={newComment} onChange={(e) => setNewComment(e.target.value)} type="text" placeholder='Add a comment...' className='w-full outline-none border border-gray-500 rounded-full px-3 py-2' />
                            </form>
                        </div>
                        <div className='mt-5'>
                            {comments.map((comment, index) => (
                                <Comment key={index} comment={comment} handleEdited={handleEdited} replyToComment={replyToComment} handleDeleted={handleDeleted} />
                            ))}
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default Post