// BlogList.jsx (Ready for use)

import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext"; 

const PRIMARY_COLOR = "#5044e5"; 

const BlogList = () => {
    // Hardcoded Categories (as requested, assuming dynamic fetching is broken)
    const STATIC_CATEGORIES = ["All", "technology", "startup", "lifestyle", "finance"]; 

    const [activeCategory, setActiveCategory] = useState("All"); 
    
    // Get blogs and search input from the AppContext
    const { 
        blogs = [], 
        input = '', 
    } = useAppContext(); 
    
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const navigate = useNavigate();

    const categories = STATIC_CATEGORIES;

    // --- Responsive Grid Logic (Unchanged) ---
    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const getGridColumns = useCallback(() => {
        if (windowWidth >= 1280) return "repeat(4, minmax(0, 1fr))"; // xl
        if (windowWidth >= 1024) return "repeat(3, minmax(0, 1fr))"; // lg
        if (windowWidth >= 640) return "repeat(2, minmax(0, 1fr))";  // sm
        return "repeat(1, minmax(0, 1fr))"; // xs
    }, [windowWidth]);

    // --- Filtering Logic (Case-Insensitive Fix) ---
    const filteredBlogs = () => {
        let currentBlogs = blogs;

        // 1. Apply Search Filter
        if (input !== '') {
            currentBlogs = currentBlogs.filter(blog => 
                blog.title.toLowerCase().includes(input.toLowerCase()) || 
                blog.category.toLowerCase().includes(input.toLowerCase())
            );
        }

        // 2. Apply Category Filter (FIX: Case-insensitive comparison)
        if (activeCategory !== "All") {
            currentBlogs = currentBlogs.filter(blog => 
                // CRITICAL FIX: Ensure blog.category exists and compare both in lowercase
                blog.category && blog.category.toLowerCase() === activeCategory.toLowerCase()
            );
        }

        return currentBlogs;
    };


    return (
        <div style={{ margin: "0 2rem", paddingBottom: "6rem" }}>
            {/* CATEGORY FILTER */}
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    gap: "1rem",
                    marginTop: "2.5rem",
                    marginBottom: "2.5rem",
                    flexWrap: "wrap",
                }}
            >
                {categories.map((item, index) => (
                    <div key={index} style={{ position: "relative" }}>
                        {activeCategory === item && (
                            <div
                                style={{
                                    position: "absolute",
                                    left: 0,
                                    right: 0,
                                    top: 0,
                                    height: "1.75rem",
                                    zIndex: 0,
                                    backgroundColor: PRIMARY_COLOR, 
                                    borderRadius: "9999px",
                                }}
                            ></div>
                        )}

                        <button
                            style={{
                                cursor: "pointer",
                                color: activeCategory === item ? "#ffffff" : "#6b7280", 
                                padding: "0.25rem 1rem",
                                border: "none",
                                background: "transparent",
                                fontSize: "1rem",
                                fontWeight: 500,
                                borderRadius: "9999px",
                                position: "relative",
                                zIndex: 1,
                            }}
                            onClick={() => setActiveCategory(item)}
                        >
                            {/* Display name with capitalized first letter */}
                            {item.charAt(0).toUpperCase() + item.slice(1)}
                        </button>
                    </div>
                ))}
            </div>
            {/* END CATEGORY FILTER */}

            {/* Blog Cards Grid */}
            <div
                style={{
                    display: "grid",
                    gap: "2rem",
                    gridTemplateColumns: getGridColumns(),
                }}
            >
                {filteredBlogs().length > 0 ? (
                    filteredBlogs().map((blog) => (
                        <div
                            key={blog._id}
                            onClick={() => navigate(`/blog/${blog._id}`)}
                            style={{
                                width: "100%",
                                borderRadius: "0.5rem",
                                overflow: "hidden",
                                boxShadow: "0 1px 3px rgba(0,0,0,0.1), 0 1px 2px rgba(0,0,0,0.06)",
                                cursor: "pointer",
                                transition: "all 0.3s",
                            }}
                        >
                            <div
                                style={{
                                    width: "100%",
                                    paddingTop: "75%", 
                                    position: "relative",
                                    overflow: "hidden",
                                }}
                            >
                                <img
                                    src={blog.image}
                                    alt={blog.title}
                                    style={{
                                        position: "absolute",
                                        top: 0, left: 0, width: "100%", height: "100%",
                                        objectFit: "cover", 
                                    }}
                                />
                            </div>
                            <div style={{ padding: "1.25rem" }}>
                                <span
                                    style={{
                                        marginLeft: "0.75rem",
                                        marginTop: "1rem",
                                        padding: "0.25rem 0.75rem",
                                        display: "inline-block",
                                        backgroundColor: "rgba(0, 128, 255, 0.2)",
                                        borderRadius: "9999px",
                                        color: "blue", 
                                        fontSize: "0.75rem",
                                        textTransform: "uppercase",
                                        fontWeight: "600"
                                    }}
                                >
                                    {/* Display category from blog data */}
                                    {blog.category ? (blog.category.charAt(0).toUpperCase() + blog.category.slice(1)) : 'UNCATEGORIZED'}
                                </span>
                                <h5
                                    style={{
                                        marginBottom: "0.5rem",
                                        fontWeight: "500",
                                        color: "#111827",
                                        fontSize: "1.125rem",
                                        lineHeight: "1.75rem"
                                    }}
                                >
                                    {blog.title}
                                </h5>
                                <p style={{ color: "#6B7280", fontSize: "1rem" }}>
                                    {/* Sanitize and truncate the description */}
                                    {blog.description?.replace(/<[^>]+>/g, "").slice(0, 80)}...
                                </p>
                            </div>
                        </div>
                    ))
                ) : (
                    <p style={{ gridColumn: "1 / -1", textAlign: "center", fontSize: "1.25rem", color: "#6B7280" }}>
                        No blogs found matching your filters.
                    </p>
                )}
            </div>
        </div>
    );
};

export default BlogList;