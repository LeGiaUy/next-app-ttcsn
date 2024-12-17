'use client'

import { SafeUser } from "@/types";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { useCallback, useState } from "react";
import { AiFillCaretDown } from "react-icons/ai";
import Avatar from "../products/Avatar";
import BackDrop from "./BackDrop";
import MenuItem from "./MenuItem";

interface UserMenuProps{
    currentUser: SafeUser | null
}

const UserMenu:React.FC<UserMenuProps> = ({currentUser}) => {

    console.log('user<<<', currentUser)

    const [isOpen, setIsOpen] = useState(false)

    const toggleOpen = useCallback(() => {
        setIsOpen(prev => !prev);
    }, [])

    return ( 
    <>
        <div className="relative z-30">
            <div onClick={toggleOpen}
            className="
            p-2
            border-[1px]
            border-slate-400
            flex
            flex-row
            items-center
            gap-1
            cursor-pointer
            hover:shadow-md
            rounded-full
            transition
            text-slate-700
            "
            >
                <Avatar/>
                <AiFillCaretDown/>
            </div>
            {isOpen && (
                <div className="absolute rounded-md shadow-md w-[170px] bg-white overflow-hidden right-0 top-12 text-sm flex flex-col cursor-pointer">
                    {currentUser ? 
                    <div>
                        <Link href="/orders">
                            <MenuItem onClick={toggleOpen}>Your Orders</MenuItem>
                        </Link>
                        <Link href="/admin">
                            <MenuItem onClick={toggleOpen}>Admin Dashboard</MenuItem>
                        </Link>
                        <hr></hr>
                        <MenuItem onClick={() => {toggleOpen(); signOut()}}>Đăng xuất</MenuItem>
                    </div> : 
                    <div>
                        <Link href="/login">
                            <MenuItem onClick={toggleOpen}>Đăng nhập</MenuItem>
                        </Link>
                        <Link href="/register">
                            <MenuItem onClick={toggleOpen}>Đăng ký</MenuItem>
                        </Link>
                    </div>}         
                </div>
            )}
        </div>
        {isOpen ? <BackDrop onClick={toggleOpen}/> : null}
    </> );
}
 
export default UserMenu;