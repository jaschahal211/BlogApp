import React, { useState, useEffect } from "react";
// 1. ADD NEW IMPORTS: useAppContext and toast (as seen in ListBlog.jsx/Dashboard screenshot)
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

import dashboard_icon_4 from "../../assets/dashboard_icon_4.svg"; 
import BlogTableItem from "../../components/Admin/BlogTableItem"; 

// --- CONSTANTS ---
const PRIMARY_COLOR = "#4F46E5";
const PURPLE_COLOR = "#9333EA";
const INDIGO_COLOR = "#4F46E5"; 
const GRAY_500 = '#6B7280'; 

// MOCK DATA is removed/ignored as we're now fetching data

// --- DashboardIcon Component (Unchanged) ---
const DashboardIcon = ({ color, children }) => (
    <div 
        style={{ 
            backgroundColor: `${color}1A`,
            color: color, 
            padding: '1rem',
            borderRadius: '0.375rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minWidth: '3rem',
            minHeight: '3rem',
        }}
    >
        {children}
    </div>
);

// --- DashboardCard Component (Unchanged) ---
const DashboardCard = ({ iconColor, title, count, children }) => (
    <div 
        style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            backgroundColor: '#fff', 
            padding: '1rem',
            minWidth: '150px',
            flexGrow: 1,
            borderRadius: '0.5rem',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1), 0 1px 2px rgba(0,0,0,0.06)',
            cursor: 'pointer',
            transition: 'transform 0.2s',
        }}
        onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
        onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
    >
        <DashboardIcon color={iconColor}>{children}</DashboardIcon>
        <div>
            <p style={{ fontSize: '1.25rem', fontWeight: '600', color: '#374151' }}>{count}</p>
            <p style={{ color: '#6B7280', fontWeight: '300' }}>{title}</p>
        </div>
    </div>
);

const Dashboard = () => {
    // Get axios instance (as seen in screenshot 172855.jpg)
    const { axios } = useAppContext(); 

    const [dashboardData, setDashboardData] = useState({
        blogs: 0,
        comments: 0,
        drafts: 0,
        recentBlogs: [], 
    });

    // 2. FETCH DASHBOARD DATA FUNCTION (replaces mock fetchBlogs)
    const fetchDashboard = async () => {
        try {
            const { data } = await axios.get('/api/admin/dashboard');

            // Logic from screenshot 172855.jpg (line 20-21)
            if (data.success) {
                // Assuming the data structure is { success: true, dashboardData: { blogs: X, comments: Y, drafts: Z, recentBlogs: [...] } }
                setDashboardData(data.dashboardData);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            // Logic from screenshot 172855.jpg (line 23)
            toast.error(error.message);
        }
    };

    // 3. USE EFFECT to call the new fetch function
    useEffect(() => {
        fetchDashboard();
        // NOTE: Renamed the mock function 'fetchBlogs' to 'fetchDashboard' for clarity.
        // The prop passed to BlogTableItem remains 'fetchBlogs' to refresh the list, 
        // which must now be an alias of fetchDashboard.
    }, [axios]); // Dependency on axios for robustness

    // Alias the API function for use in the BlogTableItem child component
    const fetchBlogs = fetchDashboard;
    
    // --- Styles for the Table Header (Unchanged) ---
    const tableHeaderStyle = {
        textAlign: 'left',
        textTransform: 'uppercase',
        fontSize: '0.75rem', 
        fontWeight: '600',
        color: GRAY_500,
        padding: '0.5rem 0.5rem', 
    };

    return (
        <div style={{ flexGrow: 1, padding: '2.5rem', backgroundColor: '#F9FAFB', minHeight: '100vh' }}>
            
            {/* Counter Cards Section */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginBottom: '2.5rem' }}> 
                <DashboardCard title="Blogs" count={dashboardData.blogs} iconColor={PRIMARY_COLOR}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"/><path d="M16 4h3a2 2 0 0 1 2 2v14"/><path d="M2 15h4"/><path d="M2 9h4"/><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6a2 2 0 0 0 2 2h6"/></svg>
                </DashboardCard>
                <DashboardCard title="Comments" count={dashboardData.comments} iconColor={PURPLE_COLOR}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                </DashboardCard>
                <DashboardCard title="Drafts" count={dashboardData.drafts} iconColor={INDIGO_COLOR}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 3a2.85 2.85 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"/></svg>
                </DashboardCard>
            </div>

            {/* Latest Blogs Heading */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '1rem 0', marginTop: '1.5rem', color: '#374151' }}>
                <img src={dashboard_icon_4} alt="Latest Blogs" width="24" height="24" />
                <p style={{ fontWeight: '600', fontSize: '1.125rem' }}>Latest Blogs</p>
            </div>

            {/* Table Structure (Unchanged) */}
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
                    
                    {/* Table Header (Unchanged) */}
                    <thead>
                        <tr style={{ borderBottom: '1px solid #E5E7EB', backgroundColor: '#F9FAFB' }}>
                            <th scope="col" style={{...tableHeaderStyle, width: '5%', textAlign: 'center' }}>#</th>
                            <th scope="col" style={{...tableHeaderStyle, width: '45%' }}>Blog Title</th>
                            <th scope="col" style={{...tableHeaderStyle, width: '15%' }}>Date</th>
                            <th scope="col" style={{...tableHeaderStyle, width: '15%' }}>Status</th>
                            <th scope="col" style={{...tableHeaderStyle, width: '20%' }}>Actions</th>
                        </tr>
                    </thead>
                    
                    {/* Table Body - Mapped from State */}
                    <tbody>
                        {dashboardData.recentBlogs.map((blog, index) => (
                            <BlogTableItem 
                                key={blog._id} 
                                blog={blog}
                                // The fetchBlogs prop is now an alias for fetchDashboard
                                fetchBlogs={fetchBlogs} 
                                index={index + 1}
                            />
                        ))}
                    </tbody>
                </table>
                
                {/* Fallback for no blogs */}
                {dashboardData.recentBlogs.length === 0 && (
                    <div style={{ padding: '1rem', color: '#6B7280', fontStyle: 'italic', textAlign: 'center' }}>
                         No recent blogs found.
                    </div>
                )}
            </div>
        </div>
    );
};

export default Dashboard;