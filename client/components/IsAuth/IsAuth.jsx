"use client";
import { useUser } from "@/utils/Context/UserContext";
import { useEffect } from "react";
import { redirect } from "next/navigation";
import { useCookies } from 'react-cookie';
import axios from 'axios';
import server from '@/utils/server';

export default function isAuth(Component) {
    return function isAuth(props) {
        const [cookies] = useCookies(['x-auth-token']);
        const { user, updateUser } = useUser();
        const token = cookies["x-auth-token"];

        const fetchUser = async () => {
            try {
                const res = await axios.get(`${server}/api/user/verify`, {
                    headers: {
                        'x-auth-token': cookies['x-auth-token']
                    },
                });
                if (res?.data?.success) {
                    updateUser(res?.data?.user);
                }
            } catch (error) {
                console.log(error);
            }
        };


        useEffect(() => {
            if (!user) {
                if (cookies["x-auth-token"]) {
                    fetchUser();
                }
                else {
                    return redirect("/login");
                }
            }
        }, [token, user]);


        if (!user) {
            return null;
        }

        return <Component {...props} />;
    };
}