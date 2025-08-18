import { Inngest } from "inngest";
import connectDB from "./db";
import User from "../models/User";
import Order from "../models/Order";

// Create a client to send and receive events
export const inngest = new Inngest({ id: "mygames-next" });

// Inngest function to save user data to a databse
export const syncUserCreation = inngest.createFunction(
  { id: "sync-user-from-clerk" },
  { event: "clerk/user.created" },
  async ({ event }) => {
    // yaha hum ne clerk ki api ki fields se jo data ae ga wo nikaal lia

    const { id, first_name, last_name, email_addresses, image_url } =
      event.data;

    // yaha hum ne clerk se nikaal kr apny database k schema k hisaab se data store kra lia schema wali field me
    const userData = {
      _id: id,
      email: email_addresses[0].email_address,
      name: first_name + " " + last_name,
      imageUrl: image_url,
    };

    await connectDB(); // to make connection to mongoDB
    await User.create(userData); // User model import kia or us me data store kia
  }
);

// Inngest function to update User Data in Database

export const syncUserUpdation = inngest.createFunction(
  { id: "update-user-from-clerk" },
  { event: "clerk/user.updated" },
  async ({ event }) => {
    const { id, first_name, last_name, image_url, email_addresses } =
      event.data;
    const userData = {
      _id: id,
      email: email_addresses[0].email_address,
      name: first_name + " " + last_name,
      imageUrl: image_url,
    };

    await connectDB();
    await User.findByIdAndUpdate(id, userData);
  }
);

// Inngest function to delete User from Database

export const syncUserDeletion = inngest.createFunction(
  { id: "delete-user-with-clerk" },
  { event: "clerk/user.deleted" },
  async ({ event }) => {
    const { id } = event.data;

    await connectDB();
    await User.findByIdAndDelete(id);
  }
);

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
