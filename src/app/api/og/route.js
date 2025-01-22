import { ImageResponse } from "next/og";

// Route segment config
export const runtime = "edge";

export const contentType = "image/png";

// Image generation
export async function GET() {
  try {
    // Load and encode the favicon
    const favicon = await fetch(
      new URL("../../../../public/favicon.png", import.meta.url),
    ).then((res) => res.arrayBuffer());

    return new ImageResponse(
      (
        <div
          style={{
            background: "#0B0B0B",
          }}
          tw="w-full h-full p-8 flex items-center justify-center relative"
        >
          {/* Add a subtle pattern of upload icons in the background */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              opacity: 0.1,
              display: "flex",
              flexWrap: "wrap",
              gap: "2rem",
              padding: "2rem",
            }}
          >
            {Array(20)
              .fill("↑")
              .map((_, i) => (
                <span key={i} style={{ color: "#16947D", fontSize: "24px" }}>
                  ↑
                </span>
              ))}
          </div>

          <div tw="flex flex-col items-center text-center">
            {/* Logo and title container */}
            <div tw="flex items-center gap-4 mb-4">
              <img
                width="64"
                height="64"
                src={favicon}
                alt="Remote Upload Logo"
              />
              <div style={{ color: "#16947D" }} tw="text-6xl font-bold ml-4">
                Remote Upload
              </div>
            </div>
            <div tw="text-white/80 text-2xl font-medium">
              Seamless File Sharing & Upload Management
            </div>
            <div style={{ color: "#16947D" }} tw="mt-6 text-xl">
              Fast • Secure • Simple
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      },
    );
  } catch (e) {
    console.error(e);
    return new Response("Failed to generate OG Image", { status: 500 });
  }
}
