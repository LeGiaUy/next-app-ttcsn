'use client'

import { CartProductType } from "./[productId]/ProdeucDetails";

interface SetQtyProps {
    cartCounter?: boolean;
    cartProduct: CartProductType;
    handleQtyIncrease: () => void;
    handleQtyDecrease: () => void;
}

const btnStyles = 'border-[1.2px] px-2 border-slate-300 rounded'

const SetQuantity: React.FC<SetQtyProps> = ({
    cartProduct, 
    cartCounter, 
    handleQtyIncrease,
    handleQtyDecrease
}) => {
    return ( 
    <div className="flex gap-8 items-center">
        {cartCounter ? null : <div className="font-semibold">Số Lượng:</div>}
        <div className="flex gap-4 items-center text-base">
            <button className={btnStyles}onClick={handleQtyDecrease}>-</button>
            <div>{cartProduct.quantity}</div>
            <button className={btnStyles} onClick={handleQtyIncrease}>+</button>
        </div>
    </div>)
}
    
 
export default SetQuantity;