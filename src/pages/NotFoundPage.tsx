import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div
      style={{
        width: "100%",
        minHeight: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        gap: "16px",
        background: "linear-gradient(135deg, #0f172a, #020617)",
        color: "#e5e7eb",
        padding: "24px",
      }}
    >
      <div style={{ fontSize: "96px", fontWeight: 700 }}>404</div>

      <p style={{ maxWidth: "420px", color: "#9ca3af" }}>
        The page you are trying to access does not exist or has been moved.
      </p>

      <div style={{ display: "flex", gap: "12px", marginTop: "16px" }}>
        <Link
          to="/trips"
          style={{
            padding: "10px 16px",
            borderRadius: "8px",
            background: "#2563eb",
            color: "#fff",
            textDecoration: "none",
            fontWeight: 500,
          }}
        >
          Go to trips
        </Link>
      </div>
    </div>
  );
}
