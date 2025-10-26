import React from 'react';
// 1. CORRECTED PATH for useAppContext (from '../../..' to '../..')
import { useAppContext } from "../../context/AppContext";
// 2. Import toast for user notifications
import toast from 'react-hot-toast'; 

// --- CONSTANTS ---
const GRAY_700 = '#374151'; // Dark text for titles/data
const GRAY_500 = '#6B7280'; // Header/Action button text
const SUCCESS_COLOR = '#059669'; // Published text color (text-green-600)
const WARNING_COLOR = '#F97316'; // Unpublished text color (text-orange-600)
const LIGHT_SUCCESS_BG = '#D1FAE5'; // Published background color (bg-green-100)
const LIGHT_WARNING_BG = '#FFFBEB'; // Unpublished background color (bg-amber-50)
const LIGHT_RED_BG = '#FEE2E2'; // Delete button background (bg-red-200)
const RED_TEXT = '#EF4444'; // Delete button text/icon color (text-red-500)

// This component renders a single row in the Latest Blogs table.
const BlogTableItem = ({ blog, index, fetchBlogs }) => {
    // Get the axios instance from the context
    const { axios } = useAppContext();

    // Destructure blog properties. We'll use isPublished for dynamic state.
    const { 
        _id, 
        title, 
        createdAt, 
        // Infer isPublished from the status field, assuming 'Published' means true
        isPublished = (blog.status === 'Published' || blog.status === true) 
    } = blog;

    // Helper to format the date string
    const formatDate = (dateString) => {
        if (!dateString) return "N/A";
        const date = new Date(dateString);
        return date.toDateString(); 
    };

    // ----------------------------------------------------
    // API FUNCTIONS
    // ----------------------------------------------------

    // Toggle between Published (true) and Unpublished (false)
    const togglePublish = async () => {
        try {
            const { data } = await axios.post('/api/blog/toggle-publish', { blog_id: _id });
            
            if (data.success) {
                toast.success(data.message);
                await fetchBlogs(); // Refresh the parent list
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || error.message || "Failed to toggle status.");
        }
    };

    // Permanently delete the blog post
    const deleteBlog = async () => {
        // Use a simple window.confirm, since custom modals were not requested
        if (!window.confirm(`Are you sure you want to delete the blog: "${title}"?`)) {
            return;
        }

        try {
            const { data } = await axios.post('/api/blog/delete', { blog_id: _id });
            
            if (data.success) {
                toast.success(data.message);
                await fetchBlogs(); // Refresh the parent list
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || error.message || "Failed to delete blog.");
        }
    };
    
    // ----------------------------------------------------
    // INLINE STYLES (Adjusted for dynamic status)
    // ----------------------------------------------------

    const rowStyle = {
        borderBottom: '1px solid #E5E7EB', 
        backgroundColor: '#fff',
        transition: 'background-color 0.15s ease-in-out',
    };
    const cellStyle = {
        padding: '1rem 0.5rem', 
        fontSize: '0.875rem', 
        color: GRAY_700,
        textAlign: 'left',
        whiteSpace: 'nowrap', 
    };
    const titleCellStyle = {
        ...cellStyle,
        color: '#1F2937', 
        fontWeight: '500', 
    };

    // Dynamic style for the Status badge
    const statusBadgeStyle = {
        display: 'inline-block',
        padding: '0.25rem 0.75rem',
        borderRadius: '0.375rem',
        fontWeight: '600',
        fontSize: '0.75rem',
        backgroundColor: isPublished ? LIGHT_SUCCESS_BG : LIGHT_WARNING_BG,
        color: isPublished ? SUCCESS_COLOR : WARNING_COLOR,
        textTransform: 'capitalize',
    };

    // Dynamic style for the Toggle button
    const actionButtonStyle = {
        padding: '0.5rem 0.75rem',
        borderRadius: '0.375rem',
        // Red border for 'Unpublish', Green border for 'Publish'
        border: `1px solid ${isPublished ? RED_TEXT : SUCCESS_COLOR}`, 
        backgroundColor: '#fff', 
        // Red text for 'Unpublish', Green text for 'Publish'
        color: isPublished ? RED_TEXT : SUCCESS_COLOR, 
        cursor: 'pointer',
        fontWeight: '500',
        fontSize: '0.8rem',
        transition: 'all 0.1s',
        whiteSpace: 'nowrap',
    };
    
    const deleteButtonStyle = {
        padding: '0.5rem 0.5rem', 
        marginLeft: '0.5rem',
        borderRadius: '9999px',
        backgroundColor: LIGHT_RED_BG,
        color: RED_TEXT,
        border: 'none',
        cursor: 'pointer',
        fontWeight: 'bold',
        fontSize: '0.8rem',
        lineHeight: '1',
        transition: 'background-color 0.1s',
        display: 'flex', 
        alignItems: 'center',
        justifyContent: 'center',
    };


    return (
        <tr 
            style={rowStyle}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#F9FAFB'}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#fff'}
        >
            {/* # (Index) */}
            <th scope="row" style={{...cellStyle, width: '5%', textAlign: 'center' }}>
                {index}
            </th>
            
            {/* Blog Title */}
            <td style={{...titleCellStyle, width: '45%' }}>
                {title}
            </td>
            
            {/* Date */}
            <td style={{...cellStyle, width: '15%' }}>
                {formatDate(createdAt)}
            </td>
            
            {/* Status (Dynamic) */}
            <td style={{...cellStyle, width: '15%' }}>
                <span style={statusBadgeStyle}>
                    {isPublished ? 'Published' : 'Unpublished'}
                </span>
            </td>
            
            {/* Actions (Dynamic) */}
            <td style={{...cellStyle, width: '20%' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', gap: '0.75rem' }}>
                    {/* Toggle Publish/Unpublish Button */}
                    <button 
                        style={actionButtonStyle}
                        onClick={togglePublish}
                        onMouseOver={(e) => e.currentTarget.style.backgroundColor = isPublished ? LIGHT_RED_BG : LIGHT_SUCCESS_BG}
                        onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#fff'}
                    >
                        {isPublished ? 'Unpublish' : 'Publish'}
                    </button>
                    
                    {/* Delete Icon Button */}
                    <button 
                        style={deleteButtonStyle}
                        onClick={deleteBlog} // Attach deleteBlog function
                        onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#FCA5A5'}
                        onMouseOut={(e) => e.currentTarget.style.backgroundColor = LIGHT_RED_BG}
                    >
                        &times; 
                    </button>
                </div>
            </td>
        </tr>
    );
};

export default BlogTableItem;
