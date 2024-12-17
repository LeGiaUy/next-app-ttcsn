'use client'

import Button from "@/app/components/Button";
import CategoryInput from "@/app/components/inputs/CategoryInput";
import CustomCheckBox from "@/app/components/inputs/CustomCheckBox";
import Input from "@/app/components/inputs/input";
import SelectColor from "@/app/components/inputs/SelectColor";
import TextArea from "@/app/components/inputs/TextArea";
import Heading from "@/app/components/products/Heading";
import { categories } from "@/utils/Categories";
import { colors } from "@/utils/Colors";
import { useCallback, useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";

export type ImageType = {
    color: string;
    colorCode: string;
    image: File | null
}

export type UplodadedImageType = {
    color: string;
    colorCode: string;
    image: string;
}

const AddProductForm = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [images, setImages] = useState<ImageType[] | null>();
    const [isProductCreated, setIsProductCreated] = useState(false);

    const {register, handleSubmit, setValue, watch, reset, formState:{errors}} = useForm<FieldValues>({
        defaultValues:{
            name: '', 
            description: '',  // Đảm bảo phần mô tả có giá trị mặc định
            brand: '',
            category: '',
            inStock: '',
            images: [],
            price: '',
        }
    })

    useEffect(() => {
        setCustomValue('images', images)
    }, [images]);

    useEffect(() => {
        if(isProductCreated){
            // Reset form với các giá trị mặc định
            reset({
                name: '', 
                description: '',  // Đảm bảo phần mô tả được reset
                brand: '',
                category: '',
                inStock: '',
                images: [],
                price: '',
            });
            setImages(null);
            setIsLoading(false);
        }
    }, [isProductCreated, reset]); // Cập nhật khi isProductCreated thay đổi

    const onSubmit: SubmitHandler<FieldValues> = async(data: FieldValues) => {
        console.log("Product Data", data)
        //upload images to fb
        //save product to mongodb
        setIsLoading(true)
        let uplodadedImages: UplodadedImageType[] = []

        if(!data.category){
            setIsLoading(false)
            return toast.error("Loại sản phẩm chưa được chọn")
        }

        if(!data.images || data.images.length === 0){
            setIsLoading(false)
            return toast.error("Ảnh chưa được chọn")
        }

        const handleImageUploads = async() => {
            toast("Đang tạo sản phẩm, vui lòng đợi...");
            try {
                for(const item of data.images){
                    if(item.image){
                        const fileName = new Date().getTime() + '-' + item.image.name;
                        // Giả sử bạn có một hàm uploadImage để tải lên hình ảnh
                        const imageUrl = await uploadImage(item.image, fileName);
                        uplodadedImages.push({ color: item.color, colorCode: item.colorCode, image: imageUrl });
                    }
                }
            } catch (error) {
                console.error("Error uploading images:", error);
                toast.error("Đã xảy ra lỗi khi tải lên hình ảnh.");
            }
        }

        await handleImageUploads(); // Gọi hàm tải lên hình ảnh

        // Lưu sản phẩm vào MongoDB
        try {
            const response = await fetch('/api/product', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: data.name,
                    description: data.description,
                    brand: data.brand,
                    category: data.category,
                    inStock: data.inStock,
                    images: uplodadedImages,
                    price: parseFloat(data.price),
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to create product');
            }

            toast.success("Sản phẩm đã được tạo thành công!");
            setIsProductCreated(true);
        } catch (error) {
            console.error("Error creating product:", error);
            toast.error("Đã xảy ra lỗi khi tạo sản phẩm.");
        } finally {
            setIsLoading(false);
        }
    }

    const category = watch("category")

    const setCustomValue = (id: string, value:any) =>{
        setValue(id, value,{
            shouldValidate: true,
            shouldDirty: true,
            shouldTouch: true,
        })
    };

    const addImageToState = useCallback((value: ImageType) => {
        setImages((prev) => {
            if(!prev){
                return [value]
            }

            return[...prev, value]
        })
    },[]);

    const removeImageToState = useCallback((value: ImageType) => {
        setImages((prev) => {
            if(prev){
                const filteredImages = prev.filter((item) => item.color !== value.color);
                return filteredImages
            }
            return prev
        })
    }, [])

    const uploadImage = async (file: File, fileName: string): Promise<string> => {
        const formData = new FormData();
        formData.append('image', file);
        
        try {
            const response = await fetch('/api/upload', {
                method: 'POST',
                body: formData
            });
            const data = await response.json();
            return data.imageUrl;
        } catch (error) {
            console.error('Error uploading image:', error);
            throw new Error('Failed to upload image');
        }
    };

    return ( 
    <>
        <Heading title="Thêm một sản phẩm" center></Heading>
        <Input
        id="name"
        label="Tên"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
        />
        <Input
        id="price"
        label="Giá"
        disabled={isLoading}
        register={register}
        errors={errors}
        type="number"
        required
        />
        <Input
        id="brand"
        label="Hãng"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
        />
        <TextArea
        id="description"
        label="Mô tả"  // Đảm bảo ID là "description"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
        />
        <CustomCheckBox id="inStock" register={register} label="Còn hàng"/>
        <div className="w-full font-medium">
            <div className="mb-2 font-semibold">
                Chọn loại sản phẩm
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 max-h-[50vh] overflow-y-auto">
                {categories.map((item) => {
                    if(item.label === 'Tất cả'){
                        return null
                    }

                    return <div key={item.label} className="col-span">
                        <CategoryInput
                        onClick={(category) => setCustomValue("category", category)}
                        selected={category === item.label} 
                        label={item.label}
                        icon = {item.icon}/>
                    </div>
                })}
            </div>
        </div>
        <div className='w-full flex flex-col flex-wrap gap-4'>
            <div className="font-bold">
                Chọn những màu sản phẩm có sẵn và tải hình ảnh của chúng lên
            </div>
            <div className="text-small">
                Bạn phải tải hình ảnh của mỗi màu hoặc màu đó sẽ không được lưu
            </div>
            <div className="grid grid-cols-2 gap-3">
                {colors.map((item, index) => {
                    return <SelectColor key={index} 
                    item={item} 
                    addImageToState={addImageToState}removeImageFromState={removeImageToState}
                    isProductCreated = {isProductCreated}></SelectColor>
                })}
            </div>
        </div>
        <Button label={isLoading ? 'Đang tải...' : 'Thêm sản phẩm'} onClick={handleSubmit(onSubmit)}/>
    </> );
}
 
export default AddProductForm;
