'use client'
import React, { useState } from 'react';
import axios from 'axios';
import server from '@/utils/server';
import Link from 'next/link';
import {
    Button,
    Form,
    Select,
    Input,
    DatePicker,
    notification
} from 'antd';
import { useRouter } from 'next/navigation';

const App = () => {
    const [form] = Form.useForm();
    const route = useRouter();
    const { Option } = Select;

    const onFinish = async (values) => {
        console.log('Received values of form: ', values);
        try {
            const res = await axios.post(`${server}/api/user/register`, values);
            if (res?.data?.success) {
                notification.success({
                    message: 'Success',
                    description: res?.data?.message,
                });
                form.resetFields();
                route.push('/login');
            } else {
                notification.error({
                    message: 'Error',
                    description: res?.data?.message,
                });
            }
        } catch (error) {
            notification.error({
                message: 'Error',
                description: error?.response?.data?.message,
            });
        }
    };
    return (
        <Form
            layout="vertical"
            form={form}
            name="register"
            onFinish={onFinish}
            style={{
                maxWidth: 300,
            }}
            scrollToFirstError
        >
            <Form.Item
                label="First Name"
                name="fName"
                rules={[
                    {
                        required: true,
                        message: 'Please input your first name!',
                    },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Last Name"
                name="lName"
                rules={[
                    {
                        required: true,
                        message: 'Please input your first name!',
                    },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Date of Birth"
                name="dateOfBirth"
                rules={[
                    {
                        required: true,
                        message: 'Please input!',
                    },
                ]}
            >
                <DatePicker className='w-[100%]' />
            </Form.Item>

            <Form.Item
                name="gender"
                label="Gender"
                rules={[
                    {
                        required: true,
                        message: 'Please select gender!',
                    },
                ]}
            >
                <Select placeholder="select your gender">
                    <Option value="male">Male</Option>
                    <Option value="female">Female</Option>
                    <Option value="other">Other</Option>
                </Select>
            </Form.Item>

            <Form.Item
                name="email"
                label="E-mail"
                rules={[
                    {
                        type: 'email',
                        message: 'The input is not valid E-mail!',
                    },
                    {
                        required: true,
                        message: 'Please input your E-mail!',
                    },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                name="phone"
                label="Phone Number"
                rules={[
                    {
                        required: true,
                        message: 'Please input your phone number!',
                    },
                ]}
            >
                <Input
                    style={{
                        width: '100%',
                    }}
                />
            </Form.Item>

            <Form.Item
                name="password"
                label="Password"
                rules={[
                    {
                        required: true,
                        message: 'Please input your password!',
                    },
                ]}
                hasFeedback
            >
                <Input.Password />
            </Form.Item>

            <Form.Item
                name="confirm"
                label="Confirm Password"
                dependencies={['password']}
                hasFeedback
                rules={[
                    {
                        required: true,
                        message: 'Please confirm your password!',
                    },
                    ({ getFieldValue }) => ({
                        validator(_, value) {
                            if (!value || getFieldValue('password') === value) {
                                return Promise.resolve();
                            }
                            return Promise.reject(new Error('The new password that you entered do not match!'));
                        },
                    }),
                ]}
            >
                <Input.Password />
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit" className='w-full rounded-full'>
                    Register
                </Button>
                <Link className=' text-center' href='/login'>
                    <div>Already on ConnectIn? Log in</div>
                </Link>
            </Form.Item>
        </Form>
    );
};
export default App;