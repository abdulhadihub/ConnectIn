'use client';
import React, { useEffect, useState } from 'react'
import { MdOutlineModeEditOutline } from 'react-icons/md'
import { Modal } from 'antd';
import { LuLinkedin } from "react-icons/lu";
import { ImAttachment } from "react-icons/im";
import { MdAttachEmail } from "react-icons/md";
import { FaPhone, FaPlus } from "react-icons/fa6";
import { GrFormPrevious, GrFormNext } from "react-icons/gr";
import { FaSwatchbook } from "react-icons/fa";
import Link from 'next/link';
import PostItem from './PostItem';


const Profile = () => {
  const [data, setData] = useState({
    fName: 'Ali',
    lName: 'Raza',
    profileCover: 'https://media.licdn.com/dms/image/D4D16AQEqW4q8g5-TzQ/profile-displaybackgroundimage-shrink_350_1400/0/1678555113571?e=1711584000&v=beta&t=pnUTAEQn-LUeXXGbHUBwqlWX-rWkE8m90T1Az9rexoY',
    profileImage: 'https://media.licdn.com/dms/image/D4D03AQFh-x1O7wZkvQ/profile-displayphoto-shrink_400_400/0/1694578053479?e=1711584000&v=beta&t=pGT0uZKUdaN3iC4o6616a2zYpscIAfnogfih8oF_eVE',
    headline: "Full Stack Developer | α Microsoft Ambassador | CUI'24",
    country: 'Pakistan',
    city: 'Islamabad',
    followers: 100,
    profileLink: 'https://www.linkedin.com/in/alirazahub',
    websiteLink: 'https://alirazahub.tech/',
    email: 'alirazahub2@gmail.com',
    phone: '+923025414924',
    about: "Driven final-year Computer Science student with 2+ years of experience as a MERN Stack Developer. Passionate about building intuitive and user-friendly web applications using the latest technologies like React/Angular, Node.js/Python, Express.js, and MongoDB/MYSQL, I'm actively seeking opportunities to collaborate on challenging projects and apply my skills to create impactful web experiences.",
    interests: ['Web Development', 'Open Source', 'Programming', 'UI/UX Designing', 'Graphic Designing', 'Photography', 'Videography', 'Content Writing', 'Blogging', 'Public Speaking', 'Social Media Marketing', 'Digital Marketing'],
  })
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
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


  const postsData = [{
    user: {
      fName: 'Ali',
      lName: 'Raza',
      profileImage: 'https://media.licdn.com/dms/image/D4D03AQFh-x1O7wZkvQ/profile-displayphoto-shrink_400_400/0/1694578053479?e=1711584000&v=beta&t=pGT0uZKUdaN3iC4o6616a2zYpscIAfnogfih8oF_eVE'
    },
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem, quibusdam. consectetur adipisicing elit. Voluptatem, quibusdam. consectetur adipisicing elit. Voluptatem, quibusdam. consectetur adipisicing elit. Voluptatem, quibusdam.',
    postImage: 'https://media.licdn.com/dms/image/D4D03AQFh-x1O7wZkvQ/profile-displayphoto-shrink_400_400/0/1694578053479?e=1711584000&v=beta&t=pGT0uZKUdaN3iC4o6616a2zYpscIAfnogfih8oF_eVE',
    likes: 10,
    comments: 5

  }, {
    user: {
      fName: 'Ali',
      lName: 'Raza',
      profileImage: 'https://media.licdn.com/dms/image/D4D03AQFh-x1O7wZkvQ/profile-displayphoto-shrink_400_400/0/1694578053479?e=1711584000&v=beta&t=pGT0uZKUdaN3iC4o6616a2zYpscIAfnogfih8oF_eVE'
    },
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem, quibusdam.',
    postImage: 'https://media.licdn.com/dms/image/D4D03AQFh-x1O7wZkvQ/profile-displayphoto-shrink_400_400/0/1694578053479?e=1711584000&v=beta&t=pGT0uZKUdaN3iC4o6616a2zYpscIAfnogfih8oF_eVE',
    likes: 10,
    comments: 5

  }, {
    user: {
      fName: 'Ali',
      lName: 'Raza',
      profileImage: 'https://media.licdn.com/dms/image/D4D03AQFh-x1O7wZkvQ/profile-displayphoto-shrink_400_400/0/1694578053479?e=1711584000&v=beta&t=pGT0uZKUdaN3iC4o6616a2zYpscIAfnogfih8oF_eVE'
    },
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem, quibusdam.',
    postImage: 'https://media.licdn.com/dms/image/D4D03AQFh-x1O7wZkvQ/profile-displayphoto-shrink_400_400/0/1694578053479?e=1711584000&v=beta&t=pGT0uZKUdaN3iC4o6616a2zYpscIAfnogfih8oF_eVE',
    likes: 10,
    comments: 5

  }, {
    user: {
      fName: 'Ali',
      lName: 'Raza',
      profileImage: 'https://media.licdn.com/dms/image/D4D03AQFh-x1O7wZkvQ/profile-displayphoto-shrink_400_400/0/1694578053479?e=1711584000&v=beta&t=pGT0uZKUdaN3iC4o6616a2zYpscIAfnogfih8oF_eVE'
    },
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem, quibusdam.',
    postImage: 'https://media.licdn.com/dms/image/D4D03AQFh-x1O7wZkvQ/profile-displayphoto-shrink_400_400/0/1694578053479?e=1711584000&v=beta&t=pGT0uZKUdaN3iC4o6616a2zYpscIAfnogfih8oF_eVE',
    likes: 10,
    comments: 5

  }, {
    user: {
      fName: 'Ali',
      lName: 'Raza',
      profileImage: 'https://media.licdn.com/dms/image/D4D03AQFh-x1O7wZkvQ/profile-displayphoto-shrink_400_400/0/1694578053479?e=1711584000&v=beta&t=pGT0uZKUdaN3iC4o6616a2zYpscIAfnogfih8oF_eVE'
    },
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem, quibusdam.',
    postImage: 'https://media.licdn.com/dms/image/D4D03AQFh-x1O7wZkvQ/profile-displayphoto-shrink_400_400/0/1694578053479?e=1711584000&v=beta&t=pGT0uZKUdaN3iC4o6616a2zYpscIAfnogfih8oF_eVE',
    likes: 10,
    comments: 5

  },]
  const [currentPage, setCurrentPage] = useState(0);

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
  const PostList = ({ posts }) => {
    return (
      <div className={`grid ${isMobile ?"grid-cols-1":"grid-cols-2"} gap-7 my-3`}>
        {posts.length > 0 ? posts.map((post, index) => (
          <PostItem key={index} data={post} />
        )) : <div>No Post</div>}
        {!isMobile && posts?.length!==0 && currentPosts.length < 2 && <div style={{ border: "1px solid grey" }} className=' flex justify-center items-center rounded-lg'>
          <div className='text-center'>
            <FaSwatchbook color='blue' size={30} />
            <div className='text-gray-300'>
              See all posts
            </div>

            <div className=' bg-gray-300 mt-10 p-2 rounded-full px-3 cursor-pointer hover:bg-blue-600'>
              See All Posts
            </div>
          </div>

        </div>}
      </div>
      // </div>
    );
  };
  return (
    <>
      <div className='sm:mx-36 mx-10 py-6'>
        <div className='sm:flex block justify-between gap-10'>
          <div className='sm:w-[78%] w-[100%] rounded-lg pb-4'>
            <div className='bg-white  rounded-lg pb-4'>
              <div className='relative'>
                <img className='w-[100%] rounded-t-lg' src={data?.profileCover} />
                <button
                  className='absolute top-4 right-8 bg-white  flex items-center p-2 rounded-full hover:bg-gray-200'
                // onClick={handleEditCover} // Replace with your edit cover function
                >
                  <MdOutlineModeEditOutline color='blue' size={20} />
                </button>
              </div>
              <div className='flex justify-between px-8'>
                <div className='sm:w-[160px] w-[100px] sm:h-[160px] h-[100px] z-10 sm:mt-[-120px] mt-[-70px] bg-white p-[1px] rounded-full'>
                  <img className='w-[95%] rounded-full ml-[2px] mt-[2px] sm:ml-[4px] sm:mt-[4px]' src={data?.profileImage} />
                </div>
                <div className='mt-2 cursor-pointer hover:bg-gray-200  flex items-center p-2 rounded-full'><MdOutlineModeEditOutline color='gray' size={25} /></div>
              </div>
              <div className='mt-2 px-8'>
                <div className='text-2xl font-semibold'>{data?.fName} {data?.lName}</div>
                <div className='text-gray-500 text-sm font-semibold'>{data?.headline}</div>
                <div className='text-gray-500 text-sm my-2'>{data?.city}, {data?.country}
                  <span className='cursor-pointer text-blue-600 hover:underline font-semibold ml-2' onClick={showModal}>Contact Info</span>
                </div>
                <span className='text-blue-600 text-sm mt-[1px] font-semibold hover:underline cursor-pointer'>{data?.followers} followers</span>
              </div>
            </div>
            <div className='my-4 bg-white rounded-lg p-2'>
              <div className='flex justify-between items-center px-4 my-2'>
                <div className='text-xl font-semibold'>Topics you are Interested in</div>
                <div className='flex gap-2'>
                  <FaPlus className='cursor-pointer hover:bg-gray-200 flex items-center p-2 rounded-full' color='blue' size={25} />
                  <MdOutlineModeEditOutline className='cursor-pointer hover:bg-gray-200  flex items-center p-2 rounded-full' color='gray' size={25} />
                </div>
              </div>
              <div className='px-4'>
                <div className='flex flex-wrap gap-4'>
                  {data?.interests?.map((interest, index) => (
                    <div key={index} className='text-sm rounded-full bg-gray-200 p-2 px-3 text-gray-500 cursor-pointer'>{interest}</div>
                  ))}
                </div>
              </div>
            </div>
            {/* about */}

            <div className='my-4 bg-white rounded-lg p-2'>
              <div className='flex justify-between items-center px-4 my-2'>
                <div className='text-xl font-semibold'>About</div>
                <div className='cursor-pointer hover:bg-gray-200  flex items-center p-2 rounded-full'><MdOutlineModeEditOutline color='gray' size={25} /></div>
              </div>
              <div className='px-4'>
                <div className='text-sm text-gray-500'>{data?.about}</div>
              </div>
            </div>

            {/* posts */}
            <div className='my-4 bg-white rounded-lg p-2'>
              <div className='flex justify-between items-center px-4 my-2'>
                <div>
                  <div className='text-xl font-semibold'>Posts</div>
                  <div className='text-sm text-blue-600 hover:underline cursor-pointer'>{data?.followers} followers</div>
                </div>
                <div className='flex gap-2'>
                  <div className='flex border-[1px] text-blue-800 font-semibold bg-gray-300 items-center cursor-pointer hover:bg-gray-200 p-2 px-3 rounded-full'>
                    <FaPlus className='mx-2' color='blue' size={25} /> Create Post
                  </div>
                  <MdOutlineModeEditOutline className='cursor-pointer flex items-center p-2 hover:bg-gray-200  rounded-full' color='gray' size={25} />
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
          <div className='sm:w-[22%] w-[100%]'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iure, dolorem quasi quaerat dolorum reprehenderit incidunt illum similique nulla? Consequatur facilis blanditiis fugiat ullam impedit laboriosam earum vero eos porro veritatis.</div>
        </div>
      </div>


      {/* contact details modal */}
      <Modal title={`${data?.fName} ${data?.lName}`} open={isModalOpen} onOk={handleOk} onCancel={handleCancel}
        footer={null}
      >
        <div className='flex justify-between'>
          <div className='text-lg'>Contact Info</div>
          <div className='cursor-pointer'><MdOutlineModeEditOutline color='gray' size={25} /></div>
        </div>
        <div className='flex'>
          <div className='w-[10%]'><LuLinkedin color='gray' size={25} /></div>
          <div className='w-[90%]'>
            <h3>Your Profile</h3>
            <div>
              <Link className='hover:underline' target='_blank' href={data?.profileLink}>{data?.profileLink}</Link>
            </div>
          </div>
        </div>
        <div className='flex my-2'>
          <div className='w-[10%]'><ImAttachment color='gray' size={25} /></div>
          <div className='w-[90%]'>
            <h3>Website</h3>
            <div>
              <Link className='hover:underline' target='_blank' href={data?.websiteLink}>{data?.websiteLink}</Link>
            </div>
          </div>
        </div>
        <div className='flex my-2'>
          <div className='w-[10%]'><MdAttachEmail color='gray' size={25} /></div>
          <div className='w-[90%]'>
            <h3>Email</h3>
            <div>
              <Link className='hover:underline' target='_blank' href={`mailto:${data?.email}`}>{data?.email}</Link>
            </div>
          </div>
        </div>
        <div className='flex my-2'>
          <div className='w-[10%]'><FaPhone color='gray' size={25} /></div>
          <div className='w-[90%]'>
            <h3>Phone</h3>
            <div>
              <Link className='hover:underline' target='_blank' href={`tel:${data?.phone}`}>{data?.phone}</Link>
            </div>
          </div>
        </div>
      </Modal>
    </>
  )
}

export default Profile
