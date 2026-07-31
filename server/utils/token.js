import jwt from "jsonwebtoken"

export const getToken = async (userId) => {
    try {
        const secret = process.env.JWT_SECRET || "examnotes_ai_secure_jwt_secret_key_2026_x89f";
        const token = jwt.sign({ userId }, secret, { expiresIn: "7d" });
        return token;
    } catch (error) {
        console.error("JWT Sign Error:", error);
        throw error;
    }
};