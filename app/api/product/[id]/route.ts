import { getCurrentUser } from "@/actions/getCurrentUser";
import prisma from "@/libs/prismadb";
import { NextResponse } from "next/server";

export async function DELETE(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        const currentUser = await getCurrentUser();

        if (!currentUser || currentUser.role !== "ADMIN") {
            return NextResponse.json(
                { error: "Unauthorized" },
                { status: 401 }
            );
        }

        const product = await prisma.product.delete({
            where: {
                id: params.id
            }
        });

        return NextResponse.json(product);
    } catch (error) {
        console.error("[PRODUCT_DELETE]", error);
        return NextResponse.json(
            { error: "Internal error" },
            { status: 500 }
        );
    }
} 

export async function PUT(request: Request) {
    try {
        const body = await request.json();
        const { id, inStock } = body;

        if (!id || typeof inStock !== "boolean") {
            return NextResponse.json({ error: "Invalid input" }, { status: 400 });
        }

        const updatedProduct = await prisma.product.update({
            where: { id },
            data: { inStock },
        });

        return NextResponse.json(updatedProduct);
    } catch (error) {
        console.error("[PRODUCT_PUT_ERROR]", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}