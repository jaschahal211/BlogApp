import jwt from "jsonwebtoken";

const auth = (req, res, next) => {
    // 1. Get the token from the request headers
    const token = req.headers.authorization; 

    try {
        // 2. Verify the token using the secret key
        jwt.verify(token, process.env.JWT_SECRET); 
        
        // 3. If valid, proceed to the next middleware or route handler
        next(); 

    } catch (error) {
        // 4. If invalid (expired, wrong signature, etc.), send an error response
        res.json({ success: false, message: "Invalid token" }); 
    }
}

export default auth;