import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from "axios";
// 💡 CORRECT: Import useNavigate here
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

axios.defaults.baseURL=import.meta.env.VITE_BASE_URL;

// 1. Create the Context object
const AppContext = createContext();

// 2. The component where useNavigate is safely called
const AppState = ({ children }) => {
    // 💡 FIX: Call the hook safely inside the component function
    const navigate = useNavigate();
    const [token, setToken] = useState(null);
    const [blogs, setBlogs] = useState([]); 
    const [input, setInput] = useState("");

    const fetchBlogs = async () => {
        try {
            const { data } = await axios.get('/api/blog/all');
            data.success ? setBlogs(data.blogs) : toast.error(data.message);
        }
        catch (error) {
            toast.error(error.message);
        }
    }

    useEffect(() => {
        fetchBlogs();
        const token = localStorage.getItem('token');
        if (token) {
            setToken(token);
            // NOTE: You should ensure 'Bearer ' is used if your backend expects it
            axios.defaults.headers.common['Authorization'] = `${token}`; 
        }
    }, []);
    
    const value = { 
        axios, navigate, token, setToken, blogs, setBlogs, input, setInput, fetchBlogs 
        // 💡 NOTE: I added fetchBlogs to the context value for other components (like ListBlog) to use.
    };

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    );
}

// 3. Export the Provider component
export const AppProvider = ({ children }) => {
    // 💡 IMPORTANT: The AppState component MUST be rendered inside 
    // <BrowserRouter> in your root file (e.g., main.jsx) 
    // for useNavigate to work.
    return <AppState children={children} />;
}


// 4. Export a custom hook to consume the Context easily
export const useAppContext = () => {
    return useContext(AppContext);
}