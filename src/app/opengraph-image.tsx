import { ImageResponse } from "next/og";

export const alt = "Met To Be — Meet. Connect. Choose.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#FAF5EE",
          color: "#231C16",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 24,
            marginBottom: 28,
          }}
        >
          <div
            style={{
              width: 10,
              height: 120,
              borderRadius: 999,
              backgroundColor: "#C4643E",
              transform: "rotate(18deg)",
            }}
          />
          <div
            style={{
              width: 10,
              height: 120,
              borderRadius: 999,
              backgroundColor: "#231C16",
              transform: "rotate(-18deg)",
            }}
          />
        </div>
        <div style={{ display: "flex", fontSize: 96, fontWeight: 700, letterSpacing: 8 }}>
          MET TO BE
        </div>
        <div style={{ display: "flex", gap: 20, marginTop: 40 }}>
          {["MEET.", "CONNECT.", "CHOOSE."].map((word, i) => (
            <div
              key={word}
              style={{
                display: "flex",
                padding: "12px 32px",
                borderRadius: 999,
                fontSize: 30,
                fontWeight: 600,
                letterSpacing: 4,
                backgroundColor: i === 1 ? "#C4643E" : "#231C16",
                color: "#FAF5EE",
              }}
            >
              {word}
            </div>
          ))}
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 48,
            fontSize: 26,
            color: "#5C5248",
          }}
        >
          Too modern for matrimony. Too intentional for dating.
        </div>
      </div>
    ),
    size
  );
}
