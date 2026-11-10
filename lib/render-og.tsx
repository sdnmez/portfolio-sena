import { ImageResponse } from "next/og";
import { site } from "@/data/site";

type OgInput = {
  title: string;
  description: string;
  localeLabel: string;
};

export function renderOgImage({ title, description, localeLabel }: OgInput) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: "#e8dfcf",
          color: "#1a1714",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            width: "64%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "64px 56px 56px 72px",
            background:
              "radial-gradient(circle at 90% 8%, rgba(228,87,46,0.22) 0%, rgba(232,223,207,0) 42%), radial-gradient(circle at 0% 100%, rgba(91,108,157,0.18) 0%, rgba(232,223,207,0) 48%), #e8dfcf",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div
              style={{
                width: 46,
                height: 46,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: "2px solid #1a1714",
                borderRadius: 6,
                fontSize: 26,
                fontWeight: 700,
                transform: "rotate(6deg)",
              }}
            >
              S
            </div>
            <div
              style={{
                fontSize: 17,
                letterSpacing: 4,
                textTransform: "uppercase",
                color: "rgba(26,23,20,0.58)",
              }}
            >
              {`${site.name} / Portfolio — Vol. 01`}
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 22, maxWidth: 700 }}>
            <div style={{ fontSize: 82, lineHeight: 0.98, fontWeight: 600, letterSpacing: -3 }}>
              {title}
            </div>
            <div style={{ fontSize: 24, lineHeight: 1.42, color: "rgba(26,23,20,0.66)" }}>
              {description}
            </div>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              borderTop: "1px solid rgba(26,23,20,0.18)",
              paddingTop: 22,
              fontSize: 16,
              color: "rgba(26,23,20,0.58)",
              letterSpacing: 2,
            }}
          >
            <span>{site.email}</span>
            <span>{`${localeLabel} / 2026`}</span>
          </div>
        </div>

        <div
          style={{
            width: "36%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "56px 48px",
            background: "#12100e",
            color: "#f3ece0",
          }}
        >
          <div style={{ display: "flex", justifyContent: "flex-end", fontSize: 14, letterSpacing: 4 }}>
            INK / PAPER
          </div>

          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", flex: 1 }}>
            <div
              style={{
                width: 260,
                height: 260,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 999,
                border: "1px solid rgba(243,236,224,0.22)",
                background: "radial-gradient(circle at 40% 34%, #e4572e 0%, #8f2d1c 62%, #2a1712 100%)",
              }}
            >
              <div
                style={{
                  width: 176,
                  height: 176,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 999,
                  border: "1px dashed rgba(243,236,224,0.5)",
                  color: "#f3ece0",
                  fontSize: 42,
                  letterSpacing: -1,
                }}
              >
                S.
              </div>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontSize: 13,
              letterSpacing: 2,
              color: "rgba(243,236,224,0.55)",
            }}
          >
            <span>SOFTWARE</span>
            <span>ILLUSTRATION</span>
            <span>3D</span>
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    },
  );
}
