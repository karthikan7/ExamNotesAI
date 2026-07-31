import mongoose from "mongoose";

const DEFAULT_MONGO_URL = "mongodb+srv://kan733103_db_user:KxUxRCOWYyssXwlk@ai.znax9ey.mongodb.net/examnotes?retryWrites=true&w=majority&appName=ai";

const connectDb = async () => {
    try {
        const mongoUrl = process.env.MONGODB_URL || DEFAULT_MONGO_URL;
        await mongoose.connect(mongoUrl, {
            serverSelectionTimeoutMS: 5000
        });
        console.log("✅ Database Connected Successfully");
    } catch (error) {
        console.error("❌ DB Connection Error:", error.message);
    }
};

export default connectDb;