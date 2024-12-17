// Import các hook cần thiết từ React
import { CartProductType } from "@/app/product/[productId]/ProdeucDetails";
import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { toast } from 'react-hot-toast';

// Định nghĩa kiểu dữ liệu cho CartContext
type CartContextType = {
    cartTotalQty: number; // Lượng sản phẩm trong giỏ hàng
    cartTotalAmount: number;
    cartProducts: CartProductType[] | null;
    handleAddProductToCart: (product: CartProductType) => void;
    handleRemoveProductFromCart: (product: CartProductType) => void;
    handleCartQtyIncrease: (product: CartProductType) => void;
    handleCartQtyDecrease: (product: CartProductType) => void;
    handleClearCart: () => void ;
    paymentIntent: string | null;
    handleSetPaymentIntent: (val: string | null) => void;
}

// Tạo một context mới với giá trị mặc định là null
// Context này sẽ lưu trữ dữ liệu giỏ hàng
export const CartContext = createContext<CartContextType | null>(null);

// Định nghĩa kiểu dữ liệu cho Props của CartContextProvider
interface Props {
    [propName: string]: any; // Các props có thể nhận bất kỳ dữ liệu nào
}

// CartContextProvider là component cung cấp dữ liệu giỏ hàng cho các thành phần con
export const CartContextProvider = (props: Props) => {
    // Khai báo state để lưu trữ tổng số lượng sản phẩm trong giỏ hàng
    const [cartTotalQty, setCartTotalQty] = useState(0);
    const [cartTotalAmount, setCartTotalAmount] = useState(0);
    const[cartProducts, setCartProducts] = useState<CartProductType[] | null>(null);

    const [paymentIntent, setPaymentIntent] = useState<string | null>(null)

    console.log("qty", cartTotalQty);
    console.log("amount", cartTotalAmount);

    //Lấy dữ liệu từ local storage mỗi khi refresh
    useEffect(() => {
        const cartItems: any = localStorage.getItem('eShopCartItems')
        const cProducts: CartProductType[] | null = JSON.parse(cartItems)
        const eShopPaymentIntent: any = localStorage.getItem('eShopPaymentIntent')
        const paymentIntent: string | null = JSON.parse(eShopPaymentIntent)

        setCartProducts(cProducts)
        setPaymentIntent(paymentIntent);
    },[])

    useEffect(() => {
        const getTotals = () => {
            if(cartProducts){
                const {total, qty} = cartProducts?.reduce((acc, item) => {
                    const itemTotal = item.price * item.quantity
    
                    acc.total += itemTotal
                    acc.qty += item.quantity
    
                    return acc;
                },{
                    total: 0,
                    qty: 0
                });

                setCartTotalQty(qty)
                setCartTotalAmount(total);
            }
        };
        getTotals();
    },[cartProducts])
    
    const handleAddProductToCart = useCallback((product: CartProductType) => {
        setCartProducts((prev) => {
            let updatedCart;

            if(prev) {
                updatedCart = [...prev, product];
            }
            else {
                updatedCart = [product];
            }

            toast.success("Product added to cart")
            localStorage.setItem('eShopCartItems', JSON.stringify(updatedCart))
            return updatedCart;
        })
    },[]);

    const handleRemoveProductFromCart = useCallback((
        product: CartProductType
    ) => {
        if(cartProducts){
            const filteredProducts = cartProducts.filter((item) => {
                return item.id !== product.id
            })

            setCartProducts(filteredProducts)
            toast.success("Product removed")
            localStorage.setItem('eShopCartItems', JSON.stringify(filteredProducts));
        }
    }, [cartProducts]);

    const handleCartQtyIncrease = useCallback((product:CartProductType) => {
        let updatedCart;

        if(product.quantity === 10){
            return toast.error("Đã đạt tối đa số lượng cho phép!");
        }

        if(cartProducts){
            updatedCart = [...cartProducts]

            const existingIndex = cartProducts.findIndex((item) => item.id === product.id);

            if(existingIndex > -1){
                updatedCart[existingIndex].quantity == ++updatedCart[existingIndex].quantity
            }

            setCartProducts(updatedCart)
            localStorage.setItem('eShopCartItems', JSON.stringify(updatedCart))
        }
    },[cartProducts])

    const handleCartQtyDecrease = useCallback((product:CartProductType) => {
        let updatedCart;

        if(product.quantity === 1){
            return toast.error("Đã đạt tối thiểu số lượng cho phép!");
        }

        if(cartProducts){
            updatedCart = [...cartProducts]

            const existingIndex = cartProducts.findIndex((item) => item.id === product.id);

            if(existingIndex > -1){
                updatedCart[existingIndex].quantity == --updatedCart[existingIndex].quantity
            }

            setCartProducts(updatedCart)
            localStorage.setItem('eShopCartItems', JSON.stringify(updatedCart))
        }
    },[cartProducts])

    const handleClearCart = useCallback (() => {
        setCartProducts(null)
        setCartTotalQty(0)
        localStorage.setItem('eShopCartItems', JSON.stringify(null))
    },[cartProducts]);

    const handleSetPaymentIntent = useCallback((val: string | null) => {
        setPaymentIntent(val)
        localStorage.setItem('eShopPaymentIntent', JSON.stringify(val))
    }, [paymentIntent])

    // Dữ liệu cần cung cấp cho các thành phần con thông qua CartContext
    const value = {
        cartTotalQty, // Chỉ có tổng số lượng giỏ hàng ở đây
        cartTotalAmount,
        cartProducts,
        handleAddProductToCart,
        handleRemoveProductFromCart,
        handleCartQtyIncrease,
        handleCartQtyDecrease,
        handleClearCart,
        paymentIntent,
        handleSetPaymentIntent
    }

    // Sử dụng Provider để bao bọc các component con, cung cấp dữ liệu cartTotalQty
    // `...props` cho phép truyền bất kỳ props nào từ component cha vào CartContextProvider
    return <CartContext.Provider value={value} {...props}></CartContext.Provider>
}

// Custom hook `useCart` giúp truy cập dữ liệu từ CartContext một cách dễ dàng
export const useCart = () => {
    // Dùng `useContext` để lấy dữ liệu từ CartContext
    const context = useContext(CartContext);

    // Nếu context là null, nghĩa là `useCart` đang được gọi ngoài phạm vi `CartContextProvider`,
    // ta sẽ ném một lỗi để đảm bảo ứng dụng không bị crash hoặc mất dữ liệu bất ngờ.
    if (context === null) {
        throw new Error("useCart must be used in a CartContextProvider");
    }

    // Trả về giá trị context để các component sử dụng được dữ liệu giỏ hàng
    return context;
}
