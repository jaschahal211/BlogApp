import React, { useState, useEffect } from 'react';
import { useAppContext } from "../../context/AppContext";
import toast from 'react-hot-toast';
import CommentTableItem from "../../components/Admin/CommentTableItem"; // Adjust path as needed

// Constants for styling (assuming you use inline styles or Tailwind in the real file)
const buttonStyle = { padding: '0.5rem 1rem', margin: '0 0.25rem', cursor: 'pointer', border: '1px solid #ccc', borderRadius: '4px' };
const activeButtonStyle = { ...buttonStyle, backgroundColor: '#3b82f6', color: 'white', borderColor: '#3b82f6' };

const Comments = () => {
    // 1. STATE INITIALIZATION (CRITICAL: Must be an array to avoid map() crash)
    const [comments, setComments] = useState([]);
    const [filter, setFilter] = useState('All'); // 'All', 'Approved', or 'Not Approved'
    const [loading, setLoading] = useState(true);
    const { axios } = useAppContext();

    // 2. DATA FETCH FUNCTION
    const fetchComments = async () => {
        setLoading(true);
        try {
            // Backend route: GET /api/admin/comments
            const { data } = await axios.get('/api/admin/comments');
            
            if (data.success) {
                // SUCCESS: Set the comments array
                setComments(data.comments);
            } else {
                // FAILURE: Set comments to empty array and show error
                setComments([]); 
                toast.error(data.message || "Failed to fetch comments.");
            }
        } catch (error) {
            // ERROR: Network or Server failure, set to empty array
            console.error("Error fetching comments:", error);
            setComments([]);
            toast.error("Network or server error loading comments.");
        } finally {
            setLoading(false);
        }
    };

    // 3. EFFECT HOOK to fetch data on mount
    useEffect(() => {
        fetchComments();
    }, []);

    // 4. FILTERING LOGIC
    const filteredComments = comments.filter(comment => {
        if (filter === 'Approved') return comment.isApproved;
        if (filter === 'Not Approved') return !comment.isApproved;
        return true; // 'All'
    });

    return (
        <div style={{ padding: '2rem' }}>
            <h2>Comments</h2>
            
            {/* Filter Buttons */}
            <div style={{ marginBottom: '1.5rem', display: 'flex' }}>
                {['All', 'Approved', 'Not Approved'].map((f) => (
                    <button
                        key={f}
                        onClick={() => setFilter(f)}
                        style={filter === f ? activeButtonStyle : buttonStyle}
                    >
                        {f}
                    </button>
                ))}
            </div>

            {loading ? (
                <p>Loading comments...</p>
            ) : (
                <div style={{ overflowX: 'auto', border: '1px solid #E5E7EB', borderRadius: '8px' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr style={{ backgroundColor: '#F9FAFB' }}>
                                <th style={{ padding: '1rem', textAlign: 'left', color: '#6B7280' }}>Comment Details</th>
                                <th style={{ padding: '1rem', textAlign: 'left', color: '#6B7280' }}>Date Added</th>
                                <th style={{ padding: '1rem', textAlign: 'right', color: '#6B7280' }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* 5. CONDITIONAL RENDERING (CRITICAL to prevent crash) */}
                            {filteredComments.length > 0 ? (
                                filteredComments.map(comment => (
                                    <CommentTableItem 
                                        key={comment._id} 
                                        comment={comment} 
                                        fetchComments={fetchComments} // Pass the refresh function
                                    />
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="3" style={{ textAlign: 'center', padding: '2rem', color: '#6B7280' }}>
                                        No {filter} comments found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default Comments;