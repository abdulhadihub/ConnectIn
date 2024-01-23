"use client"
import { Form, Input, Select, notification } from 'antd';
import React, { useState } from 'react'
import { GrGallery } from "react-icons/gr";
import { IoSendOutline } from "react-icons/io5";
import axios from 'axios';
import server from '@/utils/server';


const CreatePost = () => {
    const [image, setImage] = useState('')
    const data = {
        user: {
            profileImage: 'https://media.licdn.com/dms/image/D4D03AQFh-x1O7wZkvQ/profile-displayphoto-shrink_400_400/0/1694578053479?e=1711584000&v=beta&t=pGT0uZKUdaN3iC4o6616a2zYpscIAfnogfih8oF_eVE',
            fName: 'John',
            lName: 'Doe'
        }
    }

    const handleCreate = async (values) => {
        console.log(values)
        if (image) {
            const dataa = new FormData();
            const filename = Date.now() + image.name;
            dataa.append("name", filename);
            dataa.append("file", image);
            try {
                await axios.post(`${server}/api/upload`, dataa);
                values.image = filename;
                console.log(values)
                // try {
                //     const res = await axios.post(`${server}/api/post/create`,values)
                //     if (res?.data?.success) {
                //         notification.success({
                //             message: 'Success',
                //             description: res?.data?.message,
                //         })
                //     } else {
                //         notification.error({
                //             message: 'Error',
                //             description: res?.data?.message,
                //         })
                //     }
                // } catch (error) {
                //     console.log(error)
                //     notification.error({
                //         message: 'Error',
                //         description: error?.response?.data?.message,
                //     })
                // }
            } catch (err) {
                console.log(err);
                notification.error({
                    message: 'Error',
                    description: err?.response?.data?.message,
                })
            }
        }
    }

    return (
        <div className='sm:mx-56 mx-10 py-6'>
            <h1 className='text-center font-bold text-2xl my-3'>Create New Post</h1>
            <Form layout='vertical' onFinish={handleCreate} className='bg-white rounded-lg'>
                <div className='px-4'>
                    <div className='flex p-4 items-center'>
                        <img src={data.user.profileImage} className='rounded-full h-10 w-10' alt='profile' />
                        <p className='ml-2'>{data.user.fName} {data.user.lName}</p>
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
    )
}

export default CreatePost
