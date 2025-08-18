import connectDB from "../../config/db";
import { inngest } from "../../config/inngestClient";
import Order from "../../models/Order";

// Inngets function to create orders in database

export const createUserOrder = inngest.createFunction(
  {
    id: "create-user-order",
    batchEvents: {
      maxSize: 5,
      timeout: "5s",
    },
  },
  { event: "order/created" },
  async ({ events }) => {
    // try {
    //   console.log("Events:", events);
    debugger;
    console.log("🔥 Inngest: order/created triggered");

    const orders = events.map((event) => {
      return {
        userId: event.data.userId,
        items: event.data.items,
        amount: event.data.amount,
        address: event.data.address,
        date: event.data.date,
        status: event.data.status || "Order Placed",
      };
    });

    await connectDB();
    await Order.insertMany(orders);

    console.log("✅ Orders inserted:", result);

    // console.log("Orders inserted:", result);

    return { success: true, processed: orders.length };
    // } catch (error) {
    //   console.error("Order creation failed:", error);
    //   throw error; // Important for retries
    // }
  }
);
