require("dotenv").config();

const jwt = require("jsonwebtoken");

const secretKey = process.env.JWT_SECRET_KEY;
const tokenDuration = process.env.JWT_EXPIRES_IN;
const tokenAlgorithm = process.env.JWT_ALGORITHM;

var jwtMiddleware = {
  generateToken: (req, res, next) => {
    const payload = {
      userid: res.locals.userid,
      role: res.locals.role,
      timestamp: new Date(),
    };

    const options = {
      algorithm: tokenAlgorithm,
      expiresIn: tokenDuration,
    };

    const callback = (err, token) => {
      if (err) {
        console.error("Error jwt:", err);
        res.status(500).json(err);
      } else {
        res.locals.token = token;
        next();
      }
    };

    const token = jwt.sign(payload, secretKey, options, callback);
  },
  sendToken: (req, res, next) => {
    res.status(200).json({
      message: res.locals.message,
      token: res.locals.token,
    });
  },
  verifyToken: (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ error: "No token provided" });
    }

    const token = authHeader.substring(7);

    if (!token) {
      return res.status(401).json({ error: "No token provided" });
    }

    const callback = (err, decoded) => {
      if (err) {
        return res.status(401).json({ error: "Invalid token" });
      }

      res.locals.userid = decoded.userid;
      res.locals.role = decoded.role;
      res.locals.tokenTimestamp = decoded.timestamp;

      console.log(res.locals.role);
      next();
    };
    jwt.verify(token, secretKey, callback);
  },
  verifyAdmin: (req, res, next) => {
    res.locals.role = res.locals.role.toLowerCase();
    if (res.locals.role == "admin") {
      next();
    } else {
      return res.status(401).json({ error: "Invalid Access Role" });
    }
  },
};

module.exports = jwtMiddleware;
