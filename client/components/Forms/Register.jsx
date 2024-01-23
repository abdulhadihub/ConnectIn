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
    DatePicker
} from 'antd';
const formItemLayout = {
    labelCol: {
        xs: {
            span: 24,
        },
        sm: {
            span: 8,
        },
    },
    wrapperCol: {
        xs: {
            span: 24,
        },
        sm: {
            span: 16,
        },
    },
};


const tailFormItemLayout = {
    wrapperCol: {
        xs: {
            span: 24,
            offset: 0,
        },
        sm: {
            span: 16,
            offset: 8,
        },
    },
};
const App = () => {
    const [form] = Form.useForm();
    const onFinish = (values) => {
        console.log('Received values of form: ', values);
        axios.post(`${server}/api/user/register`, values).then((res) => {
            console.log(res);
        });
    };
    return (
        <Form
            {...formItemLayout}
            form={form}
            name="register"
            onFinish={onFinish}
            initialValues={{
                residence: ['zhejiang', 'hangzhou', 'xihu'],
                prefix: '86',
            }}
            style={{
                maxWidth: 600,
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
                <Input defaultValue="John" />
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
                <Input defaultValue="Doe" />
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
                <DatePicker />
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
                <Input defaultValue="user1@gmail.com" />
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
                    defaultValue="1234567890"
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
                <Input.Password defaultValue="45" />
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
                <Input.Password defaultValue="45" />
            </Form.Item>

            <Form.Item {...tailFormItemLayout}>
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