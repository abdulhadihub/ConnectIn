"use client"
import { Form, Input, Select, notification } from 'antd';
import React, { useState, useEffect } from 'react';  // Import useEffect
import { GrGallery } from "react-icons/gr";
import { IoSendOutline } from "react-icons/io5";
import axios from 'axios';
import server from '@/utils/server';
import { useCookies } from 'react-cookie';
import { useUser } from '@/utils/Context/UserContext';
import { useRouter } from 'next/navigation';

const EditPost = ({post}) => {
    const [image, setImage] = useState('');
    const route = useRouter();
    const { user } = useUser();
    const [cookies] = useCookies(['x-auth-token']);
    const [postData, setPostData] = useState(post);  // State to store post data


    const handleUpdate = async (values) => {
        if (image) {
            const dataa = new FormData();
            const filename = Date.now() + image.name;
            dataa.append("name", filename);
            dataa.append("file", image);
            try {
                await axios.post(`${server}/api/upload`, dataa);
                values.postImage = filename;
            } catch (err) {
                console.error(err);
                notification.error({
                    message: 'Error',
                    description: err?.response?.data?.message,
                });
            }
        }

        try {
            const res = await axios.put(`${server}/api/post/update/${postData?._id}`, values, {
                headers: {
                    'x-auth-token': cookies['x-auth-token'],
                },
            });
            if (res?.data?.success) {
                notification.success({
                    message: 'Success',
                    description: res?.data?.message,
                });
                route.push('/feed');
            } else {
                notification.error({
                    message: 'Error',
                    description: res?.data?.message,
                });
            }
        } catch (error) {
            console.error(error);
            notification.error({
                message: 'Error',
                description: error?.response?.data?.message,
            });
        }
    };

    return (
        <div className='sm:mx-56 mx-10 py-6'>
            <h1 className='text-center font-bold text-2xl my-3'>Edit Post</h1>
            <Form layout='vertical' onFinish={handleUpdate} className='bg-white rounded-lg' 
            initialValues={{
                title: postData?.title,
                interests: postData?.interests,
                description: postData?.description,
            }}>
            <div className='px-4'>
                    <div className='flex p-4 items-center'>
                        <img src={`${server}/images/${user?.profileImage}`} className='rounded-full h-10 w-10' alt='profile' />
                        <p className='ml-2'>{user?.fName} {user?.lName}</p>
                    </div>
                    <Form.Item
                        label="Title"
                        name="title"
                        rules={[
                            {
                                required: true,
                                message: 'Please input title!',
                            },
                        ]}
                    >
                        <Input placeholder='Title' />
                    </Form.Item>
                    <Form.Item
                        label="Interests"
                        name="interests"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your interests!',
                            },
                        ]}
                    >
                        <Select mode="tags" style={{ width: '100%' }} placeholder="Select your interests">
                            <Select.Option value="React">React</Select.Option>
                            <Select.Option value="Node">Node</Select.Option>
                            <Select.Option value="MongoDB">MongoDB</Select.Option>
                            <Select.Option value="Express">Express</Select.Option>
                            <Select.Option value="JavaScript">JavaScript</Select.Option>
                        </Select>

                    </Form.Item>
                    <Form.Item
                        label="Description"
                        name="description"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your description!',
                            },
                        ]}
                    >
                        <Input.TextArea rows={10} placeholder='What do you want to talk about?' />
                    </Form.Item>

                    <img width={200} className=""
                        src={
                            image
                                ? URL.createObjectURL(image)
                                : ``
                        } alt="" />
                    <div className='flex justify-between items-center px-4 py-2'>
                        <label className='flex items-center hover:bg-green-200 cursor-pointer p-3 rounded-full'>
                            <GrGallery size={20} color='grey' className='mx-2' />
                            <div>Add Media</div>
                            <input
                                name='image'
                                type="file"
                                accept="image/*"
                                onChange={(e) => setImage(e.target.files[0])}
                                style={{ display: 'none' }}
                            />
                        </label>
                        <Form.Item
                        className='mb-[-2px]'
                        >
                            <button className='flex items-center text-md font-bold bg-blue-600 hover:bg-blue-500 text-white px-4 p-3 rounded-full'>
                                <IoSendOutline size={20} className='mr-2' />
                                <div> Post </div>
                            </button>
                        </Form.Item>
                    </div>
                </div>
            </Form>
        </div>
    );
};

export default EditPost;
