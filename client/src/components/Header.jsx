import React, { useRef } from "react"; // Added useRef
import { assets } from '../assets/assets';
import { useAppContext } from '../context/AppContext';

const Header = () => {
    // 1. Context and Ref setup (as seen in your screenshots)
    const { setInput, input } = useAppContext();
    const inputRef = useRef();

    // 2. Handler to run on form submission (Search button click)
    const onSubmitHandler = (e) => {
        e.preventDefault();
        // Set the global context state to the current input value
        setInput(inputRef.current.value);
    };

    // 3. Function to clear search input and reset context state
    const onClear = () => {
        // Reset the global context state
        setInput(''); 
        
        // Clear the actual input field value using the ref
        if (inputRef.current) {
            inputRef.current.value = '';
        }
    };

    return (
        <div
            style={{
                position: "relative",
                margin: "5rem 2rem 2rem 2rem",
                textAlign: "center",
            }}
        >
            {/* Badge Section (Frontend unchanged) */}
            <div
                style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "0.8rem",
                    padding: "0.4rem 1.4rem",
                    marginBottom: "1rem",
                    borderRadius: "9999px",
                    border: "1px solid rgba(80, 68, 229, 0.4)",
                    backgroundColor: "rgba(80, 68, 229, 0.1)",
                    fontSize: "0.9rem",
                    color: "#5044e5",
                    fontWeight: "500",
                }}
            >
                <p style={{ margin: 0 }}>New: AI feature integrated</p>
                <img
                    src={assets.star_icon}
                    alt="star icon"
                    style={{ width: "10px", height: "10px" }}
                />
            </div>

            {/* Heading (Frontend unchanged) */}
            <h1
                style={{
                    fontSize: "1.875rem",
                    fontWeight: 600,
                    lineHeight: "2.25rem",
                    color: "#4b5563",
                }}
            >
                Your Own{" "}
                <span
                    style={{
                        color: "#5044e5",
                    }}
                >
                    Blogging
                </span>{" "}
                <br /> Platform.
            </h1>

            {/* Gradient Background (Frontend unchanged) */}
            <div
                style={{
                    position: "absolute",
                    top: "-10rem",
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: "100%",
                    height: "22rem",
                    background: "linear-gradient(135deg, #5044e5 0%, #a3bffa 100%)",
                    zIndex: -1,
                    opacity: 0.5,
                    borderRadius: "2rem",
                    filter: "blur(60px)",
                }}
            ></div>
            
            {/* Paragraph (Frontend unchanged) */}
            <p
                style={{
                    margin: "1.5rem 0",
                    maxWidth: "42rem",
                    marginLeft: "auto",
                    marginRight: "auto",
                    color: "#6b7280",
                    fontSize: "0.875rem",
                }}
            >
                This is your space to think out loud, to share what matters, and to write
                without filters. Whether it's one word or a thousand, your story starts right here.
            </p>

            {/* Form */}
            <form
                onSubmit={onSubmitHandler} // Use the new submit handler
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    maxWidth: "32rem",
                    marginLeft: "auto",
                    marginRight: "auto",
                    border: "1px solid #d1d5db",
                    backgroundColor: "#ffffff",
                    borderRadius: "0.375rem",
                    overflow: "hidden",
                    padding: "0.25rem", 
                    marginBottom: "1rem" // Added margin below form
                }}
            >
                <input
                    type="text"
                    placeholder="Search for blogs"
                    required
                    ref={inputRef} // Added ref to access input value
                    // value is NOT used here, as the input is uncontrolled via ref (as per your screenshot logic)
                    style={{
                        flex: 1,
                        paddingLeft: "1rem",
                        outline: "none",
                        border: "none",
                        fontSize: "1rem",
                    }}
                />
                
                {/* Search Button (Frontend unchanged) */}
                <button
                    type="submit"
                    style={{
                        backgroundColor: "#5044e5",
                        color: "white",
                        padding: "0.5rem 2rem",
                        margin: "0.375rem",
                        borderRadius: "0.375rem",
                        cursor: "pointer",
                        transition: "all 0.2s ease-in-out",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
                    onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                >
                    Search
                </button>
            </form>
            
            {/* Clear Search Button Section */}
            <div style={{ textAlign: "center", marginTop: "1rem" }}>
                {/* Display the button only if the input context state is not empty */}
                {input && (
                    <button
                        onClick={onClear} // Added onClick handler
                        style={{
                            border: "1px solid #d1d5db",
                            color: "#6b7280",
                            fontWeight: "300",
                            fontSize: "0.75rem", // text-xs
                            padding: "0.25rem 0.75rem", // py-1 px-3
                            borderRadius: "0.25rem", // rounded-sm
                            boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)", // shadow-custom-sm
                            cursor: "pointer",
                            backgroundColor: "#ffffff",
                        }}
                    >
                        Clear Search
                    </button>
                )}
            </div>
        </div>
    );
};

export default Header;