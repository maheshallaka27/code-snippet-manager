import jwt from "jsonwebtoken";
import User from "../models/Users.js";
export const protect = async (req, res, next) => {
  try {
    if (
      !req.headers.authorization ||
      !req.headers.authorization.startsWith("Bearer")
    ) {
      return res.status(401).json({
        message: "Not authorized",
      });
    }
    let token = req.headers.authorization;
    if (!token) {
      return res.status(401).json({
        message: "no token,access denied",
      });
    }
    token = token.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select("-password");
    if (!user) {
      return res.status(401).json({
        message: "User not found",
      });
    }
    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({
      message: "Not authorized,invalid token",
    });
  }
};
