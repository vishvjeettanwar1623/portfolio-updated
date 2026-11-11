import { ImageResponse } from "next/og";

export const size = {
  width: 32,
  height: 32,
};
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 22,
          background: "#11161b",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 6,
          borderBottom: "3px solid #ff6a1a",
          color: "#cfd4d9",
          fontWeight: 700,
          letterSpacing: "-1px",
        }}
      >
        V
      </div>
    ),
    { ...size }
  );
}
