"use client";
import { useUser } from "@/utils/Context/UserContext";
import { useEffect } from "react";
import { redirect } from "next/navigation";
import { useCookies } from 'react-cookie';


export default function isAuth(Component) {
    return function isAuth(props) {
        const [cookies] = useCookies(['user']);
        const { user, updateUser } = useUser();


        useEffect(() => {

            if (!user) {
                if (cookies?.user) {
                    console.log(cookies.user)
                    updateUser(cookies?.user);
                }
                else {
                    return redirect("/login");
                }
            }
        }, []);


        if (!user) {
            return null;
        }

        return <Component {...props} />;
    };
}