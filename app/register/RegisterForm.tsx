'use client'

import { SafeUser } from "@/types";
import axios from "axios";
import { signIn } from 'next-auth/react';
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { AiOutlineGoogle } from "react-icons/ai";
import Button from "../components/Button";
import Input from "../components/inputs/input";
import Heading from "../components/products/Heading";
interface RegisterFormProps{
    currentUser: SafeUser | null
}

const RegisterForm:React.FC<RegisterFormProps> = ({currentUser}) => {

    const [isLoading, setIsLoading] = useState(false)
    const {register, handleSubmit, formState:{errors}} = useForm<FieldValues>({
        defaultValues:{
            name:'',
            email:'',
            password:''
        }
    })

    const router = useRouter();

    useEffect(() => {
        if (currentUser){
           router.push('/cart') 
           router.refresh();
        }
    }, [])

    const onSubmit:SubmitHandler<FieldValues> = (data) =>{
        setIsLoading(true);

        axios.post('/api/register', data).then(() => {
            toast.success("Tạo tài khoản thành công")
        
        signIn('credentials', {
            email: data.email,
            password: data.password,
            redirect: false,
        }).then((callback) => {

            if(callback?.ok){
                router.push('/cart')
                router.refresh()
                toast.success('Đăng nhập thành công');
            }

            if(callback?.error){
                toast.error(callback.error)
            }
        });
        }).catch(() => toast.error("Có lỗi")).finally(() => {
            setIsLoading(false)
        }
        )

    }

    if(currentUser){
        return <p className="text-center">Đăng nhập thành công. Đang chuyển hướng...</p>
    }

    return ( <>
        <Heading title="Đăng ký tài khoản"></Heading>
        <Button outline label="Đăng nhập với Google "icon={AiOutlineGoogle} onClick={() => {}}></Button>
        <hr className="bg-slate-300 w-full h-px"></hr>
        <Input
        id="name"
        label="Tên"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
        />
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
        <Button label={isLoading ? "Loading" : "Sign up"} onClick={handleSubmit(onSubmit)}/>
        <p className="text-sm">
            Đã có tài khoản? <Link className="underline" href="/login">Đăng nhập</Link>
        </p>
    </> );
}
 
export default RegisterForm;