import User7 from "../models/User7.model.js";

export const isAdmin = async (req, res, next) => {
    const user = await User7.findById(req.user.id);

    if (!user || user.role !== "admin" || !user.url) {
        return res.status(403).json({ message: "Access denied. Admins only." });
    }

    req.adminUrl = user.url; // Pass the admin's website URL to the request object
    next();
}; 