import { getCurrentUser } from "@/actions/getCurrentUser";
import prisma from "@/libs/prismadb";
import { NextRequest, NextResponse } from "next/server";

// DELETE handler for deleting a product by ID
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } } // Sửa đổi ở đây
) {
  const { id } = params;  // Extract `id` from `params`

  try {
    const currentUser = await getCurrentUser();

    if (!currentUser || currentUser.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Delete the product with the provided ID
    const product = await prisma.product.delete({
      where: { id },
    });

    return NextResponse.json(product, { status: 200 });
  } catch (error) {
    console.error("[PRODUCT_DELETE_ERROR]", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// PUT handler for updating the product's stock status
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, inStock } = body;

    // Input validation
    if (!id || typeof inStock !== "boolean") {
      return NextResponse.json({ error: "Invalid input" }, { status: 400 });
    }

    // Update the product's inStock field
    const updatedProduct = await prisma.product.update({
      where: { id },
      data: { inStock },
    });

    return NextResponse.json(updatedProduct, { status: 200 });
  } catch (error) {
    console.error("[PRODUCT_PUT_ERROR]", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
