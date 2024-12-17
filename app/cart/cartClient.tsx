'use client';
import { useCart } from "@/hooks/useCart";
import { formatPrice } from "@/utils/formatPrice";
import Link from "next/link";
import { MdArrowBack } from "react-icons/md";
import Button from "../components/Button";
import Heading from "../components/products/Heading";
import IteamContent from "./ItemContent";

const CartClient = () => {
    const {cartProducts, handleClearCart, cartTotalAmount} = useCart();

    if (!cartProducts || cartProducts.length === 0){
        return(
            <div className="flex flex-col items-center">
                <div className="text-2xl">Giỏ hàng trống</div>
                <div>
                    <Link href={"/"} className="text-slate-500 flex items-center gap-1 mt-2"><MdArrowBack></MdArrowBack><span>Bắt Đầu Mua Sắm</span></Link>
                </div>
            </div>
        )
    }

    return ( 
    <div>
        <Heading title="Shopping Cart" center></Heading>
        <div className="grid grid-cols-5 text-xs gap-4 pb-2 items-center mt-8">
                <div className="col-span-2 justify-self-start">SẢN PHẨM</div>
                <div className="justify-self-center">GIÁ</div>
                <div className="justify-self-center">SỐ LƯỢNG</div>
                <div className="justify-self-end">TỔNG</div>
        </div>
        <div>
            {cartProducts && cartProducts.map((item) => {
                return <IteamContent key={item.id} item={item} />; 
            })}
        </div>
        <div className="border-t-[1.5px] border-slate-200 py-4 flex justify-between gap-4">
            <div className="w-[90px]">
                <Button label="Xóa Hết" onClick={() => {
                    handleClearCart();
                }} small outline/>
            </div>
            <div className="text-sm flex-col gap-1 items-start">
                <div className="flex justify-between w-full text-base font-semibold">
                    <span>Tổng</span>
                    <span>{formatPrice(cartTotalAmount)}</span>
                </div>                
                <p className="text-slate-500">Thuế và phí giao hàng được tính ở phần Thanh Toán   
                </p>
                <Button label="Thanh Toán" onClick={() => {}} />
                <Link href={"/"} className="text-slate-500 flex items-center gap-1 mt-2"><MdArrowBack></MdArrowBack><span>Tiếp tục mua sắm</span></Link> 
            </div>
        </div>
    </div> );
}
 
export default CartClient;