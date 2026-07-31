import jwt from "jsonwebtoken"

const isAuth = async (req,res,next) => {
    try {
        let {token} = req.cookies
        if(!token){
            return res.status(400).json({message:"Token is not found"})
        }
        let verifyToken = jwt.verify(token ,process.env.JWT_SECRET )
        if(!verifyToken){
            return res.status(400).json({message:"user doesn't have valid token"})
        }
        req.userId = verifyToken.userId
        next()

    } catch (error) {
        return res.status(401).json({ message: "Authentication failed. Please log in again.", error: error.message });
    }
}
export default isAuth;