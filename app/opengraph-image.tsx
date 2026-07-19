import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Adams Appliances — Smart Choices, Reliable Repairs";

// Social share image shown when the site is linked on Facebook, iMessage, etc.
export default function OG() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%", height: "100%", display: "flex", flexDirection: "column",
          justifyContent: "center", padding: "80px",
          background: "linear-gradient(135deg, #17110c 60%, #241a11)", color: "#f4f0e8",
        }}
      >
        <div style={{ color: "#d8a94a", fontSize: 30, letterSpacing: 8, marginBottom: 24 }}>
          ADAMS APPLIANCES · PUNCHBOWL, SYDNEY
        </div>
        <div style={{ fontSize: 92, fontWeight: 800, lineHeight: 1.05, letterSpacing: -2 }}>
          Smart Choices,
        </div>
        <div style={{ fontSize: 92, fontWeight: 800, lineHeight: 1.05, letterSpacing: -2, color: "#d8a94a" }}>
          Reliable Repairs.
        </div>
        <div style={{ fontSize: 30, color: "rgba(244,240,232,0.75)", marginTop: 30 }}>
          Factory seconds · Authorised coffee machine repairs · 5.0★ 284+ reviews
        </div>
      </div>
    ),
    { ...size }
  );
}
