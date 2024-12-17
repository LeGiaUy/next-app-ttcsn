import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData();
        const image = formData.get('image') as File;
        
        // Thêm logic upload ảnh của bạn ở đây
        const uploadResponse = await uploadImageToCloudinary(image); // Gọi hàm upload ảnh
        const imageUrl = uploadResponse.secure_url; // Lấy URL của ảnh sau khi upload
        
        return NextResponse.json({ imageUrl });
    } catch (error) {
        return NextResponse.json(
            { error: "Lỗi khi upload ảnh" },
            { status: 500 }
        );
    }
}

// Hàm upload ảnh lên Cloudinary
async function uploadImageToCloudinary(image: File) {
    const formData = new FormData();
    formData.append('file', image);
    formData.append('upload_preset', 'default_preset');

    const response = await fetch('https://api.cloudinary.com/v1_1/dukixzsqj/image/upload', {
        method: 'POST',
        body: formData,
    });

    if (!response.ok) {
        throw new Error('Lỗi khi upload ảnh lên Cloudinary');
    }

    return await response.json();
}
