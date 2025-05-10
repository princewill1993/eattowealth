import jwt from "jsonwebtoken";

const isAuthenticated = (req, res, next) => {
  // get the token from the request header
  const headerObj = req.headers;
  const token = headerObj?.authorization?.split(" ")[1];

  // verify the token
  const verifyToken = jwt.verify(
    token,
    process.env.JWT_SECRET,
    (err, decoded) => {
      if (err) {
        return false;
      } else {
        return decoded;
      }
    }
  );
  if (verifyToken) {
    // Save the user id to the request object
    req.user = verifyToken;
    req.userId = verifyToken.id;
    console.log(req.userId);

    next();
  } else {
    res.status(404).json({
      message: "Token invalid or expired, please login again",
      status: "failed",
      next(err) {
        console.log(err);
      },
    });
  }
};

export default isAuthenticated;
