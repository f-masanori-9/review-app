import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "reviMemo",
    short_name: "reviMemo",
    description: "復習ができるメモアプリです。",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#000000",
    icons: [
      {
        src: "/icon512_maskable.png",
        sizes: "512x512",
        type: "image/png",
      },
      {
        src: "/icon512_rounded.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
