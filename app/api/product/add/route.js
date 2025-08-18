import { getAuth } from "@clerk/nextjs/server";
import { v2 as cloudinary } from "cloudinary";
import authSeller from "../../../../lib/authSeller";
import { NextResponse } from "next/server";
import connectDB from "../../../../config/db";
import Product from "../../../../models/Product";

// Configure Cloudinary

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request) {
  try {
    const { userId } = getAuth(request);

    // authSeller() function is defined in lib folder , and checks user is seller or not

    const isSeller = await authSeller(userId);

    if (!isSeller) {
      return NextResponse.json({ success: false, message: "Not authorized." });
    }

    // we get this formData from front end which contains images , price , title and description

    const formData = await request.formData();

    const name = formData.get("name");
    const description = formData.get("description");
    const category = formData.get("category");
    const price = formData.get("price");
    const offerPrice = formData.get("offerPrice");

    // to get all images uploaded we use getAll()
    const files = formData.getAll("images");

    if (files.length === 0 || !files) {
      return NextResponse.json({
        success: false,
        message: "No images uploaded.",
      });
    }
    // Now we will create an array buffer of uploaded files and store the URL in result variable
    // Ye hamesha same e hota ha almost

    const result = await Promise.all(
      files.map(async (file) => {
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        return new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            {
              resource_type: "auto",
            },
            (error, result) => {
              if (error) {
                reject(error);
              } else {
                resolve(result);
              }
            }
          );
          stream.end(buffer);
        });
      })
    );

    const image = result.map((result) => result.secure_url);

    await connectDB();
    const newProduct = await Product.create({
      userId,
      name,
      description,
      category,
      price: Number(price),
      offerPrice: Number(offerPrice),
      date: Date.now(),
      image,
    });

    return NextResponse.json({
      success: true,
      message: "Product uploaded successfully.",
      newProduct,
    });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message });
  }
}
