import React, { useState, useEffect } from 'react';
// Import BlogTableItem and AppContext/toast as seen in screenshots
import BlogTableItem from '../../components/Admin/BlogTableItem';
import { useAppContext } from '../../context/AppContext'; // Assuming useAppContext provides axios
import toast from 'react-hot-toast'; // Assuming this is the toast library used

// --- CONSTANTS ---
const GRAY_500 = '#6B7280'; // Header text
const GRAY_700 = '#374151'; // Main text

// Remove MOCK_ALL_BLOGS_DATA as we're now fetching real data

const BlogList = () => {
    // Renamed 'allBlogs' to 'blogs' to match the state name in the screenshot (line 9: const [blogs, setBlogs] = useState([]);)
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    
    // Get the axios instance from the custom hook, as seen in the screenshot (line 10: const [axios] = useAppContext();)
    const { axios } = useAppContext(); 

    // This function now fetches all blogs from the API
    const fetchBlogs = async () => {
        setLoading(true); // Set loading to true before the API call
        try {
            // API call as seen in the screenshot (line 14)
            const { data } = await axios.get('/api/admin/blogs');
            
            // Success check and state update as seen in the screenshot (lines 15-16)
            if (data.success) {
                setBlogs(data.blogs); 
            } else {
                // Error toast for non-successful response (line 18)
                toast.error(data.message);
            }
        } catch (error) {
            // Error toast for network/request errors (line 21)
            // Use a fallback message if error.message is not available
            toast.error(error.response?.data?.message || error.message || "Failed to fetch blogs.");
        } finally {
            setLoading(false); // Set loading to false after the call finishes
        }
    };

    // useEffect to run the fetchBlogs once on component mount
    useEffect(() => {
        fetchBlogs();
    }, []);

    // --- Styles for the Table Header ---
    const tableHeaderStyle = {
        textAlign: 'left',
        textTransform: 'uppercase',
        fontSize: '0.75rem', 
        fontWeight: '600',
        color: GRAY_500,
        padding: '0.5rem 0.5rem', 
    };
    
    // --- Main Layout Styles ---
    const listContainerStyle = { 
        flexGrow: 1, 
        padding: '2.5rem', 
        backgroundColor: '#F9FAFB', 
        minHeight: '100vh' 
    };

    if (loading) {
        return <div style={{...listContainerStyle, textAlign: 'center', paddingTop: '5rem'}}>Loading Blogs...</div>;
    }

    return (
        <div style={listContainerStyle}>
            
            {/* Page Header */}
            <h2 style={{ fontSize: '1.25rem', fontWeight: '600', color: GRAY_700, marginBottom: '1.5rem' }}>
                All blogs
            </h2>

            {/* Table Container */}
            <div 
                style={{
                    position: 'relative',
                    overflowX: 'auto',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.1), 0 1px 2px rgba(0,0,0,0.06)',
                    borderRadius: '0.5rem',
                    backgroundColor: '#fff',
                }}
            >
                <table style={{ width: '100%', minWidth: '768px', borderCollapse: 'collapse' }}>
                    
                    {/* Table Header */}
                    <thead>
                        <tr style={{ borderBottom: '1px solid #E5E7EB', backgroundColor: '#F9FAFB' }}>
                            <th scope="col" style={{...tableHeaderStyle, width: '5%', textAlign: 'center' }}>#</th>
                            <th scope="col" style={{...tableHeaderStyle, width: '45%' }}>Blog Title</th>
                            <th scope="col" style={{...tableHeaderStyle, width: '15%' }}>Date</th>
                            <th scope="col" style={{...tableHeaderStyle, width: '15%' }}>Status</th>
                            <th scope="col" style={{...tableHeaderStyle, width: '20%' }}>Actions</th>
                        </tr>
                    </thead>
                    
                    {/* Table Body - Reusing BlogTableItem */}
                    <tbody>
                        {/* Use 'blogs' state instead of 'allBlogs' */}
                        {blogs.map((blog, index) => (
                            <BlogTableItem 
                                key={blog._id} 
                                blog={blog}
                                // Pass fetchBlogs so actions (unpublish/delete) can refresh the list
                                fetchBlogs={fetchBlogs} 
                                index={index + 1}
                            />
                        ))}
                    </tbody>
                </table>
                
                {/* Fallback for no blogs */}
                {blogs.length === 0 && (
                    <div style={{ padding: '1rem', color: GRAY_500, fontStyle: 'italic', textAlign: 'center' }}>
                         No blogs found.
                    </div>
                )}
            </div>
        </div>
    );
};

export default BlogList;