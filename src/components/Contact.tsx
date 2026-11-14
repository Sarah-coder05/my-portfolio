"use client";

import { useEffect, useRef, useState } from "react";
import { useForm, ValidationError } from "@formspree/react";

export default function Contact() {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLElement>(null);
  const [state, handleSubmit] = useForm("mvgwppyv");

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.15 },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      id="contact"
      style={{ maxWidth: "1200px", margin: "0 auto", padding: "100px 24px" }}
    >
      <div
        style={{
          background: "var(--surface)",
          border: "1px solid var(--border)",
          borderRadius: "16px",
          padding: "clamp(40px, 6vw, 72px)",
          position: "relative",
          overflow: "hidden",
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(30px)",
          transition: "opacity 0.7s ease, transform 0.7s ease",
        }}
      >
        {/* Glow */}
        <div
          style={{
            position: "absolute",
            width: "300px",
            height: "300px",
            background:
              "radial-gradient(circle, var(--glow-1) 0%, transparent 70%)",
            top: "-100px",
            left: "50%",
            transform: "translateX(-50%)",
            pointerEvents: "none",
          }}
        />

        <div className="grid md:grid-cols-2 gap-16 items-start relative">
          {/* Left */}
          <div>
            

            <h2
              className="font-heading font-extrabold mb-4"
              style={{
                fontSize: "clamp(28px, 4vw, 42px)",
                letterSpacing: "-1.5px",
                lineHeight: 1.1,
                color: "var(--text)",
              }}
            >
              Let&apos;s build something.
            </h2>

            <p
              className="mb-10"
              style={{
                color: "var(--muted)",
                fontWeight: 300,
                lineHeight: 1.8,
              }}
            >
              Open to new opportunities, collaborations, and interesting
              problems. Drop a message or reach out directly.
            </p>

            <div
              style={{
                display: "flex",
                flexDirection: "row",
                gap: "24px",
                alignItems: "center",
                flexWrap: "wrap",
              }}
            >
              <a
                href="mailto:ikesarah5@gmail.com"
                className="font-mono-custom block text-sm transition-colors duration-200"
                style={{ color: "var(--accent)", textDecoration: "none" }}
              >
                ikesarah5@gmail.com
              </a>
              <a
                href="https://ng.linkedin.com/in/sarahmoses05"
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono-custom block text-sm transition-colors duration-200"
                style={{ color: "var(--muted)", textDecoration: "none" }}
                onMouseEnter={(e) =>
                  ((e.currentTarget as HTMLElement).style.color =
                    "var(--accent)")
                }
                onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLElement).style.color =
                    "var(--muted)")
                }
              >
                LinkedIn ↗
              </a>
              <a
                href="https://github.com/Sarah-coder05"
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono-custom block text-sm transition-colors duration-200"
                style={{ color: "var(--muted)", textDecoration: "none" }}
                onMouseEnter={(e) =>
                  ((e.currentTarget as HTMLElement).style.color =
                    "var(--accent)")
                }
                onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLElement).style.color =
                    "var(--muted)")
                }
              >
                GitHub ↗
              </a>
            </div>
          </div>

          {/* Right — Form */}
          <div>
            {state.succeeded ? (
              <div
                className="flex items-center justify-center h-full"
                style={{ minHeight: "200px" }}
              >
                <p
                  className="font-mono-custom text-center"
                  style={{ color: "var(--accent)", fontSize: "14px" }}
                >
                  Message sent. I&apos;ll get back to you shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                {[
                  { id: "name", label: "Name", type: "text" },
                  { id: "email", label: "Email", type: "email" },
                ].map((field) => (
                  <div key={field.id}>
                    <label
                      htmlFor={field.id}
                      className="font-mono-custom block mb-2 text-xs uppercase tracking-widest"
                      style={{ color: "var(--muted)" }}
                    >
                      {field.label}
                    </label>
                    <input
                      id={field.id}
                      type={field.type}
                      name={field.id}
                      required
                      className="w-full transition-all duration-200"
                      style={{
                        background: "var(--input-bg)",
                        border: "1px solid var(--border)",
                        borderRadius: "6px",
                        padding: "12px 16px",
                        color: "var(--text)",
                        fontSize: "14px",
                        outline: "none",
                      }}
                      onFocus={(e) =>
                        (e.currentTarget.style.borderColor = "var(--accent)")
                      }
                      onBlur={(e) =>
                        (e.currentTarget.style.borderColor = "var(--border)")
                      }
                    />
                    <ValidationError
                      prefix={field.label}
                      field={field.id}
                      errors={state.errors}
                    />
                  </div>
                ))}

                <div>
                  <label
                    htmlFor="message"
                    className="font-mono-custom block mb-2 text-xs uppercase tracking-widest"
                    style={{ color: "var(--muted)" }}
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    required
                    className="w-full transition-all duration-200 resize-none"
                    style={{
                      background: "var(--input-bg)",
                      border: "1px solid var(--border)",
                      borderRadius: "6px",
                      padding: "12px 16px",
                      color: "var(--text)",
                      fontSize: "14px",
                      outline: "none",
                    }}
                    onFocus={(e) =>
                      (e.currentTarget.style.borderColor = "var(--accent)")
                    }
                    onBlur={(e) =>
                      (e.currentTarget.style.borderColor = "var(--border)")
                    }
                  />
                  <ValidationError
                    prefix="Message"
                    field="message"
                    errors={state.errors}
                  />
                </div>

                <button
                  type="submit"
                  disabled={state.submitting}
                  className="w-full font-medium text-sm transition-all duration-200"
                  style={{
                    background: "var(--accent)",
                    color: "#fff",
                    padding: "14px",
                    borderRadius: "6px",
                    border: "none",
                    cursor: state.submitting ? "not-allowed" : "pointer",
                    opacity: state.submitting ? 0.6 : 1,
                    letterSpacing: "0.5px",
                  }}
                >
                  {state.submitting ? "Sending..." : "Send Message"}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
