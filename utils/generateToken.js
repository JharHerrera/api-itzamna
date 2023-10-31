import jwt from "jsonwebtoken";

export function validateToken(authorizatiion) {

  let token = null;
  if (authorizatiion && authorizatiion.toLowerCase().startsWith("bearer")) {
    token = authorizatiion.substring(7);
  }

  let decodedToken = {};

  try {
    decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
  } catch (error) {
    console.error("error de token: ", error);
  }

  if (!token || !decodedToken.id) {
    return false;
  } else {
    return true;
  }
}
