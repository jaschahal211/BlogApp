// Newsletter.jsx
import React from "react";

const Newsletter = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column", // flex-col
        alignItems: "center", // items-center
        justifyContent: "center", // justify-center
        textAlign: "center", // text-center
        rowGap: "0.5rem", // space-y-2
        // Significantly reduced top margin (was 4rem)
        marginTop: "0rem", 
        marginBottom: "7rem", 
        padding: "0 1rem", 
      }}
    >
      {/* Heading */}
      <h1
        style={{
          fontSize: "2rem", // Reduced from 2.5rem
          fontWeight: "600", // font-semibold
          color: "#1F2937", 
          marginBottom: "0.5rem",
        }}
      >
        Never Miss a Blog!
      </h1>

      {/* Description */}
      <p
        style={{
          fontSize: "1rem", // Reduced from 1.125rem
          color: "#9CA3AF", 
          paddingBottom: "1rem", // Reduced padding
          maxWidth: "36rem", 
          lineHeight: "1.5", 
        }}
      >
        Subscribe to get the latest blog, new tech, and exclusive news.
      </p>

      {/* Form Container */}
      <form
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          maxWidth: "28rem", 
          width: "100%", 
          height: "3rem", // h-12
        }}
      >
        {/* Input Field */}
        <input
          type="email" 
          placeholder="Enter your email id required"
          required
          style={{
            border: "1px solid #D1D5DB", 
            borderRadius: "0.375rem 0 0 0.375rem",
            borderRight: "none", 
            outline: "none",
            width: "100%",
            height: "100%",
            padding: "0 0.75rem",
            color: "#6B7280",
          }}
        />

        {/* Subscribe Button (Lighter Color) */}
        <button
          type="submit"
          style={{
            height: "100%",
            padding: "0 2rem",
            color: "white", 
            backgroundColor: "#4F46E5",
            border: "none",
            cursor: "pointer",
            transition: "background-color 0.3s ease",
            borderRadius: "0 0.375rem 0.375rem 0",
          }}
        >
          SUBSCRIBE
        </button>
      </form>
    </div>
  );
};

export default Newsletter;