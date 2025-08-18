import { NextResponse } from "next/server";
import { getAuth } from "@clerk/nextjs/server";
import Product from "../../models/Product";
import connectDB from "../../config/db";

export async function POST(request) {
  try {
    // const { userId } = getAuth(request);
    // const { address, items } = await request.json();
    await connectDB();
    console.log("Success");
    const products = await Product.find({});
    return NextResponse.json({ success: true, products });
  } catch (error) {
    console.log("Error");
    return NextResponse.json({ success: false, message: error.message });
  }
}
