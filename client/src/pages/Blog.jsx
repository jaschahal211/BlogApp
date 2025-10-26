import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import moment from 'moment';
import Navbar from "../components/Navbar";
import gradientBackground from "../assets/gradientBackground.png";
import Footer from '../components/Footer'
import Loader from '../components/Loader'
import { useAppContext } from "../context/AppContext";
import toast from 'react-hot-toast'; 
// 💡 NEW: Import the user icon asset
import userIcon from "../assets/user_icon.svg"; 

const BlogPage = () => {
    const { id } = useParams();
    const { axios } = useAppContext();
    const navigate = useNavigate();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [comments, setComments] = useState([]);
    const [localComments, setLocalComments] = useState([]);

    const [name, setName] = useState("");
    const [content, setContent] = useState("");

    // Function to fetch the main blog data (Unchanged)
    const fetchBlogData = async () => {
        try {
            const { data } = await axios.get(`/api/blog/blogdata/${id}`);
            data.success ? setData(data.blog) : toast.error(data.message);
        } catch (error) {
            toast.error("Failed to fetch blog. Check API URL and server status.");
            console.error(error);
        }
    };

    // Function to fetch approved comments for the blog (Unchanged)
    const fetchComments = async () => {
        try {
            const { data } = await axios.post('/api/blog/comments', { blogId: id });
            if (data.success) {
                setComments(data.comments);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error("Failed to fetch comments.");
            console.error(error);
        }
    };
    
    // Function to handle comment submission to the backend (Unchanged)
    const addComment = async (e) => { 
        e.preventDefault();
        if (!name || !content) {
            return toast.error("Name and comment content are required.");
        }

        try {
            const { data: response } = await axios.post('/api/blog/add-comment', { 
                blog: id, 
                name, 
                content 
            });

            if (response.success) {
                toast.success(response.message); 
                setName(''); 
                setContent(''); 
                fetchComments(); 
            } else {
                toast.error(response.message); 
            }
        } catch (error) {
            console.error("Comment submission error:", error);
            toast.error("Failed to submit comment. Please try again."); 
        }
    };

    // Primary useEffect to fetch data on component mount/id change (Unchanged)
    useEffect(() => {
        setLoading(true);
        Promise.all([fetchBlogData(), fetchComments()])
            .finally(() => { 
                setLoading(false);
            });
    }, [id]); 

    // LocalStorage useEffect (Unchanged)
    useEffect(() => {
        const savedComments = JSON.parse(localStorage.getItem(`comments_blog_${id}`)) || [];
        setLocalComments(savedComments);
    }, [id]);


    // === RENDERING LOGIC (Loader/Not Found - Unchanged) ===

    if (loading) {
        return (
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100vh",
                    backgroundColor: "#f9fafb",
                }}
            >
                <Loader />
            </div>
        );
    }

    if (!data) {
        return (
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    height: "100vh",
                    backgroundColor: "#f9fafb",
                    color: "#555",
                    textAlign: "center"
                }}
            >
                <Loader />
                <p style={{ marginTop: "1rem", fontSize: "1.1rem" }}>
                    Blog not found. Please check the URL.
                </p>
                <button
                    onClick={() => navigate("/")}
                    style={{
                        marginTop: "1.5rem",
                        backgroundColor: "#4F46E5",
                        color: "#fff",
                        border: "none",
                        borderRadius: "6px",
                        padding: "0.5rem 1rem",
                        cursor: "pointer",
                    }}
                >
                    Back to Home
                </button>
            </div>
        );
    }

    // === STYLE CONSTANTS (Unchanged) ===
    const HEADER_HEIGHT = '900px';
    const Z_INDEX_BACKGROUND = 1;
    const Z_INDEX_CONTENT = 2;
    const BACKGROUND_OPACITY = 0.7;
    const PRIMARY_COLOR = "#4F46E5";
    const GRAY_800 = "#1F2937";

    const displayedComments = [...comments, ...localComments];

    return (
        <div style={{ minHeight: "100vh", backgroundColor: "#FFFFFF", padding: 0, margin: 0 }}>
            {/* Background and Navbar (Unchanged) */}
            <div
                style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: HEADER_HEIGHT,
                    zIndex: Z_INDEX_BACKGROUND,
                    background: `url(${gradientBackground}) no-repeat center center`,
                    backgroundSize: "cover",
                    opacity: BACKGROUND_OPACITY,
                }}
            ></div>

            <Navbar />

            {/* Blog Header (Unchanged) */}
            <div
                style={{
                    position: "relative",
                    zIndex: Z_INDEX_CONTENT,
                    maxWidth: "800px",
                    margin: "0 auto",
                    textAlign: "center",
                    padding: "3rem 1rem",
                }}
            >
                <p style={{ color: PRIMARY_COLOR, paddingTop: '1rem', paddingBottom: '1rem', fontWeight: '500', fontSize: "0.9rem" }}>
                    Published on {moment(data.createdAt).format('MMMM Do YYYY')} 
                </p>

                <h1 style={{ fontSize: "2.5rem", fontWeight: "700", maxWidth: '42rem', margin: '0 auto 1rem auto', color: GRAY_800, lineHeight: "1.2" }}>
                    {data.title}
                </h1>

                {data.subTitle && (
                    <h3 style={{ fontSize: "1.1rem", color: "#6B7280", fontWeight: "400", margin: '1.25rem auto', maxWidth: '36rem', overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>
                        {data.subTitle}
                    </h3>
                )}

                <p style={{ display: 'inline-block', padding: '4px 16px', borderRadius: '9999px', border: `1px solid ${PRIMARY_COLOR}59`, backgroundColor: `${PRIMARY_COLOR}0D`, fontSize: '0.875rem', fontWeight: '500', color: PRIMARY_COLOR }}>
                    {data.author || data.category}
                </p>
            </div>

            {/* Blog Content (Unchanged) */}
            <div style={{ position: "relative", zIndex: Z_INDEX_CONTENT, maxWidth: "900px", margin: "0 auto", padding: "2.5rem 1rem 5rem 1rem", background: "#FFF", borderRadius: "15px", boxShadow: "0 4px 20px rgba(0,0,0,0.08)" }}>
                {data.image && (
                    <img src={data.image} alt={data.title} style={{ width: "100%", height: "auto", maxHeight: "500px", objectFit: "cover", borderRadius: "10px", boxShadow: "0 10px 15px rgba(0,0,0,0.1)", display: "block", margin: "0 auto 2.5rem auto" }} />
                )}
                <div style={{ maxWidth: "700px", margin: "0 auto", lineHeight: "1.8", fontSize: "16px", color: "#292929" }}
                    dangerouslySetInnerHTML={{ __html: data.description }}
                />
            </div>

            {/* Comments Section */}
            <div
                style={{
                    position: "relative",
                    zIndex: 2,
                    maxWidth: "900px",
                    margin: "4rem auto",
                    padding: "3rem 2rem",
                    background: "#FFFFFF",
                    borderRadius: "20px",
                    boxShadow: "0 8px 30px rgba(0,0,0,0.08)",
                }}
            >
                {/* ... Comments Header (Unchanged) ... */}
                <h2
                    style={{
                        fontSize: "2rem",
                        fontWeight: "700",
                        color: "#1F2937",
                        marginBottom: "2rem",
                        textAlign: "center",
                    }}
                >
                    Comments ({displayedComments.length})
                </h2>

                {displayedComments.length === 0 ? (
                    <p
                        style={{
                            color: "#6B7280",
                            textAlign: "center",
                            fontSize: "1rem",
                            marginBottom: "2rem",
                        }}
                    >
                        No comments yet. Be the first to share your thoughts!
                    </p>
                ) : (
                    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                        {displayedComments.map((comment) => (
                            <div
                                key={comment._id}
                                style={{
                                    background: "#F9FAFB",
                                    borderRadius: "14px",
                                    padding: "1.25rem 1.5rem",
                                    boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
                                    border: "1px solid #E5E7EB",
                                    transition: "transform 0.2s ease, box-shadow 0.2s ease",
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = "scale(1.02)";
                                    e.currentTarget.style.boxShadow = "0 6px 18px rgba(0,0,0,0.08)";
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = "scale(1)";
                                    e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.05)";
                                }}
                            >
                                <div style={{ display: "flex", justifyContent: "space-between" }}>
                                    
                                    {/* 💡 CHANGE HERE: Wrap the icon and name in a flex container */}
                                    <h4 style={{ fontWeight: "600", color: "#111827", display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        {/* USER ICON */}
                                        <img 
                                            src={userIcon} 
                                            alt="User Icon" 
                                            style={{ width: '24px', height: '24px', verticalAlign: 'middle', fill: PRIMARY_COLOR }} 
                                        />
                                        {/* USER NAME */}
                                        {comment.name}
                                    </h4>
                                    
                                    <p style={{ color: "#9CA3AF", fontSize: "0.85rem" }}>
                                        {moment(comment.createdAt).fromNow()}
                                    </p>
                                </div>
                                <p
                                    style={{
                                        color: "#374151",
                                        marginTop: "0.75rem",
                                        lineHeight: "1.6",
                                        fontSize: "1rem",
                                    }}
                                >
                                    {comment.content}
                                </p>
                            </div>
                        ))}
                    </div>
                )}

                {/* Add Comment Form (Unchanged) */}
                <form
                    onSubmit={addComment}
                    style={{
                        marginTop: "3rem",
                        background: "#F3F4F6",
                        padding: "2rem",
                        borderRadius: "16px",
                        boxShadow: "0 6px 15px rgba(0,0,0,0.05)",
                    }}
                >
                    {/* ... Form content (Unchanged) ... */}
                    <h3
                        style={{
                            fontSize: "1.5rem",
                            fontWeight: "600",
                            color: "#1F2937",
                            marginBottom: "1.5rem",
                            textAlign: "center",
                        }}
                    >
                        Leave a Comment
                    </h3>

                    <input
                        type="text"
                        placeholder="Your Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        style={{
                            width: "100%",
                            padding: "0.9rem 1rem",
                            borderRadius: "10px",
                            border: "1px solid #D1D5DB",
                            marginBottom: "1.2rem",
                            fontSize: "1rem",
                            outline: "none",
                        }}
                    />

                    <textarea
                        placeholder="Write your comment..."
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        style={{
                            width: "100%",
                            padding: "1rem",
                            borderRadius: "10px",
                            border: "1px solid #D1D5DB",
                            marginBottom: "1.5rem",
                            fontSize: "1rem",
                            minHeight: "120px",
                            resize: "vertical",
                            outline: "none",
                        }}
                    />

                    <button
                        type="submit"
                        style={{
                            background: "linear-gradient(90deg, #4F46E5, #6366F1)",
                            color: "#fff",
                            border: "none",
                            borderRadius: "10px",
                            padding: "0.8rem 2rem",
                            fontSize: "1rem",
                            fontWeight: "600",
                            display: "block",
                            margin: "0 auto",
                            cursor: "pointer",
                            boxShadow: "0 4px 10px rgba(79,70,229,0.3)",
                            transition: "all 0.2s ease",
                        }}
                        onMouseOver={(e) =>
                            (e.target.style.boxShadow = "0 6px 15px rgba(79,70,229,0.5)")
                        }
                        onMouseOut={(e) =>
                            (e.target.style.boxShadow = "0 4px 10px rgba(79,70,229,0.3)")
                        }
                    >
                        Post Comment
                    </button>
                </form>
            </div>


            <Footer />
        </div>
    );
};

export default BlogPage;