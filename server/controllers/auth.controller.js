import UserModel from "../models/user.model.js"
import { getToken } from "../utils/token.js"

export const googleAuth = async (req, res) => {
    try {
        const { name, email } = req.body;
        if (!email) {
            return res.status(400).json({ message: "Email is required for authentication." });
        }

        let user = await UserModel.findOne({ email });
        if (!user) {
            user = await UserModel.create({
                name: name || email.split("@")[0],
                email
            });
        }

        const token = await getToken(user._id);
        if (!token) {
            return res.status(500).json({ message: "Failed to generate authentication token." });
        }

        const isProduction = process.env.NODE_ENV === "production";
        res.cookie("token", token, {
            httpOnly: true,
            secure: isProduction,
            sameSite: isProduction ? "none" : "lax",
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        return res.status(200).json(user);
    } catch (error) {
        console.error("Google Auth Controller Error:", error);
        return res.status(500).json({
            message: error.message || "Google authentication failed on server"
        });
    }
};

export const logOut = async (req, res) => {
    try {
        res.clearCookie("token");
        return res.status(200).json({ message: "LogOut Successfully" });
    } catch (error) {
        console.error("Logout Controller Error:", error);
        return res.status(500).json({ message: error.message || "Logout failed" });
    }
};