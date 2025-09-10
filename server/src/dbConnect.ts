import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/codesync";

if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable in .env");
}

let cached = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null };
}

let connectionLogged = false;

export async function dbConnect() {
  if (cached.conn) {
    return cached.conn;
  }
  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI as string).then((mongoose) => {
      if (!connectionLogged) {
        mongoose.connection.on('connected', () => {
          console.log('✅ MongoDB connected:', MONGODB_URI);
        });
        mongoose.connection.on('error', (err) => {
          console.error('❌ MongoDB connection error:', err);
        });
        connectionLogged = true;
      }
      return mongoose;
    });
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

export { mongoose };