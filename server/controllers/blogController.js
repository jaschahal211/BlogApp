import fs from 'fs';
import imagekit from '../configs/imageKit.js'; 
import Blog from '../models/Blog.js'; 
import Comment from '../models/Comment.js';
import main from '../configs/gemini.js';

// === 1. ADD NEW BLOG POST (CREATE) ===
export const addBlog = async (req, res) => {
    try {
        // Parse Blog Data and Get Image File from multer fields
        const { title, subTitle, description, category, isPublished } = JSON.parse(req.body.blog);
        const imageFile = req.file;

        // Validation Check
        if (!title || !description || !category || !imageFile) {
            // Cleanup the temporary file created by multer
            if (imageFile) fs.unlinkSync(imageFile.path); 
            return res.json({ success: false, message: "Missing required fields" });
        }

        // Prepare Image for Upload: Read the image file buffer
        const fileBuffer = fs.readFileSync(imageFile.path);

        // Upload Image to ImageKit
        const response = await imagekit.upload({
            file: fileBuffer,
            fileName: imageFile.originalname,
            folder: "/blogs",
        });
        
        // IMPORTANT: Cleanup the temporary file created by multer immediately after reading
        fs.unlinkSync(imageFile.path); 

        // Optimize Image URL (for fast loading)
        const optimizedImageUrl = imagekit.url({
            path: response.filePath,
            transformation: [
                { quality: 'auto' }, // Auto compression
                { format: 'webp' }, // Convert to modern format
                { width: '1280' } // Width resizing
            ]
        });

        // Save Blog to Database
        const image = optimizedImageUrl;
        await Blog.create({ title, subTitle, description, category, image, isPublished });

        // Success Response
        res.json({ success: true, message: "Blog added successfully" });

    } catch (error) {
        // Error Response
        // Note: You should generally log the error for debugging: console.error(error);
        res.json({ success: false, message: error.message });
    }
}

// === 2. GET ALL PUBLISHED BLOGS (READ) ===
export const getAllBlogs = async (req, res) => {
    try {
        // Find all blogs where isPublished is true
        const blogs = await Blog.find({ isPublished: true });
        res.json({ success: true, blogs });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}

// === 3. GET SINGLE BLOG BY ID (READ) ===
// In: ../controllers/blogController.js

export const getBlogById = async (req, res) => {
    // 1. Get the ID from the route parameters.
    // We changed the backend route to use :id, so we use req.params.id
    const { id } = req.params; 

    try {
        // Find the blog in your MongoDB using Mongoose
        // Assuming your Mongoose model is named 'Blog'
        const blog = await Blog.findById(id);

        if (!blog) {
            // 2. If blog is not found, send the expected failure response
            return res.json({
                success: false,
                message: "Blog post not found in the database."
            });
        }

        // 3. If found, send the expected success response
        res.json({
            success: true,
            message: "Blog fetched successfully",
            blog: blog
        });

    } catch (error) {
        // Handle database errors (e.g., invalid MongoDB ID format)
        res.json({
            success: false,
            message: "Error fetching blog data",
            error: error.message
        });
    }
};


// === 4. DELETE BLOG BY ID (DELETE) ===
export const deleteBlogById = async (req, res) => {
    try {
        // CHANGE 'id' to 'blog_id' to match frontend
        const { blog_id } = req.body; 
        await Blog.findByIdAndDelete(blog_id);
        await Comment.deleteMany({blog: blog_id});
        res.json({ success: true, message: 'Blog deleted successfully' });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}

// === 5. TOGGLE PUBLISH STATUS (UPDATE) ===
export const togglePublish = async (req, res) => {
    try {
        // Assuming id is passed in the request body
        const {blog_id } = req.body;
        const blog = await Blog.findById(blog_id);
        
        if (!blog) {
            return res.json({ success: false, message: "Blog not found" });
        }
        
        // Invert the current status
        blog.isPublished = !blog.isPublished;
        await blog.save();
        
        res.json({ success: true, message: 'Blog status updated', isPublished: blog.isPublished });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}
export const addComment = async (req, res) => {
    try {
        const { blog, name, content } = req.body;
        
        // --- Add Comment Saving Logic Here ---
        // Assuming a Comment model exists and has fields for blog (ID), name, and content
        await Comment.create({ 
            blog, // The ID of the blog post this comment belongs to
            name,
            content
            // isApproved field is often added here and set to false for moderation
        }); 
        
        res.json({ success: true, message: "Comment added successfully! Awaiting moderation." });

    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}
export const getBlogComments = async (req, res) => {
    try {
        const { blogId } = req.body;
        const comments = await Comment.find({ blog: blogId, isApproved: true }).sort({ createdAt: -1 });
        res.json({ success: true, comments });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}
export const generateContent=async(req,res)=>{
    try{
        const {prompt}=req.body;
        const content=await main(prompt + ' Generate a blog content for this topic in simple text format')
        res.json({success:true,content})
    }
    catch(error)
    {
        res.json({success:false,message:error.message})
    }
}