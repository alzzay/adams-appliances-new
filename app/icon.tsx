import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

// Favicon: brass "A" on espresso — generated at build, no asset file needed.
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%", height: "100%", display: "flex",
          alignItems: "center", justifyContent: "center",
          background: "#17110c", color: "#d8a94a",
          fontSize: 44, fontWeight: 800, borderRadius: 12,
        }}
      >
        A
      </div>
    ),
    { ...size }
  );
}
