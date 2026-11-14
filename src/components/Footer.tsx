export default function Footer() {
  return (
    <footer
      style={{
        borderTop: "1px solid var(--border)",
        padding: "32px 24px",
        maxWidth: "1200px",
        margin: "0 auto",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexWrap: "wrap",
        gap: "12px",
      }}
    >
      <p
        className="font-mono-custom"
        style={{
          fontSize: "11px",
          color: "var(--muted)",
          letterSpacing: "1px",
        }}
      >
        © {new Date().getFullYear()} Ufedo — Sarah Moses
      </p>
      <p
        className="font-mono-custom"
        style={{
          fontSize: "11px",
          color: "var(--muted)",
          letterSpacing: "1px",
        }}
      >
        Built with Intentionality
      </p>
    </footer>
  );
}
