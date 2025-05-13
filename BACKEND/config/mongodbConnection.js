import mongoose from "mongoose";

const mongodbConnection = async () => {
  try {
    await mongoose.connect(process.env.mongoStrings);
    console.log("MongoDB connected successfully");
  } catch (e) {
    console.log(e);
  }
};

export default mongodbConnection;
