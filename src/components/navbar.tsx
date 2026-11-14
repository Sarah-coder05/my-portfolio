"use client";

import React, { useState } from "react";
import { HiMenu, HiX } from "react-icons/hi";
import ThemeToggle from "./ThemeToggle";

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
        background: "var(--nav-bg)",
        backdropFilter: "blur(16px)",
        borderBottom: "1px solid var(--nav-border)",
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
          className="font-heading text-[30px] font-extrabold"
          style={{
            color: "var(--text)",
            letterSpacing: "-0.5px",
            textDecoration: "none",
          }}
        >
          Uf<span style={{ color: "var(--accent)" }}>.</span>
        </a>

        {/* Desktop links + theme toggle */}
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
                className="font-mono-custom text-[var(--muted)] transition-colors duration-200 hover:text-[var(--text)]"
                style={{
                  letterSpacing: "2px",
                  textDecoration: "none",
                  fontSize: "11px",
                  textTransform: "uppercase",
                }}
              >
                {link.label}
              </a>
            </li>
          ))}
          <li>
            <ThemeToggle />
          </li>
        </ul>

        {/* Mobile: theme toggle + menu button */}
        <div className="flex items-center gap-4 md:hidden">
          <ThemeToggle />
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="nav-mobile-btn"
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
            style={{
              color: "var(--text)",
              background: "none",
              border: "none",
              cursor: "pointer",
            }}
          >
            {isOpen ? <HiX size={24} /> : <HiMenu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div
          style={{
            borderTop: "1px solid var(--border)",
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
              className="font-mono-custom text-[var(--muted)] transition-colors duration-200 hover:text-[var(--text)]"
              style={{
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
