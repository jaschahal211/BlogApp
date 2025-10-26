import express from 'express';
import { adminlogin, approveCommentById, deleteCommentById, getAllBlogsAdmin, getAllComments, getDashboard } from '../controllers/adminController.js';
import auth from '../middleware/auth.js';

// Create a new router instance
const adminRouter = express.Router();

// Define the POST route for admin login
adminRouter.post('/login', adminlogin);
adminRouter.get("/comments",auth,getAllComments);
adminRouter.get("/blogs",auth,getAllBlogsAdmin);

// 💡 FIX 1: Rename the route to match the frontend call: /comment/delete
adminRouter.post("/comment/delete",auth,deleteCommentById); 

// 💡 FIX 2: Rename the route to match the frontend call: /comment/approve
adminRouter.post("/comment/approve",auth,approveCommentById);

adminRouter.get("/dashboard",auth,getDashboard);

export default adminRouter;