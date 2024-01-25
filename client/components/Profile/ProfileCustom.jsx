'use client';
import React, { useEffect, useState } from 'react'
import { MdOutlineModeEditOutline } from 'react-icons/md'
import { Form, Input, Modal, Select, message } from 'antd';
import { LuLinkedin } from "react-icons/lu";
import { ImAttachment } from "react-icons/im";
import { MdAttachEmail } from "react-icons/md";
import { FaPhone, FaPlus } from "react-icons/fa6";
import { GrFormPrevious, GrFormNext, GrGallery } from "react-icons/gr";
import { FaSwatchbook } from "react-icons/fa";
import Link from 'next/link';
import PostItem from './PostItem';
import { useUser } from '@/utils/Context/UserContext';
import client from '@/utils/client';
import { useCookies } from 'react-cookie';
import axios from 'axios';
import server from '@/utils/server';
import { notification } from 'antd';
import { TiTick } from "react-icons/ti";
import { IoMdShare } from "react-icons/io";
import CopyToClipboard from "react-copy-to-clipboard";
import { usePostsByUser } from '@/utils/Hooks/UseHooks';


const Profile = ({ user, isFollowing, isBlocked, isBlockedBy }) => {
  const { user: currentUser, updateUser } = useUser();
  //eslint-disable-next-line
  const [cookies, setCookie, removeCookie] = useCookies(['x-auth-token']);
  const [isMobile, setIsMobile] = useState(false);
  const [postsData, setPostsData] = useState(user?.posts || []);
  const { getPosts } = usePostsByUser()

  const [currentPage, setCurrentPage] = useState(0);
  const [isFollowingUser, setIsFollowingUser] = useState(isFollowing);
  const [isBlockedUser, setIsBlockedUser] = useState(isBlocked);
  const [newUserName, setNewUserName] = useState(user?.userName);
  const [isError, setIsError] = useState(false);



  const postsPerPage = isMobile ? 1 : 2;
  const totalPages = Math.ceil(postsData.length / postsPerPage);

  const handleNextPage = () => {
    setCurrentPage((prevPage) => (prevPage + 1) % totalPages);
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => (prevPage - 1 + totalPages) % totalPages);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); // Adjust the breakpoint as per your needs
    };

    handleResize(); // Check initially
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    const fetchPosts = async () => {
      const data = await getPosts(user?._id)
      if (data?.success) {
        setPostsData(data?.posts)
      }
    }
    fetchPosts()
  }, [user?._id])
  const handleCopy = () => {
    message.success('URL Copied');
  };
  const startIndex = currentPage * postsPerPage;
  const endIndex = startIndex + postsPerPage;
  const currentPosts = postsData?.slice(startIndex, endIndex);
  const PostList = ({ posts }) => {
    return (
      <div className={`grid ${isMobile ? "grid-cols-1" : "grid-cols-2"} gap-7 my-3`}>
        {posts.length > 0 ? posts.map((post, index) => (
          <PostItem key={index} data={post} />
        )) : <div>No Post</div>}
      </div>
      // </div>
    );
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleFollow = async () => {

    if (!cookies['x-auth-token']) return notification.error({
      message: 'Error',
      description: 'Please Login First',
    })
    if (isBlockedBy) return notification.error({
      message: 'Error',
      description: 'You are blocked by this user',
    })
    if (isBlockedUser) return notification.error({
      message: 'Error',
      description: 'You blocked this user',
    })

    if (currentUser?.userName === newUserName) return notification.error({
      message: 'Error',
      description: 'You cannot follow yourself',
    })

    if (!currentUser) {
      return notification.error({
        message: 'Error',
        description: 'Please Login First',
      })
    }
    try {
      const { data } = await axios.put(`${server}/api/user/follow/${user?._id}`, {}, {
        headers: {
          'x-auth-token': cookies['x-auth-token']
        }
      })
      if (data?.success) {
        setIsFollowingUser(true)
        notification.success({
          message: 'Success',
          description: data?.message,
        })
      }
    } catch (error) {
      console.log(error)
      notification.error({
        message: 'Error',
        description: error?.response?.data?.message,
      })
    }
  }

  const handleUnFollow = async () => {
    try {
      const { data } = await axios.put(`${server}/api/user/unfollow/${user?._id}`, {}, {
        headers: {
          'x-auth-token': cookies['x-auth-token']
        }
      })
      if (data?.success) {
        notification.success({
          message: 'Success',
          description: data?.message,
        })
        setIsFollowingUser(false)
      }
    } catch (error) {
      console.log(error)
      notification.error({
        message: 'Error',
        description: error?.response?.data?.message,
      })
    }
  }

  const handleBlock = async () => {
    try {
      const { data } = await axios.put(`${server}/api/user/block/${user?._id}`, {}, {
        headers: {
          'x-auth-token': cookies['x-auth-token']
        }
      })
      if (data?.success) {
        notification.success({
          message: 'Success',
          description: data?.message,
        })
        setIsBlockedUser(true)
      }
    } catch (error) {
      console.log(error)
      notification.error({
        message: 'Error',
        description: error?.response?.data?.message,
      })
    }
  }

  const handleUnblock = async () => {
    try {
      const { data } = await axios.put(`${server}/api/user/unblock/${user?._id}`, {}, {
        headers: {
          'x-auth-token': cookies['x-auth-token']
        }
      })
      if (data?.success) {
        notification.success({
          message: 'Success',
          description: data?.message,
        })
        setIsBlockedUser(false)
      }
    } catch (error) {
      console.log(error)
      notification.error({
        message: 'Error',
        description: error?.response?.data?.message,
      })
    }
  }
  
  return (
    <>
      <div className='sm:mx-36 mx-10 py-6'>
        <div className='sm:flex block justify-between gap-10'>
          <div className='sm:w-[78%] w-[100%] rounded-lg pb-4'>
            <div className='bg-white  rounded-lg pb-4'>
              {user?.cover ?
                <div className='relative'>
                  {/* cover */}
                  <img className='w-[100%]  h-[220px] object-cover rounded-t-lg' src={`${server}/images/${user?.cover} `} />

                </div>
                :
                <div className='relative'>
                  {/* cover */}
                  <div className='w-[100%] h-[200px] bg-gray-300 rounded-t-lg flex justify-center items-center' >
                    No Cover Image
                  </div>

                </div>
              }
              <div className='flex justify-between px-8'>
                {/* profile image */}
                {user?.profileImage ?
                  <div className='sm:w-[160px] w-[100px] sm:h-[160px] h-[100px] z-10 sm:mt-[-120px] mt-[-70px] bg-white p-[1px] rounded-full'>
                    <img className='w-[95%] h-[95%] object-cover rounded-full ml-[2px] mt-[2px] sm:ml-[4px] sm:mt-[4px]'
                      src={`${server}/images/${user?.profileImage} `}
                    />
                  </div>
                  :
                  <div className='sm:w-[160px] w-[100px] sm:h-[160px] h-[100px] z-10 sm:mt-[-120px] mt-[-70px] bg-white p-[1px] rounded-full'>
                    <div className=' mt-[40%] ml-[10%]'>
                      No Profile Image
                    </div>
                  </div>
                }
                {/* edit profile image */}
              </div>
              <div className='mt-2 px-8'>
                <div className='flex justify-between'>
                  <div className='text-2xl font-semibold'>{user?.fName} {user?.lName}</div>
                  <div>
                    {isFollowingUser ? <div onClick={handleUnFollow} className='flex cursor-pointer hover:bg-blue-100 p-2 px-3 rounded-full items-center text-blue-600 text-sm font-semibold'><TiTick size={20} /> Following</div> : <div onClick={handleFollow} className='flex items-center cursor-pointer hover:bg-blue-100 p-2 px-3 rounded-full text-blue-600 text-sm font-semibold'>Follow</div>}
                  </div>
                </div>
                <div className='text-gray-500 text-sm font-semibold'>{user?.headline}</div>
                <div className='text-gray-500 text-sm my-2'>{user?.city || "City"}, {user?.country || "Country"}
                  <span className='cursor-pointer text-blue-600 hover:underline font-semibold ml-2' onClick={showModal}>Contact Info</span>
                </div>
                <span className='text-blue-600 text-sm mt-[1px] font-semibold hover:underline cursor-pointer'>{user?.followers?.length || "0"} followers</span>
                <span className='text-blue-600 mx-2 text-sm mt-[1px] font-semibold hover:underline cursor-pointer'>{user?.following?.length || "0"} followings</span>
              </div>
            </div>
            <div className='my-4 bg-white rounded-lg p-2'>
              <div className='flex justify-between items-center px-4 my-2'>
                <div className='text-xl font-semibold'>Topics Interested in</div>
              </div>
              <div className='px-4'>
                <div className='flex flex-wrap gap-4'>
                  {user?.interests?.length === 0 && <div className='text-sm rounded-full bg-gray-200 p-2 px-3 text-gray-500 cursor-pointer'>No Interests</div>}
                  {user?.interests?.map((interest, index) => (
                    <div key={index} className='text-sm rounded-full bg-gray-200 p-2 px-3 text-gray-500 cursor-pointer'>{interest}</div>
                  ))}
                </div>
              </div>
            </div>
            {/* about */}

            <div className='my-4 bg-white rounded-lg p-2'>
              <div className='flex justify-between items-center px-4 my-2'>
                <div className='text-xl font-semibold'>About</div>
              </div>
              <div className='px-4'>
                <div className='text-sm text-gray-500'>{user?.about}</div>
              </div>
            </div>

            {/* <ImageCropper /> */}
            {/* posts */}
            <div className='my-4 bg-white rounded-lg p-2'>
              <div className='flex justify-between items-center px-4 my-2'>
                <div>
                  <div className='text-xl font-semibold'>Posts</div>
                  {/* <div className='text-sm text-blue-600 hover:underline cursor-pointer'>{user?.followers?.length || "0"} followers</div> */}
                </div>
              </div>

              {/* posts list */}
              <div className='px-4'>
                <div>
                  <div className='flex justify-end items-center mt-4'>
                    <button
                      disabled={currentPage === 0}
                      style={{ border: "1px solid gray" }} onClick={handlePrevPage} className={`${currentPage !== 0 && "hover:bg-gray-300"}  flex items-center mx-[2px]  p-[2px] rounded-full ${currentPage === 0 && "cursor-default"}`}>
                      <GrFormPrevious size={25} color='gray' />
                    </button>
                    <button
                      disabled={currentPage === totalPages - 1}
                      style={{ border: "1px solid gray" }} onClick={handleNextPage} className={`${currentPage !== totalPages - 1 && "hover:bg-gray-300"}  flex items-center mx-[2px]  p-[2px] rounded-full ${currentPage === totalPages - 1 && "cursor-default"}`}>
                      <GrFormNext size={25} color='gray' />
                    </button>
                  </div>

                  <PostList posts={currentPosts} />
                </div>
              </div>
            </div>
          </div>
          <div className='sm:w-[22%] w-[100%]'>
            <div className='bg-white rounded-lg p-2'>
              <div className='flex justify-between items-center px-4 my-2'>
                <div className='text-xl font-semibold'>Username</div>
              </div>
              <div className='px-4'>
                <div className='text-sm text-gray-500'>{user?.userName}</div>
              </div>
            </div>
            <div className='my-4 bg-white rounded-lg p-2'>
              <div className='flex justify-between items-center px-4 my-2'>
                <div className='text-xl font-semibold'>Public URL</div>
                <CopyToClipboard text={`${client}/profile/${user?.userName}`} onCopy={() => handleCopy()}>
                  <div className='cursor-pointer hover:bg-gray-200  flex items-center p-2 rounded-full'>
                    <IoMdShare color='gray' size={25} />
                  </div>
                </CopyToClipboard>
              </div>
              <div className='px-4'>
                <div className='text-[10px] text-gray-500 break-all  '>
                  <Link className='hover:underline ' target='_blank' href={`${client}/profile/${user?.userName || ""}`}>{client}/profile/{user?.userName}</Link>
                </div>
              </div>
            </div>

            {isBlockedBy && <div className='my-4 text-center py-4 text-red-600 bg-white rounded-lg p-2'>
              This User Blocked You
            </div>}

            <div className='my-4 bg-white rounded-lg p-2'>
              <div className='flex justify-between items-center px-4 my-2'>
                <div className='text-xl font-semibold'>Block</div>

              </div>
              <div className='px-4'>
                <div className='text-[10px] text-gray-500 break-all  '>
                  {isBlockedUser ? <div onClick={handleUnblock} className='flex items-center  justify-center cursor-pointer hover:bg-blue-100 p-2 px-3 rounded-full text-blue-600 text-sm font-semibold'>
                    Un Block</div>
                    :
                    <div onClick={handleBlock} className='flex items-center justify-center  cursor-pointer hover:bg-red-100 p-2 px-3 rounded-full text-red-600 text-sm font-semibold'>
                      Block</div>}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal title={`${user?.fName} ${user?.lName}`} open={isModalOpen} onOk={handleOk} onCancel={handleCancel}
        footer={null}
      >
        <div className='flex justify-between'>
          <div className='text-lg'>Contact Info</div>
          {/* <div className='cursor-pointer'><MdOutlineModeEditOutline color='gray' size={25} /></div> */}
        </div>
        <div className='flex'>
          <div className='w-[10%]'><LuLinkedin color='gray' size={25} /></div>
          <div className='w-[90%]'>
            <h3>Your Profile</h3>
            <div>
              <Link className='hover:underline' target='_blank' href={`${client}/profile/${user?.userName || ""}`}>{client}/profile/{user?.userName}</Link>
            </div>
          </div>
        </div>
        <div className='flex my-2'>
          <div className='w-[10%]'><ImAttachment color='gray' size={25} /></div>
          <div className='w-[90%]'>
            <h3>Website</h3>
            <div>
              <Link className='hover:underline' target='_blank' href={user?.websiteLink || ""}>{user?.websiteLink}</Link>
            </div>
          </div>
        </div>
        <div className='flex my-2'>
          <div className='w-[10%]'><MdAttachEmail color='gray' size={25} /></div>
          <div className='w-[90%]'>
            <h3>Email</h3>
            <div>
              <Link className='hover:underline' target='_blank' href={`mailto:${user?.email || ""}`}>{user?.email}</Link>
            </div>
          </div>
        </div>
        <div className='flex my-2'>
          <div className='w-[10%]'><FaPhone color='gray' size={25} /></div>
          <div className='w-[90%]'>
            <h3>Phone</h3>
            <div>
              <Link className='hover:underline' target='_blank' href={`tel:${user?.phone || ""}`}>{user?.phone}</Link>
            </div>
          </div>
        </div>
      </Modal>
    </>
  )
}

export default Profile
