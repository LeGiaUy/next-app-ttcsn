import { getCurrentUser } from "@/actions/getCurrentUser";
import prisma from "@/libs/prismadb";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } } // Inline type definition
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

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } } // Add params here too for clarity
) {
  try {
    const body = await request.json();
    const { inStock } = body;

    // Input validation
    if (typeof inStock !== "boolean") {
      return NextResponse.json(
        { error: "Invalid input" },
        { status: 400 }
      );
    }

    // Update the product's inStock field
    const updatedProduct = await prisma.product.update({
      where: { id: params.id },
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
