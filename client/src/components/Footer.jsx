import React from "react";
import { assets } from "../assets/assets";

const footer_data = [
  {
    title: "Quick Links",
    links: ["Home", "Best Sellers", "Offers & Deals", "Contact Us", "FAQs"],
  },
  {
    title: "Need Help?",
    links: [
      "Delivery Information",
      "Return & Refund Policy",
      "Payment Methods",
      "Track your Order",
      "Contact Us",
    ],
  },
  {
    title: "Follow Us",
    links: ["Instagram", "Twitter", "Facebook", "YouTube"],
  },
];

const Footer = () => {
  return (
    <div
      style={{
        backgroundColor: "rgba(79, 70, 229, 0.05)",
        padding: "2.5rem 3rem 0",
        color: "#6B7280",
        fontFamily: "Arial, sans-serif",
        margin: 0,
      }}
    >
      {/* === Top Section === */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          borderBottom: "1px solid rgba(107, 114, 128, 0.3)",
          paddingBottom: "2rem",
          flexWrap: "wrap",
          gap: "2rem",
        }}
      >
        {/* --- Left Side: QuickBlog --- */}
        <div
          style={{
            flex: "2",
            minWidth: "300px",
            maxWidth: "550px",
          }}
        >
          <img
            src={assets.logo}
            alt="logo"
            style={{
              width: "11rem",
              height: "auto",
              marginBottom: "1rem",
            }}
          />
          <p
            style={{
              fontSize: "1rem",
              lineHeight: "1.6",
              color: "#4B5563",
              maxWidth: "420px",
            }}
          >
            QuickBlog is your creative space to write, explore, and connect with
            a community of storytellers. Express freely, think out loud, and let
            your ideas shine across the world.
          </p>
        </div>

        {/* --- Right Side: 3 Columns --- */}
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "flex-start",
            flex: "3",
            gap: "2.5rem",
            marginLeft: "8rem",
            flexWrap: "wrap",
          }}
        >
          {footer_data.map((section, index) => (
            <div
              key={index}
              style={{
                flex: "1",
                minWidth: "150px",
                textAlign: "left",
              }}
            >
              <h3
                style={{
                  fontWeight: "600",
                  fontSize: "1rem",
                  color: "#111827",
                  marginBottom: "0.75rem",
                }}
              >
                {section.title}
              </h3>
              <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                {section.links.map((link, i) => (
                  <li key={i} style={{ marginBottom: "0.4rem" }}>
                    <a
                      href="#"
                      style={{
                        color: "#6B7280",
                        fontSize: "0.875rem",
                        textDecoration: "none",
                        transition: "color 0.3s ease, text-decoration 0.3s ease",
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.textDecoration = "underline";
                        e.target.style.color = "#111827";
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.textDecoration = "none";
                        e.target.style.color = "#6B7280";
                      }}
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* === Bottom Section (Ultra Compact) === */}
      <div
  style={{
    textAlign: "center",
    padding: "0rem",
    fontSize: "0.9rem",
    color: "#6B7280", // gray-500 // light gray border to separate sections
    marginTop: "1rem",
    paddingBottom:"1rem",
  }}
>
  © 2025 QuickBlog. All rights reserved.
</div>

    </div>
  );
};

export default Footer;
