// import { getAuth } from "@clerk/nextjs/server";
// import { NextResponse } from "next/server";
// import Product from "../../../../models/Product";
// import { inngest } from "../../../../config/inngest";
// import User from "../../../../models/User";
// import connectDB from "../../../../config/db";

// /* This function is without batching , batching means k sb requests ko ek sath jama kr k ek dafa DB ko query bhjta ha .. is logic me queries seperately ja rhi han ek ek kr k .. */

// export async function POST(request) {
//   try {
//     const { userId } = getAuth(request);

//     await connectDB();

//     const { address, items } = await request.json();

//     if (!address || items.length === 0) {
//       return NextResponse.json({ success: false, message: "Invalid data." });
//     }

//     //Calculate price using items

//     // const amount = await items.reduce(async (acc, item) => {
//     //   const product = await Product.findById(item.product);
//     //   return await (acc + product.offerPrice * item.quantity);
//     // }, 0);

//     const amount = await items.reduce(async (accPromise, item) => {
//       const acc = await accPromise;
//       const product = await Product.findById(item.product);
//       if (!product)
//         throw new Error(`Product with ID ${item.product} not found.`);
//       return acc + product.offerPrice * item.quantity;
//     }, Promise.resolve(0));

//     await inngest.send({
//       name: "order/created",
//       data: {
//         userId,
//         address,
//         items,
//         amount: amount + Math.floor(amount * 0.02),
//         date: Date.now(),
//       },
//     });

//     // Clear users cart

//     const user = await User.findById(userId);
//     user.cartItems = {};
//     await user.save();

//     return NextResponse.json({
//       success: true,
//       message: "Order placed successfuly.",
//     });
//   } catch (error) {
//     return NextResponse.json({ success: false, message: error.message });
//   }
// }

// This code is with batching method ...

// import { getAuth } from "@clerk/nextjs/server";
// import { NextResponse } from "next/server";
// import Product from "../../../../models/Product";
// import { inngest } from "../../../../config/inngest";
// import User from "../../../../models/User";
// import connectDB from "../../../../config/db";

// export async function POST(request) {
//   try {
//     const { userId } = getAuth(request);

//     await connectDB();

//     const { address, items } = await request.json();

//     if (!address || !items || items.length === 0) {
//       return NextResponse.json({ success: false, message: "Invalid data." });
//     }

//     // Step 1: Collect all product IDs
//     const productIds = items.map((item) => item.product);

//     // Step 2: Fetch all products in one DB call
//     const products = await Product.find({ _id: { $in: productIds } });

//     // Step 3: Create a map for quick access
//     const productMap = {};
//     products.forEach((p) => {
//       productMap[p._id.toString()] = p;
//     });

//     // Step 4: Calculate total amount
//     let amount = 0;
//     for (let item of items) {
//       const product = productMap[item.product];
//       if (!product) {
//         return NextResponse.json({
//           success: false,
//           message: `Product with ID ${item.product} not found.`,
//         });
//       }
//       amount += product.offerPrice * item.quantity;
//     }

//     // Step 5: Send event to inngest
//     await inngest.send({
//       name: "order/created",
//       data: {
//         userId,
//         address,
//         items,
//         amount: amount + Math.floor(amount * 0.02), // adding 2% fee
//         date: Date.now(),
//       },
//     });

//     // Step 6: Clear user's cart
//     const user = await User.findById(userId);
//     if (user) {
//       user.cartItems = {};
//       await user.save();
//     }

//     return NextResponse.json({
//       success: true,
//       message: "Order placed successfully.",
//     });
//   } catch (error) {
//     return NextResponse.json({ success: false, message: error.message });
//   }
// }

import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import Product from "../../../../models/Product";
import { inngest } from "../../../../config/inngest";
import User from "../../../../models/User";
import connectDB from "../../../../config/db";
import Order from "../../../../models/Order";

export async function POST(request) {
  try {
    // debugger;
    await connectDB();
    const { userId } = getAuth(request);
    const { address, items } = await request.json();

    if (!address || items.length === 0) {
      return NextResponse.json({ success: false, message: "Invalid Data" });
    }

    // debugger;

    // const amount = await items.reduce(async (acc, item) => {
    //   const product = await Product.findById(item.product);
    //   return acc + product.offerPrice * item.quantity;
    // }, 0);

    //  Step 1: Collect all product IDs

    const productIds = items.map((item) => item.product);

    // Step 2: Fetch all products in one DB call
    const products = await Product.find({ _id: { $in: productIds } });

    // Step 3: Create a map for quick access
    const productMap = {};
    products.forEach((p) => {
      productMap[p._id.toString()] = p;
    });

    // Step 4: Calculate total amount
    let amount = 0;
    for (let item of items) {
      const product = productMap[item.product];
      if (!product) {
        return NextResponse.json({
          success: false,
          message: `Product with ID ${item.product} not found.`,
        });
      }
      amount += product.offerPrice * item.quantity;
    }

    const newOrder = await Order.insertMany({
      userId,
      address,
      items,
      amount: amount + Math.floor(amount * 0.02), // adding 2% fee
      date: Date.now(),
    });

    // debugger;

    // await inngest.send({
    //   name: "order/created",
    //   data: {
    //     userId,
    //     address,
    //     items,
    //     amount: amount + Math.floor(amount * 0.02), // adding 2% fee
    //     date: Date.now(),
    //   },
    // });

    console.log("✅ Event sent to Inngest");

    const user = await User.findById(userId);
    user.cartItems = {};
    await user.save();

    return NextResponse.json({ success: true, message: "Order Placed" });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ success: false, message: error.message });
  }
}
