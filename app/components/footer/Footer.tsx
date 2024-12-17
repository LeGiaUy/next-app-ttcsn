import Link from "next/link";
import { AiFillInstagram, AiFillTwitterCircle, AiFillYoutube } from 'react-icons/ai';
import { MdFacebook } from 'react-icons/md';
import Container from "../container";
import FooterList from "./FooterList";

const Footer = () => {
    return ( <footer className="bg-slate-700 text-slate-200 text-sm mt-16">
        <Container>
            <div className="flex flex-col md:flex-row justify-between pt-16 pb-8">
                <FooterList>
                    <h3 className="text-base font-bold mb-2">Danh Mục</h3>
                    <Link href="#">Điện Thoại</Link>
                    <Link href="#">Laptop</Link>
                    <Link href="#">PC</Link>
                    <Link href="#">Đồng Hồ</Link>
                    <Link href="#">TV</Link>
                    <Link href="#">Phụ Kiện</Link>
                </FooterList>
                <FooterList>
                    <h3 className="text-base font-bold mb-2">Dịch Vụ</h3>
                    <Link href="#">Liên hệ</Link>
                    <Link href="#">Chính Sách Giao Hàng</Link>
                    <Link href="#">Đổi Trả Hàng</Link>
                    <Link href="#">Câu Hỏi Thường Gặp</Link>
                </FooterList>
                <div className="w-full md:w-1/3 px-16 mb-6 md:mb-0">
                <h3 className="text-base font-bold mb-2">Về Chúng Tôi</h3>
                <p className="mb-2">Chúng tôi là một công ty chuyên cung cấp các sản phẩm công nghệ chất lượng cao, cam kết mang đến sự hài lòng cho khách hàng.</p>
                <p>&copy; {new Date().getFullYear()} E-Shop. All rights reserved</p>
                </div>
                <FooterList>
                <h3 className="text-base font-bold mb-2">Theo Dõi</h3>
                <div className="flex gap-2">
                    <Link href="#">
                    <MdFacebook size={24}></MdFacebook></Link>
                    <Link href="#">
                    <AiFillTwitterCircle size={24}></AiFillTwitterCircle></Link>
                    <Link href="#">
                    <AiFillInstagram size={24}></AiFillInstagram></Link>
                    <Link href="#">
                    <AiFillYoutube size={24}></AiFillYoutube></Link>
                </div>
                </FooterList>
            </div>
        </Container>
    </footer> );
}
 
export default Footer;