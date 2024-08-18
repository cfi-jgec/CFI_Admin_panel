import mongoose from "mongoose";

export async function connectDB() {
    try {
        await mongoose.connect(process.env.MONGOOSE_URL!);
        console.log("MongoDB connected successfully");
    } catch (error) {
        console.log("Something goes wrong!");
        console.log(error);
    }
}