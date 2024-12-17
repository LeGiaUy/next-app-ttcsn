import { getCurrentUser } from "@/actions/getCurrentUser";
import prisma from "@/libs/prismadb";
import { NextResponse } from "next/server";

interface Params {
  params: { id: string };
}

export async function DELETE(
  request: Request,
  { params }: Params // Explicitly define the params type
) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser || currentUser.role !== "ADMIN") {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    // Delete the product with the provided ID
    const product = await prisma.product.delete({
      where: {
        id: params.id,
      },
    });

    return NextResponse.json(product, { status: 200 });
  } catch (error) {
    console.error("[PRODUCT_DELETE_ERROR]", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, inStock } = body;

    // Input validation
    if (!id || typeof inStock !== "boolean") {
      return NextResponse.json(
        { error: "Invalid input" },
        { status: 400 }
      );
    }

    // Update the product's inStock field
    const updatedProduct = await prisma.product.update({
      where: { id },
      data: { inStock },
    });

    return NextResponse.json(updatedProduct, { status: 200 });
  } catch (error) {
    console.error("[PRODUCT_PUT_ERROR]", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
