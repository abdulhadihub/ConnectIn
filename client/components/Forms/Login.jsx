'use client'
import React from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input } from 'antd';
import Link from 'next/link';


const App = () => {
    const onFinish = (values) => {
        console.log('Received values of form: ', values);
    };
    return (
        <Form
            name="normal_login"
            className="login-form"
            initialValues={{
                remember: true,
            }}
            onFinish={onFinish}
        >
            <Form.Item
                name="username"
                rules={[
                    {
                        required: true,
                        message: 'Please input your Username!',
                    },
                ]}
            >
                <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
            </Form.Item>
            <Form.Item
                name="password"
                rules={[
                    {
                        required: true,
                        message: 'Please input your Password!',
                    },
                ]}
            >
                <Input
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    type="password"
                    placeholder="Password"
                />
                <a className="login-form-forgot" href="">
                    Forgot password?
                </a>
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit" className="login-form-button w-full rounded-full">
                    Log in
                </Button>
                <div className='text-center my-2'>Or</div>

                <Link href='/register'>
                    <Button type="primary" htmlType="submit" className="login-form-button w-full rounded-full bg-white text-black border border-black hover:text-white hover:bg-blue-600 hover:border-blue-600">
                        New to ConnectIn? Join now
                    </Button>
                </Link>
            </Form.Item>
            <Form.Item>
            </Form.Item>
        </Form>
    );
};
export default App;