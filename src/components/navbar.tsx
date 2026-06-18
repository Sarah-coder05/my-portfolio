"use client";

import React, { useState } from "react";
import { HiMenu, HiX } from "react-icons/hi";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { href: "#about", label: "About" },
    { href: "#projects", label: "Work" },
    { href: "#skills", label: "Skills" },
    { href: "#contact", label: "Contact" },
  ];

  return (
    <nav
      className="fixed top-0 left-0 w-full z-50"
      style={{
        background: "rgba(8, 12, 20, 0.95)",
        backdropFilter: "blur(16px)",
        borderBottom: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      <div
        style={{
          maxWidth: "1300px",
          margin: "0 auto",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "20px 24px",
        }}
      >
        {/* Logo */}
        <a
          href="#home"
          className="font-syne text-[30px] font-extrabold"
          style={{
            color: "#F1F5F9",
            letterSpacing: "-0.5px",
            textDecoration: "none",
          }}
        >
          Uf<span style={{ color: "#4F7FFF" }}>.</span>
        </a>

        {/* Desktop links */}
        <ul
          className="nav-desktop"
          style={{
            gap: "36px",
            listStyle: "none",
            alignItems: "center",
            display: "flex",
          }}
        >
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="font-mono-custom"
                style={{
                  color: "rgba(241,245,249,0.5)",
                  letterSpacing: "2px",
                  textDecoration: "none",
                  fontSize: "11px",
                  textTransform: "uppercase",
                }}
                onMouseEnter={(e) =>
                  ((e.target as HTMLElement).style.color = "#F1F5F9")
                }
                onMouseLeave={(e) =>
                  ((e.target as HTMLElement).style.color =
                    "rgba(241,245,249,0.5)")
                }
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Mobile menu button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="nav-mobile-btn"
          style={{
            color: "#F1F5F9",
            background: "none",
            border: "none",
            cursor: "pointer",
          }}
        >
          {isOpen ? <HiX size={24} /> : <HiMenu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div
          style={{
            borderTop: "1px solid rgba(255,255,255,0.06)",
            padding: "16px 24px 24px",
            display: "flex",
            flexDirection: "column",
            gap: "20px",
          }}
        >
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="font-mono-custom"
              style={{
                color: "rgba(241,245,249,0.5)",
                textDecoration: "none",
                fontSize: "11px",
                textTransform: "uppercase",
                letterSpacing: "2px",
              }}
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}
