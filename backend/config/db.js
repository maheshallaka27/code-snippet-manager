import mongoose from "mongoose";
const connectDB = async () => {
  try {
    console.log("database connected,URL:", process.env.MONGODB_URI);
    await mongoose.connect(process.env.MONGODB_URI);
  } catch (error) {
    console.log("databse connection failed");
    console.log(error.message);
    process.exit(1);
  }
};
export default connectDB;
