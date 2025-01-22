import { ImageResponse } from "next/og";

export const runtime = "edge";

export default async function Image() {
  const logoSrc = await fetch(
    new URL("../../public/favicon.png", import.meta.url),
  ).then((res) => res.arrayBuffer());

  return new ImageResponse(
    (
      <div
        style={{
          background: "#0B0B0B",
        }}
        tw="w-full h-full flex items-center justify-center p-12"
      >
        <div tw="flex flex-col items-center text-center">
          <div tw="flex items-center gap-6 mb-8">
            <img width="96" height="96" src={logoSrc} alt="Logo" />
            <div style={{ color: "#16947D" }} tw="text-8xl font-black">
              Remote Upload
            </div>
          </div>

          <div tw="text-white text-4xl font-bold mb-8">
            Seamless File Sharing & Upload Management
          </div>

          <div style={{ color: "#16947D" }} tw="text-3xl font-extrabold">
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
}
