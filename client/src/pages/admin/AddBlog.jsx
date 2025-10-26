import React, { useState, useRef, useEffect } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';
import upload_area from '../../assets/upload_area.svg';
import { useAppContext } from '../../context/AppContext';
import toast from 'react-hot-toast'; 
import {parse} from 'marked' 

// 💥 Component to inject global CSS for the spinner animation 💥
const SpinnerStyle = () => (
    <style jsx global>
        {`
            @keyframes spin {
                0% {
                    transform: rotate(0deg);
                }
                100% {
                    transform: rotate(360deg);
                }
            }
        `}
    </style>
);


const AddBlog = () => {

    const { axios } = useAppContext();
    const [isAdding, setIsAdding] = useState(false);
    // State to manage the loading status for the AI generation button
    const [loading, setLoading] = useState(false); 
    const editorRef = useRef(null);
    // quillRef will hold the Quill instance
    const quillRef = useRef(null); 

    const [image, setImage] = useState(false);
    const [title, setTitle] = useState('');
    const [subTitle, setSubTitle] = useState('');
    const [category, setCategory] = useState('Startup');
    // Using isPublished to control the checkbox state
    const [isPublished, setIsPublished] = useState(false); 

    // 💥 AI CONTENT GENERATION LOGIC 💥
    const generateContent=async()=>{
        // Title is used as the prompt for AI generation
        if(!title) return toast.error('Please enter a title') 
            try{
                setLoading(true)
                // API call to your backend route which then calls the Gemini API
                const{data}=await axios.post('/api/blog/generate',{prompt:title})
                if(data.success)
                {
                    // The AI content (data.content) is assumed to be Markdown, 
                    // so 'marked.parse' converts it to HTML for the Quill editor.
                    quillRef.current.root.innerHTML=parse(data.content)
                }
                else{
                    toast.error(data.message)
                }
        }
        catch(error){
            toast.error(error.message)
        }
        finally{
            setLoading(false)
        }
    }

    const onSubmitHandler = async (e) => {
        e.preventDefault();

        // Basic validation
        if (!image) {
            toast.error("Please upload a thumbnail image.");
            return;
        }

        // Get the HTML content from the Quill editor
        const description = quillRef.current ? quillRef.current.root.innerHTML : '';
        if (description.trim() === '') {
            toast.error("Blog description cannot be empty.");
            return;
        }

        try {
            // Start loading state and prevent multiple submissions
            setIsAdding(true);
            
            // 1. Prepare the blog object to be sent as JSON string
            const blog = {
                title,
                subTitle,
                // The backend expects the HTML content as 'description'
                description: description, 
                category,
                isPublished: isPublished 
            };

            // 2. Create FormData object for multipart/form-data submission (for image)
            const formData = new FormData();
            // Append the blog object as a JSON string
            formData.append('blog', JSON.stringify(blog)); 
            // Append the image file
            formData.append('image', image); 

            // 3. API Call: POST the data to the backend
            const { data } = await axios.post('/api/blog/add', formData);

            // 4. Handle response and cleanup
            if (data.success) {
                toast.success(data.message);
                
                // Clear state upon successful submission
                setTitle('');
                setSubTitle('');
                setImage(false);
                setCategory('Startup'); 
                setIsPublished(false); 
                // Clear Quill editor content
                if (quillRef.current) {
                    quillRef.current.root.innerHTML = '';
                }
            } else {
                toast.error(data.message);
            }

        } catch (error) {
            console.error("Blog submission error:", error);
            toast.error(error.response?.data?.message || 'Failed to add blog. Please try again.');
        } finally {
            // Stop loading state regardless of success or failure
            setIsAdding(false); 
        }
    };

    // Initialize Quill Editor once on mount
    useEffect(() => {
        if (!editorRef.current || quillRef.current) return;

        quillRef.current = new Quill(editorRef.current, {
            theme: 'snow',
            placeholder: 'Start writing your amazing blog content here...',
            modules: {
                toolbar: [
                    [{ header: [1, 2, false] }],
                    ['bold', 'italic', 'underline'],
                    [{ list: 'ordered' }, { list: 'bullet' }],
                    ['link', 'image'],
                    ['clean']
                ]
            }
        });
        
        // Cleanup function for when the component unmounts
        return () => {
            if (quillRef.current) {
                quillRef.current = null;
            }
        };
    }, []);

    return (
        <>
            {/* Inject the global CSS for animation */}
            <SpinnerStyle /> 
            <form
                onSubmit={onSubmitHandler}
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    flexGrow: 1,
                    backgroundColor: '#F3F4F6',
                    height: '100%',
                    overflow: 'auto',
                    paddingBottom: '3rem',
                }}
            >
                <div
                    style={{
                        backgroundColor: 'white',
                        width: '100%',
                        maxWidth: '768px',
                        padding: '2.5rem',
                        margin: '2.5rem auto',
                        boxShadow:
                            '0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06)',
                        borderRadius: '0.5rem',
                    }}
                >
                    {/* Upload Thumbnail */}
                    <p style={{ marginTop: 0, color: '#6B7280', fontSize: '1rem' }}>
                        Upload thumbnail
                    </p>
                    <label htmlFor="image">
                        <img
                            src={image ? URL.createObjectURL(image) : upload_area}
                            alt="Upload Area"
                            style={{
                                marginTop: '0.75rem',
                                height: '7rem',
                                width: '7rem',
                                borderRadius: '0.5rem',
                                cursor: 'pointer',
                                transition: 'transform 0.1s',
                                display: 'block',
                            }}
                        />
                        <input
                            type="file"
                            id="image"
                            hidden
                            required
                            accept="image/*"
                            onChange={(e) => setImage(e.target.files[0])}
                        />
                    </label>

                    {/* Blog Title */}
                    <p
                        style={{
                            marginTop: '1rem',
                            color: '#6B7280',
                            fontSize: '1rem',
                        }}
                    >
                        Blog title
                    </p>
                    <input
                        type="text"
                        placeholder="Type here"
                        required
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        style={{
                            width: '100%',
                            maxWidth: '30rem',
                            padding: '0.6rem',
                            marginTop: '0.5rem',
                            border: '1px solid #D1D5DB',
                            outline: 'none',
                            borderRadius: '0.25rem',
                        }}
                    />

                    {/* Blog Subtitle */}
                    <p
                        style={{
                            marginTop: '1.5rem',
                            color: '#6B7280',
                            fontSize: '1rem',
                        }}
                    >
                        Sub title (Optional)
                    </p>
                    <input
                        type="text"
                        placeholder="Type here"
                        value={subTitle}
                        onChange={(e) => setSubTitle(e.target.value)}
                        style={{
                            width: '100%',
                            maxWidth: '30rem',
                            padding: '0.6rem',
                            marginTop: '0.5rem',
                            border: '1px solid #D1D5DB',
                            outline: 'none',
                            borderRadius: '0.25rem',
                        }}
                    />

                    {/* Blog Description (Quill Editor) */}
                    <p
                        style={{
                            marginTop: '1.75rem',
                            color: '#6B7280',
                            fontSize: '1rem',
                        }}
                    >
                        Blog Description
                    </p>
                    {/* This container has the loading overlay and AI button */}
                    <div className='max-w-lg h-74 pb-16 sm:pb-10 pt-2 relative' 
                            style={{ position: 'relative', maxWidth: '100%', minHeight: '300px', paddingBottom: '40px' }}
                        >
                        <div
                            ref={editorRef}
                            style={{
                                height: '220px',
                                backgroundColor: 'white',
                                border: '1px solid #ccc',
                                borderRadius: '0.25rem',
                            }}
                        ></div>
                        {/* LOADING SPINNER - Now using the 'spin' animation keyframe defined globally */}
                        {loading && (
                            <div 
                                style={{ 
                                    position: 'absolute', 
                                    top: 0, 
                                    right: 0, 
                                    bottom: 0, 
                                    left: 0, 
                                    display: 'flex', 
                                    alignItems: 'center', 
                                    justifyContent: 'center', 
                                    backgroundColor: 'rgba(255, 255, 255, 0.7)',
                                    zIndex: 10
                                }}
                            >
                                <div 
                                    style={{ 
                                        width: '2rem', 
                                        height: '2rem', 
                                        borderRadius: '50%', 
                                        border: '3px solid #ccc', 
                                        borderTopColor: '#4F46E5', 
                                        // 💥 The Fix: Use the defined 'spin' animation 💥
                                        animation: 'spin 1s linear infinite' 
                                    }}
                                ></div>
                            </div>
                        )}

                        {/* AI GENERATION BUTTON */}
                        <button
                            disabled={loading} // Disabled when loading
                            type="button"
                            onClick={generateContent} // Calls the new AI logic
                            style={{
                                position: 'absolute',
                                bottom: '1rem', // Approximate 'bottom-1'
                                right: '0.5rem', // Approximate 'right-2'
                                marginLeft: '0.5rem',
                                fontSize: '0.75rem', // text-xs
                                color: 'white',
                                backgroundColor: loading ? '#6B7280' : 'rgba(0, 0, 0, 0.7)', // bg-black/70
                                padding: '0.375rem 1rem', // px-4 py-1.5
                                borderRadius: '0.25rem', // rounded
                                cursor: loading ? 'not-allowed' : 'pointer',
                                border: 'none',
                                textDecoration: 'none',
                                transition: 'text-decoration 0.2s, background-color 0.2s',
                                zIndex: 20
                            }}
                        >
                            {loading ? 'Generating...' : 'Generate with AI'}
                        </button>
                    </div>

                    {/* Blog Category */}
                    <p
                        style={{
                            marginTop: '1.75rem',
                            color: '#6B7280',
                            fontSize: '1rem',
                        }}
                    >
                        Blog category
                    </p>
                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        style={{
                            width: '100%',
                            maxWidth: '30rem',
                            padding: '0.6rem',
                            marginTop: '0.5rem',
                            border: '1px solid #D1D5DB',
                            outline: 'none',
                            borderRadius: '0.25rem',
                        }}
                    >
                        <option value="Startup">Startup</option>
                        <option value="Technology">Technology</option>
                        <option value="Lifestyle">Lifestyle</option>
                        <option value="Finance">Finance</option>
                        <option value="Other">Other</option>
                    </select>
                    
                    {/* Publish Checkbox */}
                    <div 
                        style={{ 
                            display: 'flex', 
                            alignItems: 'center', 
                            gap: '0.5rem', 
                            marginTop: '1.5rem',
                            color: '#1F2937',
                            fontWeight: '500'
                        }}
                    >
                        <input
                            type="checkbox"
                            checked={isPublished}
                            onChange={(e) => setIsPublished(e.target.checked)}
                            style={{
                                width: '1.25rem',
                                height: '1.25rem',
                                cursor: 'pointer',
                                accentColor: '#4F46E5',
                            }}
                        />
                        <label>
                            Publish Blog Immediately
                        </label>
                    </div>


                    {/* Submit Button */}
                    <div style={{ textAlign: 'center' }}>
                        <button
                            type="submit"
                            disabled={isAdding}
                            style={{
                                backgroundColor: isAdding ? '#A5B4FC' : '#4F46E5',
                                color: 'white',
                                padding: '0.6rem 2.5rem',
                                borderRadius: '9999px',
                                marginTop: '2rem',
                                cursor: isAdding ? 'not-allowed' : 'pointer',
                                border: 'none',
                                fontSize: '1rem',
                                fontWeight: '500',
                                transition: 'background-color 0.2s',
                            }}
                        >
                            {isAdding ? 'Adding...' : 'Add Blog'}
                        </button>
                    </div>
                </div>
            </form>
        </>
    );
};

export default AddBlog;