// middleware that will give the user from the token
const jwt = require("jsonwebtoken");
require("dotenv").config();

const getUserFromToken = (req, res, next) => {
  // check if the token is in the header
  if (!req.headers.authorization)
    return res.status(401).send({ message: "Token is not supplied." });

  console.log("req.headers.authorization", req.headers.authorization);

  // get the token from the header
  const rawToken = req.headers.authorization;

  // check if the token is in the correct format
  if (rawToken.split(" ")[0] !== "Bearer")
    return res.status(401).send({ message: "Token is not supplied." });

  // get the token from the header
  const token = rawToken.split(" ")[1];

  // get the token from the header and verify it
  if (token) {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    req.body.userId = decodedToken.id;
    next();
  } else {
    res.status(401).send({ message: "Token is not supplied." });
  }
};

module.exports = getUserFromToken;
