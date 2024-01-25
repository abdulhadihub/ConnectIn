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
import SuggestionsWidget from '@/components/SuggestionsWidget/SuggestionsWidget';

const Profile = ({ user }) => {
  const { updateUser } = useUser();
  //eslint-disable-next-line
  const [cookies, setCookie, removeCookie] = useCookies(['x-auth-token']);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen2, setIsModalOpen2] = useState(false);
  const [isModalOpen3, setIsModalOpen3] = useState(false);
  const [isModalOpen4, setIsModalOpen4] = useState(false);
  const [isModalOpen5, setIsModalOpen5] = useState(false);
  const [isModalOpen6, setIsModalOpen6] = useState(false);
  const [postsData, setPostsData] = useState([]);
  const [isMobile, setIsMobile] = useState(false);
  const [coverImage, setCoverImage] = useState();
  const [profileImage, setProfileImage] = useState();
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const handleOk2 = () => {
    setIsModalOpen2(false);
  };
  const handleCancel2 = () => {
    setIsModalOpen2(false);
  };
  const handleOk3 = () => {
    setIsModalOpen3(false);
  };
  const handleCancel3 = () => {
    setIsModalOpen3(false);
  };
  const handleOk4 = () => {
    setIsModalOpen4(false);
  };
  const handleCancel4 = () => {
    setIsModalOpen4(false);
  };
  const handleOk5 = () => {
    setIsModalOpen5(false);
  };
  const handleCancel5 = () => {
    setIsModalOpen5(false);
  };
  const handleOk6 = () => {
    setIsModalOpen6(false);
  };
  const handleCancel6 = () => {
    setIsModalOpen6(false);
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

  const [currentPage, setCurrentPage] = useState(0);
  const [newUserName, setNewUserName] = useState(user?.userName);
  const [isError, setIsError] = useState(false);

  const handleCopy = () => {
    message.success('URL Copied');
  };

  const handleUploadCoverImage = async () => {
    try {
      const formData = new FormData();
      const filename = Date.now() + coverImage.name;
      formData.append("name", filename);
      formData.append("file", coverImage);
      await axios.post(`${server}/api/upload`, formData);
      const res = await axios.put(`${server}/api/user/change-cover`, { cover: filename }, {
        headers: {
          'x-auth-token': cookies['x-auth-token']
        }
      })
      if (res?.data?.success) {
        notification.success({
          message: 'Success',
          description: res?.data?.message,
        })
        console.log({ ...user, cover: filename })
        updateUser({ ...user, cover: filename })
        setIsModalOpen2(false);
        setCoverImage(null)
      } else {
        notification.error({
          message: 'Error',
          description: res?.data?.message,
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

  const handleUploadProfileImage = async () => {
    try {
      const formData = new FormData();
      const filenamee = Date.now() + profileImage.name;
      formData.append("name", filenamee);
      formData.append("file", profileImage);
      await axios.post(`${server}/api/upload`, formData);
      const res = await axios.put(`${server}/api/user/change-profile-image`, { profileImage: filenamee }, {
        headers: {
          'x-auth-token': cookies['x-auth-token']
        }
      })
      if (res?.data?.success) {
        notification.success({
          message: 'Success',
          description: res?.data?.message,
        })
        updateUser({ ...user, profileImage: filenamee })
        setIsModalOpen2(false);
        setProfileImage(null)
      } else {
        notification.error({
          message: 'Error',
          description: res?.data?.message,
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

  const handleUpdateUserName = async () => {
    try {
      const res = await axios.put(`${server}/api/user/change-user-name`, { newUserName }, {
        headers: {
          'x-auth-token': cookies['x-auth-token']
        }
      })
      if (res?.data?.success) {
        notification.success({
          message: 'Success',
          description: res?.data?.message,
        })
        updateUser({ ...user, userName: newUserName })
        setIsModalOpen3(false);
        setNewUserName(null)
      } else {
        setIsError(true)
        setTimeout(() => {
          setIsError(false)
        }, 3000);
      }
    } catch (error) {
      console.log(error)
      notification.error({
        message: 'Error',
        description: error?.response?.data?.message,
      })
    }
  }

  const handleUpdateDetails = async (value) => {
    try {
      const res = await axios.put(`${server}/api/user/change-details`, { ...value }, {
        headers: {
          'x-auth-token': cookies['x-auth-token']
        }
      })
      if (res?.data?.success) {
        notification.success({
          message: 'Success',
          description: res?.data?.message,
        })
        updateUser({ ...user, ...value })
        setIsModalOpen4(false);
      } else {
        notification.error({
          message: 'Error',
          description: res?.data?.message,
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

  const handleUpdateInterests = async (value) => {
    try {
      const res = await axios.put(`${server}/api/user/change-interests`, { ...value }, {
        headers: {
          'x-auth-token': cookies['x-auth-token']
        }
      })
      if (res?.data?.success) {
        notification.success({
          message: 'Success',
          description: res?.data?.message,
        })
        updateUser({ ...user, ...value })
        setIsModalOpen5(false);

      } else {
        notification.error({
          message: 'Error',
          description: res?.data?.message,
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
  const handleUpdateAbout = async (value) => {
    try {
      const res = await axios.put(`${server}/api/user/change-about`, { ...value }, {
        headers: {
          'x-auth-token': cookies['x-auth-token']
        }
      })
      if (res?.data?.success) {
        notification.success({
          message: 'Success',
          description: res?.data?.message,
        })
        updateUser({ ...user, ...value })
        setIsModalOpen6(false);

      } else {
        notification.error({
          message: 'Error',
          description: res?.data?.message,
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

  const postsPerPage = isMobile ? 1 : 2;
  const totalPages = Math.ceil(postsData.length / postsPerPage);

  const handleNextPage = () => {
    setCurrentPage((prevPage) => (prevPage + 1) % totalPages);
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => (prevPage - 1 + totalPages) % totalPages);
  };
  const startIndex = currentPage * postsPerPage;
  const endIndex = startIndex + postsPerPage;
  const currentPosts = postsData?.slice(startIndex, endIndex);

  const deletePost = async (id) => {
    try {
      const res = await axios.delete(`${server}/api/post/delete-post/${id}`, {
        headers: {
          'x-auth-token': cookies['x-auth-token']
        }
      })
      if (res?.data?.success) {
        notification.success({
          message: 'Success',
          description: res?.data?.message,
        })
        setPostsData(postsData.filter(post => post?._id !== id))
      } else {
        notification.error({
          message: 'Error',
          description: res?.data?.message,
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
  
  const PostList = ({ posts }) => {
    return (
      <div className={`grid ${isMobile ? "grid-cols-1" : "grid-cols-2"} gap-7 my-3`}>
        {posts?.length > 0 ? posts?.map((post, index) => (
          <PostItem key={index} data={post} deletePost={deletePost} />
        )) : <div>No Post</div>}
      </div>
      // </div>
    );
  };


  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get(`${server}/api/post/user-posts`, {
          headers: {
            'x-auth-token': cookies['x-auth-token']
          }
        })
        if (res?.data?.success) {
          setPostsData(res?.data?.posts)
          console.log('data', res?.data?.posts)
        } else {
          notification.error({
            message: 'Error',
            description: res?.data?.message,
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
    fetchPosts()
  }, [])
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
                  <button
                    className='absolute top-4 right-8 bg-white  flex items-center p-2 rounded-full hover:bg-gray-200'
                    onClick={() => setIsModalOpen2(true)} // Replace with your edit cover function
                  >
                    <MdOutlineModeEditOutline color='blue' size={20} />
                  </button>
                </div>
                :
                <div className='relative'>
                  {/* cover */}
                  <div className='w-[100%] h-[200px] bg-gray-300 rounded-t-lg flex justify-center items-center' >
                    No Cover Image
                  </div>
                  <button
                    className='absolute top-4 right-8 bg-white  flex items-center p-2 rounded-full hover:bg-gray-200'
                    onClick={() => setIsModalOpen2(true)}
                  >
                    <MdOutlineModeEditOutline color='blue' size={20} />
                  </button>
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
                <div onClick={() => setIsModalOpen4(true)} className='mt-2 cursor-pointer hover:bg-gray-200  flex items-center p-2 rounded-full'><MdOutlineModeEditOutline color='gray' size={25} /></div>
              </div>
              <div className='mt-2 px-8'>
                <div className='text-2xl font-semibold'>{user?.fName} {user?.lName}</div>
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
                <div className='text-xl font-semibold'>Topics you are Interested in</div>
                <div className='flex gap-2'>
                  <MdOutlineModeEditOutline onClick={() => setIsModalOpen5(true)} className='cursor-pointer hover:bg-gray-200  flex items-center p-2 rounded-full' color='gray' size={25} />
                </div>
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
                <div onClick={() => setIsModalOpen6(true)} className='cursor-pointer hover:bg-gray-200  flex items-center p-2 rounded-full'><MdOutlineModeEditOutline color='gray' size={25} /></div>
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
                <div className='flex gap-2'>
                  <Link href='/create-post' className='flex border-[1px] text-blue-800 font-semibold bg-gray-300 items-center cursor-pointer hover:bg-gray-200 p-2 px-3 rounded-full'>
                    <FaPlus className='mx-2' color='blue' size={25} /> Create Post
                  </Link>
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
                <div onClick={() => setIsModalOpen3(true)} className='cursor-pointer hover:bg-gray-200  flex items-center p-2 rounded-full'><MdOutlineModeEditOutline color='gray' size={25} /></div>
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
                <div className='text-[10px] text-gray-500'>
                  <Link className='hover:underline' target='_blank' href={`${client}/profile/${user?.userName || ""}`}>{client}/profile/{user?.userName}</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>


      {/* contact details modal */}
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
              <Link className='hover:underline' target='_blank' href={`${client}/${user?.userName || ""}`}>{client}/{user?.userName}</Link>
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

      {/* change cover image */}
      <Modal title={`Profile Setting`} open={isModalOpen2} onOk={handleOk2} onCancel={handleCancel2}
        footer={null}
      >

        <label className='flex items-center text-center justify-center hover:bg-green-200 cursor-pointer p-3 rounded-full'>
          <GrGallery size={20} color='grey' className='mx-2' />
          <div>Change Profile Image</div>
          <input
            name='image'
            type="file"
            accept="image/*"
            onChange={(e) => setProfileImage(e.target.files[0])}
            style={{ display: 'none' }}
          />
        </label>

        <img width={200} className="my-3"
          src={
            profileImage
              ? URL.createObjectURL(profileImage)
              : ``
          } alt="" />
        {
          profileImage && <div onClick={handleUploadProfileImage} className='flex justify-center items-center hover:bg-orange-200 cursor-pointer p-3 rounded-full'>
            <TiTick size={20} color='grey' className='mx-2' />
            Upload Profile Image
          </div>
        }



        <label className='flex items-center text-center justify-center hover:bg-green-200 cursor-pointer p-3 rounded-full'>
          <GrGallery size={20} color='grey' className='mx-2' />
          <div>Change Profile Cover</div>
          <input
            name='image'
            type="file"
            accept="image/*"
            onChange={(e) => setCoverImage(e.target.files[0])}
            style={{ display: 'none' }}
          />
        </label>

        <img width={200} className="my-3"
          src={
            coverImage
              ? URL.createObjectURL(coverImage)
              : ``
          } alt="" />
        {
          coverImage && <div onClick={handleUploadCoverImage} className='flex justify-center items-center hover:bg-orange-200 cursor-pointer p-3 rounded-full'>
            <TiTick size={20} color='grey' className='mx-2' />
            <div>Update Cover</div>
          </div>
        }

      </Modal>

      {/* change username */}
      <Modal title={`Change UserName`} open={isModalOpen3} onOk={handleOk3} onCancel={handleCancel3}
        footer={null}
      >

        <Input className='my-3' placeholder='Username' value={newUserName} onChange={(e) => setNewUserName(e.target.value)} />
        {isError && <div className='text-red-500'>Username is already taken</div>}

        <label onClick={handleUpdateUserName} className='flex items-center text-center justify-center hover:bg-green-200 cursor-pointer p-3 rounded-full'>
          <TiTick size={20} color='grey' className='mx-2' />
          <div>Change UserName</div>
        </label>

      </Modal>

      {/* change details */}
      <Modal title={`Change Details`} open={isModalOpen4} onOk={handleOk4} onCancel={handleCancel4}
        footer={null}
      >
        <Form
          name="basic"
          layout='vertical'
          initialValues={{ fName: user?.fName, lName: user?.lName, headline: user?.headline, city: user?.city, country: user?.country, websiteLink: user?.websiteLink, phone: user?.phone }}
          onFinish={handleUpdateDetails}

        >
          <Form.Item
            label="First Name"
            name="fName"
            rules={[{ required: true, message: 'Please input your First Name!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Last Name"
            name="lName"
            rules={[{ required: true, message: 'Please input your Last Name!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Headline"
            name="headline"
            rules={[{ required: true, message: 'Please input your Headline!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="City"
            name="city"
            rules={[{ required: true, message: 'Please input your City!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Country"
            name="country"
            rules={[{ required: true, message: 'Please input your Country!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Website Link"
            name="websiteLink"
            rules={[{ required: true, message: 'Please input your Website Link!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Phone"
            name="phone"
            rules={[{ required: true, message: 'Please input your Phone!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item>
            <button className='flex justify-center items-center hover:bg-green-200 cursor-pointer p-3 rounded-full'>
              <TiTick size={20} color='grey' className='mx-2' />
              <div>Update Details</div>
            </button>
          </Form.Item>
        </Form>

      </Modal>

      {/* change interetss */}
      <Modal title={`Update Interests`} open={isModalOpen5} onOk={handleOk5} onCancel={handleCancel5}
        footer={null}
      >
        <Form
          name="basic"
          layout='vertical'
          initialValues={{ interests: user?.interests }}
          onFinish={handleUpdateInterests}

        >
          <Form.Item
            label="Interests"
            name="interests"
            rules={[{ required: true, message: 'Please input your interests!' }]}
          >
            <Select mode="tags" style={{ width: '100%' }} placeholder="Interests">
              <Select.Option value="Javascript">Javascript</Select.Option>
              <Select.Option value="React">React</Select.Option>
              <Select.Option value="Node">Node</Select.Option>
              <Select.Option value="MongoDB">MongoDB</Select.Option>
              <Select.Option value="Express">Express</Select.Option>
              <Select.Option value="Next">Next</Select.Option>
              <Select.Option value="Tailwind">Tailwind</Select.Option>
              <Select.Option value="Bootstrap">Bootstrap</Select.Option>
              <Select.Option value="Material UI">Material UI</Select.Option>
              <Select.Option value="Ant Design">Ant Design</Select.Option>
              <Select.Option value="Redux">Redux</Select.Option>
              <Select.Option value="React Native">React Native</Select.Option>
              <Select.Option value="Flutter">Flutter</Select.Option>
              <Select.Option value="Dart">Dart</Select.Option>
              <Select.Option value="Firebase">Firebase</Select.Option>
              <Select.Option value="Python">Python</Select.Option>
              <Select.Option value="Java">Java</Select.Option>
              <Select.Option value="C++">C++</Select.Option>
              <Select.Option value="C">C</Select.Option>
              <Select.Option value="C#">C#</Select.Option>
              <Select.Option value="PHP">PHP</Select.Option>
              <Select.Option value="Laravel">Laravel</Select.Option>
              <Select.Option value="MySQL">MySQL</Select.Option>
              <Select.Option value="PostgreSQL">PostgreSQL</Select.Option>
              <Select.Option value="SQL">SQL</Select.Option>
              <Select.Option value="NoSQL">NoSQL</Select.Option>
              <Select.Option value="MongoDB">MongoDB</Select.Option>
              <Select.Option value="GraphQL">GraphQL</Select.Option>
              <Select.Option value="Apollo">Apollo</Select.Option>
              <Select.Option value="REST">REST</Select.Option>
              <Select.Option value="API">API</Select.Option>
              <Select.Option value="Git">Git</Select.Option>
              <Select.Option value="GitHub">GitHub</Select.Option>
              <Select.Option value="GitLab">GitLab</Select.Option>
              <Select.Option value="BitBucket">BitBucket</Select.Option>
              <Select.Option value="Jira">Jira</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item>
            <button className='flex justify-center items-center hover:bg-green-200 cursor-pointer p-3 rounded-full'>
              <TiTick size={20} color='grey' className='mx-2' />
              <div>Update Interests</div>
            </button>
          </Form.Item>
        </Form>

      </Modal>

      {/* change About */}
      <Modal title={`Update About`} open={isModalOpen6} onOk={handleOk6} onCancel={handleCancel6}
        footer={null}
      >
        <Form
          name="basic"
          layout='vertical'
          initialValues={{ about: user?.about }}
          onFinish={handleUpdateAbout}

        >
          <Form.Item
            label="About"
            name="about"
            rules={[{ required: true, message: 'Please input your About!' }]}
          >
            <Input.TextArea rows={6} />
          </Form.Item>

          <Form.Item>
            <button className='flex justify-center items-center hover:bg-green-200 cursor-pointer p-3 rounded-full'>
              <TiTick size={20} color='grey' className='mx-2' />
              <div>Update About</div>
            </button>
          </Form.Item>
        </Form>

      </Modal>
    </>
  )
}

export default Profile
