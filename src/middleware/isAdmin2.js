import User2 from "../models/User2.model";

export const isAdmin = async (req, res, next) => {
    const user = await User2.findById(req.user.id);

    if (!user || user.role !== "admin" || !user.url) {
        return res.status(403).json({ message: "Access denied. Admins only." });
    }

    req.adminUrl = user.url; // Pass the admin's website URL to the request object
    next();
}; 