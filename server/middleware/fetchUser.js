const jwt = require("jsonwebtoken");

const fetchUser = (req, res, next) => {
  // 1. Token nikalo
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({ error: "Access Denied. No token provided." });
  }

  try {
    // 2. "Bearer " string hatao
    const tokenString = token.startsWith("Bearer ") ? token.slice(7, token.length) : token;

    // 3. Verify karo
    const decoded = jwt.verify(tokenString, process.env.JWT_SECRET);

    console.log("Decoded Token Payload:", decoded); // Console me check karna ye print ho raha hai ya nahi

    // 4. User data attach karo (CRITICAL STEP)
    // Kabhi token { user: { id: 1 } } hota hai, kabhi seedha { id: 1 } hota hai.
    // Hum dono check karenge:
    if (decoded.user) {
        req.user = decoded.user;
    } else {
        req.user = decoded;
    }

    next(); // Agle step (Controller) par jao
  } catch (error) {
    console.error("Token verification failed:", error.message);
    res.status(401).json({ error: "Invalid Token" });
  }
};

module.exports = fetchUser;