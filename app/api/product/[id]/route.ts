import { getCurrentUser } from "@/actions/getCurrentUser";
import prisma from "@/libs/prismadb";
import { NextRequest, NextResponse } from "next/server";

// DELETE handler for deleting a product by ID
export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params; // Extract `id` from `params`

  try {
    const currentUser = await getCurrentUser();

    if (!currentUser || currentUser.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Check if the product exists before attempting to delete
    const productExists = await prisma.product.findUnique({
      where: { id },
    });

    if (!productExists) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    // Delete the product
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
export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await request.json();
    const { inStock } = body;
    const { id } = params; // Extract `id` from `params` (URL)

    // Input validation
    if (!id || typeof inStock !== "boolean") {
      return NextResponse.json({ error: "Invalid input" }, { status: 400 });
    }

    const currentUser = await getCurrentUser();

    if (!currentUser || currentUser.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Check if the product exists before attempting to update
    const productExists = await prisma.product.findUnique({
      where: { id },
    });

    if (!productExists) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
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
