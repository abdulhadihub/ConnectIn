"use client";
import { useUser } from "@/utils/Context/UserContext";
import { useEffect } from "react";
import { redirect } from "next/navigation";


export default function isAuth(Component) {
    return function isAuth(props) {
        const { user } = useUser();
        const auth = user;


        useEffect(() => {
            if (!auth) {
                return redirect("/login");
            }
        }, []);


        if (!auth) {
            return null;
        }

        return <Component {...props} />;
    };
}