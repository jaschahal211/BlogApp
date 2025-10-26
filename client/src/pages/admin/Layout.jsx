import React from "react";
import { useNavigate, Outlet } from "react-router-dom";
// Assuming these paths are now correct and resolvable in your environment
import logo from '../../assets/logo.svg';
import Sidebar from "../../components/Admin/Sidebar";
import { useAppContext } from "../../context/AppContext";

const BORDER_COLOR = '#e0e0e0';

const Layout = () => {
  const {axios,setToken,navigate}= useAppContext();

  const logout = () => {
    localStorage.removeItem('token');
    axios.defaults.headers.common['Authorization']=null;
    setToken(null)
    navigate('/');
  };

  return (
    // Main App Container: Ensure it takes full viewport height and flows vertically
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#F9FAFB' }}>
      
      {/* 1. Navbar (Header) - PRESERVED AS YOU PROVIDED */}
      <header
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '0.5rem 2rem',
          backgroundColor: '#fff',
        }}
      >
        {/* Smaller Logo */}
        <img
          src={logo}
          alt="Logo"
          style={{
            height: '30px', // smaller than logout button
            cursor: 'pointer',
          }}
          onClick={() => navigate('/')}
        />

        <button
          style={{
            fontSize: '0.875rem',
            padding: '0.5rem 2rem', // height ~40px
            backgroundColor: '#4F46E5',
            color: '#fff',
            borderRadius: '9999px',
            cursor: 'pointer',
            border: 'none',
          }}
          onClick={logout}
        >
          Logout
        </button>
      </header>

      {/* Thin horizontal gray line - PRESERVED AS YOU PROVIDED */}
      <div style={{ height: '1px', backgroundColor: BORDER_COLOR, width: '100%' }} />

      {/* 2. Main Content Area (Sidebar + Outlet) - CRITICAL FIX */}
      {/* Use flex to place sidebar and content side-by-side. flex-grow: 1 ensures it fills the remaining vertical space. */}
      <div style={{ display: 'flex', flexGrow: 1 }}>
        
        {/* A. Sidebar */}
        <Sidebar/>
        
        {/* B. Dynamic Content (Dashboard, AddBlog, etc.) */}
        <main style={{ flexGrow: 1, overflowY: 'auto' }}>
            {/* The Outlet does not need extra padding/wrapping here, as Dashboard.jsx already has its own padding */}
            <Outlet />
        </main>
      </div>

    </div>
  );
};

export default Layout;