import jwt from "jsonwebtoken";

export const generateToken = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  res.cookie("jwt", token, {
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in ms
    httpOnly: true, // JS on the frontend can't read this cookie — blocks XSS token theft
    sameSite: "strict", // blocks CSRF by not sending cookie on cross-site requests
    secure: process.env.NODE_ENV !== "development", // HTTPS only in production
  });

  return token;
};