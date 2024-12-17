import { getCurrentUser } from '@/actions/getCurrentUser';
import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {

    const body = await request.json();
    const { name, description, brand, category, inStock, images, price } = body;
    
    const currentUser = await getCurrentUser();

    if(!currentUser || currentUser.role !== "ADMIN"){
        return NextResponse.error();
    }

    try {
        const product = await prisma.product.create({
            data: {
                name,
                description,
                brand,
                category,
                inStock,
                images,
                price: parseFloat(price),
            },
        });
        return NextResponse.json(product, { status: 201 });
    } catch (error) {
        console.error("Error creating product:", error);
        return NextResponse.json(
            { error: "Đã xảy ra lỗi khi tạo sản phẩm." }, 
            { status: 500 }
        );
    }
}
