'use client'

import { SafeUser } from "@/types";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { AiOutlineGoogle } from "react-icons/ai";
import Button from "../components/Button";
import Input from "../components/inputs/input";
import Heading from "../components/products/Heading";

interface LoginFormProps{
    currentUser: SafeUser | null
}

const LoginForm:React.FC<LoginFormProps> = ({currentUser}) => {

    const [isLoading, setIsLoading] = useState(false)
    const {register, handleSubmit, formState:{errors}} = useForm<FieldValues>({
        defaultValues:{
            email:'',
            password:''
        }
    })
    
    const router = useRouter()

    useEffect(() => {
        if (currentUser){
           router.push('/cart') 
           router.refresh();
        }
    }, [currentUser])

    const onSubmit:SubmitHandler<FieldValues> = (data) =>{
        setIsLoading(true)
        signIn('credentials',  {
            ...data,
            redirect: false
        }).then((callback) => {
            setIsLoading(false)

            if(callback?.ok){
                router.push('/cart')
                router.refresh()
                toast.success('Đăng nhập thành công');
            }
    
            if(callback?.error){
                toast.error(callback.error)
            }
        }).catch((error) => {
            setIsLoading(false);
            toast.error('Đã xảy ra lỗi trong quá trình đăng nhập');
        });

        
    }

    if(currentUser){
        return <p className="text-center">Đăng nhập thành công. Đang chuyển hướng...</p>
    }

    return ( <>
        <Heading title="Đăng nhập"></Heading>
        <Button outline label="Tiếp tục với Google "icon={AiOutlineGoogle} onClick={() => {}}></Button>
        <hr className="bg-slate-300 w-full h-px"></hr>
        <Input
        id="email"
        label="Email"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
        />
        <Input
        id="password"
        label="Mật khẩu"
        disabled={isLoading}
        register={register}
        errors={errors}
        type="password"
        required
        />
        <Button label={isLoading ? "Loading" : "Đăng nhập"} onClick={handleSubmit(onSubmit)}/>
        <p className="text-sm">
            Không có tài khoản? <Link className="underline" href="/register">Đăng ký</Link>
        </p>
    </> );
}
 
export default LoginForm;