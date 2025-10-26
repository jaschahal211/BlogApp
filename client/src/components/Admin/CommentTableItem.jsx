import React from 'react';
// IMPORTS ADDED FOR FUNCTIONALITY
import { useAppContext } from "../../context/AppContext";
import toast from 'react-hot-toast';

// --- CONSTANTS ---
const GRAY_700 = '#374151'; // Dark text
const GRAY_500 = '#6B7280'; // Header/Action text
const SUCCESS_COLOR = '#059669'; // Approved text color
const RED_TEXT = '#EF4444'; // Delete button text/icon color

// Assuming comment structure: { _id, blog: { title }, name, content, createdAt, isApproved }
const CommentTableItem = ({ comment, fetchComments }) => {
    // 1. Get axios from context
    const { axios } = useAppContext();
    
    // Safely access data using optional chaining (?. ) for blog
    const { _id, blog, name, content, createdAt, isApproved } = comment;

    // Helper to format the date string (unchanged)
    const formatDate = (dateString) => {
        if (!dateString) return "N/A";
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { 
            day: 'numeric', month: 'long', year: 'numeric' 
        }).replace(/(\d+)(st|nd|rd|th)/, '$1$2');
    };

    // 2. REAL API ACTION HANDLER
    const handleAction = async (action) => {
        
        if (action === 'Delete') {
            if (!window.confirm("Are you sure you want to delete this comment permanently?")) return;
        }

        // Determine endpoint based on action
        // Your backend expects '/api/admin/comment/delete' and '/api/admin/comment/approve'
        const endpoint = action === 'Delete' 
            ? '/api/admin/comment/delete' 
            : '/api/admin/comment/approve';
        
        try {
            // Your backend expects the comment ID in the request body as 'id'
            const { data } = await axios.post(endpoint, { id: _id });

            if (data.success) {
                toast.success(data.message);
                // Refresh the list in the parent component
                fetchComments(); 
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    };
    // --------------------------------------------------


    // --- Inline Styles (Unchanged) ---
    const rowStyle = { borderBottom: '1px solid #E5E7EB', backgroundColor: '#fff', transition: 'background-color 0.15s ease-in-out', };
    const cellStyle = { padding: '1rem', fontSize: '0.875rem', color: GRAY_700, textAlign: 'left', verticalAlign: 'top', };
    const actionCellStyle = { ...cellStyle, textAlign: 'right', minWidth: '8rem', };
    const actionIconStyle = { width: '1.5rem', height: '1.5rem', cursor: 'pointer', transition: 'transform 0.1s', marginRight: '0.75rem', };
    const approveIconStyle = { ...actionIconStyle, color: isApproved ? SUCCESS_COLOR : GRAY_500, opacity: isApproved ? 1 : 0.5, };
    const deleteIconStyle = { ...actionIconStyle, color: RED_TEXT, };
    const detailTextStyle = { fontSize: '0.8rem', color: GRAY_700, lineHeight: '1.4', marginBottom: '0.2rem', };
    const boldDetailStyle = { fontWeight: '500', color: GRAY_500, };


    return (
        <tr 
            style={rowStyle}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#F9FAFB'}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#fff'}
        >
            
            {/* Blog Title & Comment */}
            <td style={{...cellStyle, width: '50%'}}>
                <div style={detailTextStyle}>
                    <b style={boldDetailStyle}>Blog:</b> 
                    {/* CRITICAL: Use optional chaining to prevent crash */}
                    {blog?.title || 'Blog Post Deleted/Unavailable'}
                </div>
                <div style={detailTextStyle}>
                    <b style={boldDetailStyle}>Name:</b> {name}
                </div>
                <div style={{...detailTextStyle, wordBreak: 'break-word', whiteSpace: 'normal'}}>
                    <b style={boldDetailStyle}>Comment:</b> {content}
                </div>
            </td>
            
            {/* Date */}
            <td style={{...cellStyle, width: '25%'}}>
                {formatDate(createdAt)}
            </td>
            
            {/* Actions */}
            <td style={{...actionCellStyle, width: '25%'}}>
                <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                    
                    {/* Approve Icon */}
                    <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        width="24" height="24" viewBox="0 0 24 24" fill="none" 
                        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" 
                        style={approveIconStyle}
                        onClick={() => handleAction('Approve')} // Updated to call API handler
                        onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
                        onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                    >
                        <polyline points="9 11 12 14 22 4"></polyline><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
                    </svg>

                    {/* Delete Icon */}
                    <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        width="24" height="24" viewBox="0 0 24 24" fill="none" 
                        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" 
                        style={deleteIconStyle}
                        onClick={() => handleAction('Delete')} // Updated to call API handler
                        onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
                        onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                    >
                        <polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                    </svg>
                </div>
            </td>
        </tr>
    );
};

export default CommentTableItem;