import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.svg";
import arrow from "../assets/arrow.svg";
import { useAppContext } from "../context/AppContext";

const Navbar = () => {
  const {navigate,token} = useAppContext();

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between", // logo left, button right
        alignItems: "center",            // vertically center both
        padding: "1rem 2rem",
      }}
    >
      {/* Logo */}
      <img
        src={logo}
        alt="logo"
        style={{ width: "150px", cursor: "pointer" }}
        onClick={() => navigate("/")} // Navigate to home on click
      />

      {/* Login Button */}
      <button
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
          padding: "0.5rem 1.5rem",
          borderRadius: "9999px",
          backgroundColor: "#5044E5",
          color: "white",
          cursor: "pointer",
        }}
        onClick={() => navigate("/admin")} // Navigate to admin on click
      >
        {token ? 'Dashbaord':'Login'}
        <img src={arrow} alt="arrow" style={{ width: "12px" }} />
      </button>
    </div>
  );
};

export default Navbar;
