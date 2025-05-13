import userModel from "../../model/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config.js";

const loginUsers = async (req, res) => {
  try {
    const { email, password } = req.body;

    // check if email and npassword are provided
    if (!email && !password) throw "Email and password is required";
    if (!email && password) throw "Email is required";
    if (email && !password) throw "Password is required";
    if (email && password) {
      if (email.length < 3) throw "Email is too short";
      if (password.length < 2) throw "Password is too short";
    }

    // check if user exists
    const userExists = await userModel.findOne({
      email: email.toLowerCase().trim(),
    });
    if (!userExists) {
      return res
        .status(400)
        .json({ message: "User does not exist", status: "failed" });
    }

    // check if the password is correct
    const isPasswordCorrect = await bcrypt.compare(
      password,
      userExists.password
    );
    if (!isPasswordCorrect) {
      return res
        .status(400)
        .json({ message: "Invalid password", status: "failed" });
    }
    // check if the user is an admin
    if (userExists.userType !== "user") {
      return res
        .status(400)
        .json({ message: "You are not authorized", status: "failed" });
    }

    // generate the token
    const token = jwt.sign({ id: userExists._id }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });

    // send the response
    res.status(200).json({
      token,
      id: userExists._id,
      email: userExists.email,
      message: "Login successfully",
      status: "success",
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Internal server error", status: "failed" });
  }
};
export default loginUsers;
