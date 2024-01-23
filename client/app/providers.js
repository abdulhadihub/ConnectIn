'use client';
import { CookiesProvider } from "react-cookie";
import { UserProvider } from '@/utils/Context/UserContext'

export function Providers({ children }) {
    return (
        <CookiesProvider>
            <UserProvider>
                {children}
            </UserProvider>
        </CookiesProvider>
    );
}