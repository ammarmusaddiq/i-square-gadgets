import { NextResponse } from "next/server";
import { getAuth } from "@clerk/nextjs/server";
import authSeller from "../../../../lib/authSeller";
import Product from "@/models/Product";
import connectDB from "../../../../config/db";

// DELETE a product by ID
export async function DELETE(req, { params }) {
  try {
    await connectDB();

    const { id } = params;

    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      return NextResponse.json(
        { success: false, message: "Product not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, message: "Product deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

// PUT - Update product (e.g., mark as sold)
export async function PUT(req, { params }) {
  try {
    const { userId } = getAuth(req);
    const isSeller = await authSeller(userId);

    if (!isSeller) {
      return NextResponse.json(
        { success: false, message: "Not authorized." },
        { status: 403 }
      );
    }

    await connectDB();
    const { id } = params;
    const body = await req.json();

    // Find the product and verify it belongs to the seller
    const product = await Product.findById(id);

    if (!product) {
      return NextResponse.json(
        { success: false, message: "Product not found" },
        { status: 404 }
      );
    }

    // Verify the product belongs to the seller
    // if (product.userId !== userId) {
    //   return NextResponse.json(
    //     { success: false, message: "Not authorized to update this product." },
    //     { status: 403 }
    //   );
    // }

    // Update the product with the provided fields (e.g., sold: true)
    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      { ...body },
      { new: true, runValidators: true }
    );

    return NextResponse.json(
      { success: true, message: "Product updated successfully", product: updatedProduct },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

