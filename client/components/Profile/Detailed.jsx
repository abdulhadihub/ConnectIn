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
import { Modal, notification } from 'antd';
import server from '@/utils/server';
import Link from 'next/link'
import { FaEdit } from 'react-icons/fa';
import EditPost from '../Post/EditPost';

const Detailed = ({ post }) => {
    const [showComment, setShowComment] = useState(false)
    const [newComment, setNewComment] = useState('')
    const { user, loading, error } = useUserById(post?.user?._id)
    const { user: currentUser } = useUser()
    const { addComment } = useCommentOnPost()
    const { addLike } = useAddLike()
    const [postData, setPostData] = useState(post)

    const handleAddComment = async (e) => {
        e.preventDefault()
        try {
            const data = await addComment(post?._id, newComment)
            if (data?.success) {
                setNewComment('')
                const newCommentObj = {
                    user: currentUser._id,
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
    const [likes, setLikes] = useState(post?.likes)
    const [comments, setComments] = useState(post?.comments)
    const [isLiked, setIsLiked] = useState(post?.isLikedByUser)

    useEffect(() => {
        setLikes(post?.likes)
        setComments(post?.comments?.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)))
        setIsLiked(post?.isLikedByUser)
        setPostData(post)
    }, [post, loading])


    const [isModalOpen, setIsModalOpen] = useState(false)

    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const update = (post) => {
        setPostData(post)
    }
    if (loading) return <div>Loading...</div>

    return (
        <div className='bg-white shadow-md rounded-md p-3 relative '>
            <div className='absolute top-5 right-5'>
                {/* <Options userId={post?.userId} /> */}
            </div>
            <div className='flex'>
                <Link href={`/profile/${user?.userName}`}>
                    <img src={`${server}/images/${post?.user?.profileImage}`} width={50} height={50} className='rounded-full mr-3' />
                </Link>
                <div>
                    <Link href={`/profile/${user?.userName}`} className='text-md block'>{user?.fName} {user?.lName}</Link>
                    <Link href={`/profile/${user?.userName}`} className='block text-[12px] text-black'>@{user?.userName}</Link>
                    <p className='text-[12px] text-gray-500'>{postData?.isEdited ? calculateTime(postData?.postUpdatedAt) : calculateTime(postData?.createdAt)} {postData?.isEdited && "• Edited"}</p>
                </div>
            </div>
            <div>
                <div className='flex justify-between'>
                    <div className='text-lg my-3'>{postData?.title}</div>
                    {post?.user?._id === currentUser?._id && <div onClick={() => setIsModalOpen(true)}><FaEdit className='text-xl text-gray-500 cursor-pointer' /></div>}
                </div>
                <p className='text-sm font-normal text-gray-800 my-5 flex flex-wrap'>
                    {postData?.description}
                </p>
                <div className='w-full h-[600px]'>
                    <img src={`${server}/images/${postData?.postImage}`} className='object-fit w-full h-full' />
                </div>

                <div className='flex flex-wrap my-4'>
                    {postData?.interests?.map((interest, index) => (
                        <span key={index} className='bg-gray-200 px-3 py-1 rounded-full text-sm mr-3'>{interest}</span>
                    ))
                    }
                </div>
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
                            <img src={`${server}/images/${currentUser?.profileImage}`} width={30} height={30} className='rounded-full mr-3' />
                            <form onSubmit={handleAddComment} className='w-[85%]' >
                                <input value={newComment} onChange={(e) => setNewComment(e.target.value)} type="text" placeholder='Add a comment...' className='w-full outline-none border border-gray-500 rounded-full px-5 py-2' />
                            </form>
                        </div>
                        <div className='mt-5'>
                            {comments?.map((comment, index) => (
                                <Comment key={index} comment={comment} />
                            ))}
                        </div>
                    </div>
                )
            }

            <Modal width={1000} title={`Edit Post`}  open={isModalOpen} onOk={handleOk} onCancel={handleCancel}
                footer={null}
            >
                <EditPost post={post} updateData={update} hidemodal={handleOk} />
            </Modal>
        </div>
    )
}

export default Detailed