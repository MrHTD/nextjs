'use client'
import Container from '@/components/Base/Container';
import { getToken } from '@/config/redux/reducers/user';
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React, { createContext, useContext, ReactNode, useEffect, Suspense } from 'react';
import { FaRegUser } from 'react-icons/fa';
import { FiHome } from 'react-icons/fi';
import { IoStorefrontOutline } from 'react-icons/io5';
import { LuLayoutDashboard, LuShoppingCart } from 'react-icons/lu';
import { MdOutlinePayments } from 'react-icons/md';
import { RiReceiptLine } from 'react-icons/ri';
import { useDispatch } from 'react-redux';
import { twMerge } from 'tailwind-merge';

// Define the type for your context state
interface AppContextType {
    goBack: () => void;
    getCurrentURL: (a: any) => string;
}

// Create the context
const AppContext = createContext<AppContextType | undefined>(undefined);

// Create a provider props interface
interface AppProviderProps {
    children: ReactNode;
}

// Create the provider component
export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {

    // hooks
    const dispatch = useDispatch();
    const router = useRouter();
    const pathname = usePathname();

    const getCurrentURL = (searchParams: any) => {
        // Construct the full URL with query params if any
        const queryString = searchParams?.toString();
        const fullUrl = queryString ? `${pathname}?${queryString}` : pathname;

        return fullUrl;
    }

    useEffect(() => {
        dispatch(getToken());
    }, [dispatch]);


    // functions 
    const goBack = () => {
        const referrer = document.referrer;

        if (referrer) {
            router.push(referrer); // Navigate back to the previous URL
        } else {
            router.push('/'); // Fallback to homepage if no referrer
        }
    };



    // export the value provider 
    const value = {
        getCurrentURL,
        goBack,
    };

    return <AppContext.Provider value={value}>
        {children}
        {pathname !== '/login' && pathname !== '/signup' && (
            <div className="my-10 block sm:hidden h-1">
                <Container className="z-10  shadow-2xl bg-white fixed flex justify-center bottom-0 w-full border-t border-secondary/50">
                    <div className="flex flex-row gap-5 py-2 max-w-[430px] w-full justify-between px-5 items-center align-middle">
                        <NavLink href="/dashboard" icon={<LuLayoutDashboard size={22} />} />
                        <NavLink href="/orders" icon={<RiReceiptLine size={23} />} />
                        <NavLink href="/payments" icon={<MdOutlinePayments size={23} />} />
                        <NavLink href="/store" icon={<IoStorefrontOutline size={21} />} />
                    </div>
                </Container>
            </div>
        )}
    </AppContext.Provider>

};

// Create a custom hook to use the context
export const useAppContext = () => {
    const context = useContext(AppContext);
    if (context === undefined) {
        throw new Error('useAppContext must be used within an AppProvider');
    }
    return context;
};
export const useCurrentURL = () => {
    const context = useContext(AppContext);
    if (context === undefined) {
        throw new Error('useAppContext must be used within an AppProvider');
    }
    return context;
};

// Export the context (if needed)
export default AppContext;



function NavLink({ href, icon }: { href: string; icon: React.ReactNode }) {
    const pathname = usePathname();
    const isActive = pathname === href;
    const router = useRouter();


    return (
        <div
            onClick={() => {
                router.push(href);
            }}
            className={twMerge(`flex items-center py-1 border-b-2 border-white `, isActive ? " border-primary " : "")}
        >
            {icon}
        </div>
    );
}