import mongoose from "mongoose";
export async function connect() {
    try {
        await mongoose.connect(process.env.MONGO_URI!);
        
        const connection = mongoose.connection;
        connection.on("connected", () => {
            console.log("Database connected successfully ✅");
        });

        connection.on("error", (error) => {
            console.log("Database connection error", error);
        });
        connection.on("disconnected", () => {
            console.log("Database disconnected ❌");
        });
    } catch (error) {
        console.log("Something went wrong", error);
    }
}