'use client'

import ActionBtn from "@/app/components/ActionBtn";
import Heading from "@/app/components/products/Heading";
import Status from "@/app/components/Status";
import { formatPrice } from "@/utils/formatPrice";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Product } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import toast from "react-hot-toast";
import { MdCached, MdClose, MdDelete, MdDone, MdRemoveRedEye } from "react-icons/md";

interface ManageProductsClientProps{
    products: Product[]
}

const ManageProductsClient: React.FC<ManageProductsClientProps> = ({products}) => {

    const router = useRouter();

    let rows: any = []

    if(products){
        rows = products.map((product) => {
            return {
                id: product.id,
                name: product.name,
                price: formatPrice(product.price),
                category: product.category,
                brand: product.brand,
                inStock: product.inStock,
                images: product.images
            }
        })
    }

    const columns: GridColDef[] = [
        {field: 'id', headerName: 'ID', width: 220},
        {field: 'name', headerName: 'Tên', width: 220},
        {field: 'price', headerName: 'Giá', width: 100, renderCell: (params) => {
            return (<div className="font-bold text-slate-800">{params.row.price}</div>)
        }},
        {field: 'category', headerName: 'Phân loại', width: 100},
        {field: 'brand', headerName: 'Hãng', width: 100},
        {field: 'inStock', headerName: 'Tình trạng', width: 120, renderCell: (params) => {
            return (<div>{params.row.inStock === true ? 
            <Status 
            text="Còn hàng"
            icon={MdDone}
            bg="bg-teal-200"
            color="text-teal-700"
            /> : 
            <Status 
            text="Hết hàng"
            icon={MdClose}
            bg="bg-rose-200"
            color="text-rose-700"
            />}</div>)
        }},
        {field: 'action', headerName: 'Hành động', width: 200, renderCell: (params) => {
            return (
                <div className="flex items-center justify-center gap-4 w-full h-full">
                    <ActionBtn icon={MdCached} onClick={() => {handleToggleStock(params.row.id, params.row.inStock)}}/>
                    <ActionBtn icon={MdDelete} onClick={() => {handleDelete(params.row.id, params.row.images)}}/>
                    <ActionBtn icon={MdRemoveRedEye} onClick={() => {
                        router.push(`/product/${params.row.id}`)
                    }}/>
                </div>
            )
        }}
        
    ];

    const handleToggleStock = useCallback((id: string, inStock: boolean) => {
        axios.put(`/api/product/${id}`, {
            id,
            inStock: !inStock
        }).then ((res) => {
            toast.success("Trạng thái sản phẩm đã được thay đổi")
            router.refresh()
        }).catch((err) => {
            toast.error("Có lỗi xảy ra")
            console.log(err)
        });
    }, [])

    const handleDelete = useCallback(async (id: string, images: any[]) => {
        toast("Đang xóa sản phẩm, vui lòng chờ!");
    
        try {
            // Xóa ảnh trước
            for (const item of images) {
                try {
                    await axios.post('/api/delete-image', { 
                        public_id: item.public_id 
                    });
                } catch (error) {
                    console.log("Lỗi xóa ảnh:", error);
                }
            }
    
            // Sau đó xóa sản phẩm
            await axios.delete(`/api/product/${id}`);
            toast.success("Sản phẩm đã được xóa");
            router.refresh();
        } catch (error) {
            toast.error("Có lỗi xảy ra khi xóa sản phẩm");
            console.log(error);
        }
    }, [router]);
    

    const handleImageDelete = async (public_id: string) => {
        try {
            const response = await axios.post('/api/delete-image', { public_id });
            if (!response.data.success) {
                throw new Error(response.data.error);
            }
        } catch (error: any) {
            console.error('Lỗi xóa ảnh', error);
            toast.error(error.response?.data?.error || 'Lỗi khi xóa ảnh');
            throw error;
        }
    };

    return ( <div className="max-w-[1150px] m-auto text-xl">
        <div className="mb-4 mt-8">
            <Heading title="Quản lý sản phẩm" center/>
        </div>
        <div style={{height: 600, width: "100%"}}>
            <DataGrid
                rows={rows}
                columns={columns}
                initialState={{ 
                    pagination: { 
                        paginationModel:{page: 0, pageSize: 5},
                    }, 
                }}
                pageSizeOptions={[5, 10]}
                checkboxSelection
                disableRowSelectionOnClick
        />       
        </div>
    </div> );
}
 
export default ManageProductsClient;