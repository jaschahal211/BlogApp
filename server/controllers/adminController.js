import jwt from 'jsonwebtoken';
import Blog from '../models/Blog.js';
import Comment from '../models/Comment.js';

// Handles admin login request
export const adminlogin = async (req, res) => {
    try {
        const { email, password } = req.body; // Extract email and password from the request body

        // Check if the provided credentials match the environment variables
        if (email !== process.env.ADMIN_EMAIL || password !== process.env.ADMIN_PASSWORD) {
            // Return an error if credentials do not match
            return res.json({ success: false, message: "Invalid Credentials" });
        }

        // Generate a JWT token on successful login
        // The token payload includes the email
        const token = jwt.sign({ email }, process.env.JWT_SECRET);
        
        // Return success status and the token to the client
        res.json({ success: true, token });

    } catch (error) {
        // Log the error and send a generic failure message
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

export const getAllBlogsAdmin = async (req, res) => {
    try {
        // Find all blogs (regardless of publish status) and sort by creation date
        const blogs = await Blog.find({}).sort({createdAt:-1});
        res.json({ success: true, blogs });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}

// === 7. GET ALL COMMENTS FOR ADMIN DASHBOARD (READ) ===
export const getAllComments = async (req, res) => {
    try {
        // Find all comments, populate the 'blog' field to get blog data, and sort
        const comments = await Comment.find({}).populate("blog").sort({createdAt:-1});
        res.json({ success: true, comments });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}

export const getDashboard = async (req, res) => {
    try {
        const recentBlogs = await Blog.find({}).sort({ createdAt: -1 }).limit(5); // Gets 5 most recent blogs
        const blogs = await Blog.countDocuments(); // Gets the total count of all blogs
        const comments = await Comment.countDocuments(); // Gets the total count of all comments
        const drafts = await Blog.countDocuments({ isPublished: false }); // Gets the count of unpublished (draft) blogs

        const dashboardData = {
            blogs,
            comments,
            drafts,
            recentBlogs
        };

        res.json({ success: true, dashboardData });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}
export const deleteCommentById = async (req, res) => {
    try {
        const { id } = req.body;
        await Comment.findByIdAndDelete(id);
        res.json({ success: true, message: "Comment deleted successfully" });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}
export const approveCommentById = async (req, res) => {
    try {
        const { id } = req.body;
        // Find the comment by ID and set isApproved to true
        await Comment.findByIdAndUpdate(id, { isApproved: true });
        res.json({ success: true, message: "Comment approved successfully" });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}