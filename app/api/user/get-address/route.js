import { getAuth } from "@clerk/nextjs/server";
import connectDB from "../../../../config/db";
import Address from "../../../../models/Address";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    const { userId } = getAuth(request);
    await connectDB();
    const addressess = await Address.find({ userId });

    return NextResponse.json({ success: true, addressess });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message });
  }
}
