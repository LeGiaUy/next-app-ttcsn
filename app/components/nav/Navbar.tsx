import { getCurrentUser } from "@/actions/getCurrentUser";
import { SafeUser } from "@/types";
import { Redressed } from "next/font/google";
import Link from "next/link";
import Container from "../container";
import CartCount from "./CartCount";
import Categories from "./Categories";
import SearchBar from "./SearchBar";
import UserMenu from "./UserMenu";

const redressed = Redressed({subsets: ["latin"], weight: ["400"]})

const NavBar = async () => {
    const currentUser = await getCurrentUser() as SafeUser | null;

    return ( 
        <div className="sticky top-0 w-full bg-slate-200 z-30 shadow-sm">
            <div className="py-4 border-b-[1px]">
                <Container>
                    <div className="flex items-center justify-between gap-3 md:gap-0">
                        <Link href="/" className={`${redressed.className} font-bold text-2xl`}>Lava-Shop</Link>
                        <div className="hidden md:block"><SearchBar></SearchBar></div>
                        <div className="flex items-center gap-8 md:gap-12">
                            <CartCount/>
                            <UserMenu currentUser={currentUser}/>
                        </div>
                    </div>
                </Container>
            </div>
            <Categories/>
        </div> );
}
 
export default NavBar;