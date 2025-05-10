import express from "express";
import "dotenv/config";
import mongodbConnection from "./config/mongodbConnection.js";
import userRouter from "./routes/userRoutes/authRoute.js";

const app = express();
const PORT = process.env.PORT || 8000;

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Welcome to the backend",
    status: "success",
  });
});
// middleware
app.use(express.json());

// import the routes to each endpoint
app.use("/api/v1/auth", userRouter);

app.listen(PORT, async (req, res) => {
  await mongodbConnection();
  console.log(`Server is running on port ${PORT}`);
});
