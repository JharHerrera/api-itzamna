import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const tokenSing = (user) => {
  const jwtk = jwt.sign({ email: user.email }, process.env.JWT_SECRET, { expiresIn: "2h" });

  return jwtk
};
