'use client'

import Link from "next/link";
import { usePathname } from "next/navigation";
import { MdDns, MdFormatListBulleted } from "react-icons/md";
import Container from "../container";
import AdminNavItem from "./AdminNavItem";

const AdminNav = () => {

    const pathname = usePathname()

    return ( 
    <div className="w-full shadow-sm top-20 border-[1px] pt-4">
        <Container>
            <div className="flex flex-row items-center justify-between md:justify-center gap-8 md:gap-12 overflow-x-auto flex-wrap">
                {/* <Link href="/admin">
                    <AdminNavItem 
                    label="Tóm tắt" 
                    icon={MdDashboard} 
                    selected={pathname === "/admin"}
                    />
                </Link> */}
                <Link href="/admin/add-products">
                    <AdminNavItem 
                    label="Thêm Sản phẩm" 
                    icon={MdDns} 
                    selected={pathname === "/admin/add-products"}
                    />
                </Link>
                <Link href="/admin/manage-products">
                    <AdminNavItem 
                    label="Quản lý sản phẩm" 
                    icon={MdFormatListBulleted} 
                    selected={pathname === "/admin/manage-products"}
                    />
                </Link>
                {/* <Link href="/admin/manage-orders">
                    <AdminNavItem 
                    label="Quản lý đơn hàng" 
                    icon={MdDashboard} 
                    selected={pathname === "/admin/manage-orders"}
                    />
                </Link> */}
            </div>
        </Container>
    </div> );
}
 
export default AdminNav;