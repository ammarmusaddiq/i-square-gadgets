import mongoose from "mongoose";

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectDB() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose
      .connect(`${process.env.MONGODB_URI}/mygames`, opts)
      .then((mongoose) => {
        return mongoose;
      });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

export default connectDB;

// We can use this simple connection method also

// import mongoose from "mongoose";

// const MONGODB_URI = process.env.MONGODB_URI;

// export default async function connectDB() {
//   try {
//     await mongoose.connect(MONGODB_URI);
//     console.log("MongoDB connected!");
//   } catch (error) {
//     console.error("MongoDB connection error:", error);
//   }
// }
