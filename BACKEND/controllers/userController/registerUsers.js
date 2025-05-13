import userModel from "../../model/userModel.js";
import validator from "validator";
import bcrypt from "bcrypt";

const registerUsers = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // validate user info

    if (validator.isEmpty(name, { ignore_whitespace: "true" })) {
      return res
        .status(400)
        .json({ message: "Name is required", status: "failed" });
    }

    if (!email) {
      return res
        .status(400)
        .json({ message: "Email is required", status: "failed" });
    }

    if (!password) {
      return res
        .status(400)
        .json({ message: "password is required", status: "failed" });
    }

    // if (validator.isEmail(email, { ignore_whitespace: "true" })) {
    //   return res
    //     .status(400)
    //     .json({ message: "Email is required", status: "failed" });
    // }

    // if (
    //   validator.isStrongPassword(password, {
    //     minLength: 6,
    //     minUppercase: 1,
    //     minNumbers: 1,
    //     minSymbols: 1,
    //   }) === false
    // ) {
    //   return res
    //     .status(400)
    //     .json({ message: "Password is required", status: "failed" });
    // }
    // check if the email is already registered

    const userExists = await userModel.findOne({ email });
    console.log(userExists);

    // check if the user already exists
    if (userExists) {
      return res
        .status(400)
        .json({ message: "User already exists", status: "failed" });
    }

    // hash the user password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // create the new user
    const userCreated = await userModel.create({
      name,
      password: hashedPassword,
      email,
    });
    // send response
    res.status(200).json({
      name: userCreated.name,
      email: userCreated.email,
      userCreated: userCreated.userType,
      id: userCreated._id,
      message: "User registered successfully",
      status: "success",
    });
  } catch (e) {
    res.status(404).json({ message: e.message, status: "failed" });
  }
};

export default registerUsers;
