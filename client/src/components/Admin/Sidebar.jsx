import React from "react";
import { NavLink } from "react-router-dom";

// --- CORRECTED ICON IMPORTS ---
// Assuming these are the paths where your icons are located:
import home_icon from "../../assets/home_icon.svg"; 
import add_icon from "../../assets/add_icon.svg";
// 🆕 ADDED IMPORTS
import list_icon from "../../assets/list_icon.svg"; 
import comment_icon from "../../assets/comment_icon.svg"; 

// --- CONSTANTS ---
const PRIMARY_COLOR_BG = "#4F46E51A"; // Light background for active state
const PRIMARY_COLOR_BORDER = "#4F46E5"; // Accent color for active border
const GRAY_600 = "#4B5563";
const FONT_WEIGHT_ACTIVE = '650';
const FONT_WEIGHT_INACTIVE = '500';

const Sidebar = () => {
    // Reusable style function for NavLink
    const getLinkStyle = ({ isActive }) => ({
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem', 
        padding: '0.2rem 1.5rem', 
        cursor: 'pointer',
        color: isActive ? PRIMARY_COLOR_BORDER : GRAY_600,
        fontWeight: isActive ? FONT_WEIGHT_ACTIVE : FONT_WEIGHT_INACTIVE,
        backgroundColor: isActive ? PRIMARY_COLOR_BG : 'transparent',
        borderRight: isActive ? `4px solid ${PRIMARY_COLOR_BORDER}` : 'none',
        textDecoration: 'none',
        transition: 'background-color 0.15s, color 0.15s'
    });

    return (
        // Sidebar Container
        <div 
            style={{ 
                width: '14rem', 
                minWidth: '14rem',
                minHeight: '100%', 
                backgroundColor: '#fff', 
                boxShadow: '2px 0 5px rgba(0,0,0,0.05)', 
                paddingTop: '0', // Sticking to the top
            }}
        >
            <nav 
                style={{ 
                    display: 'flex', 
                    flexDirection: 'column', 
                    gap: '0.125rem' // Minimal gap between links
                }}
            >
                {/* 1. Dashboard Link (Admin Index) */}
                <NavLink
                    to="/admin"
                    end={true}
                    style={getLinkStyle}
                >
                    <img 
                        src={home_icon} 
                        alt="Dashboard" 
                        style={{ minWidth: '1.25rem', width: '1.25rem' }} 
                    />
                    <p>Dashboard</p>
                </NavLink>

                {/* 2. Add Blog Link */}
                <NavLink
                    to="addBlog"
                    style={getLinkStyle}
                >
                    <img 
                        src={add_icon} 
                        alt="Add Blog" 
                        style={{ minWidth: '1.25rem', width: '1.25rem' }} 
                    />
                    <p>Add Blog</p>
                </NavLink>
                
                {/* 3. 🆕 Blog Lists Link */}
                <NavLink
                    to="listBlog"
                    style={getLinkStyle}
                >
                    <img 
                        src={list_icon} 
                        alt="Blog Lists" 
                        style={{ minWidth: '1.25rem', width: '1.25rem' }} 
                    />
                    <p>List Blog</p>
                </NavLink>

                {/* 4. 🆕 Comments Link */}
                <NavLink
                    to="comments"
                    style={getLinkStyle}
                >
                    <img 
                        src={comment_icon} 
                        alt="Comments" 
                        style={{ minWidth: '1.25rem', width: '1.25rem' }} 
                    />
                    <p>Comments</p>
                </NavLink>
                
            </nav>
        </div>
    );
};

export default Sidebar;