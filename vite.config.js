import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      includeAssets: [
        "/assets/icon/512.png",
        "/assets/icon/1024.png",
        "robots.txt"
      ],
      manifest: {
        name: "Jogo da Memória | Por Daniel Cordeiro",
        short_name: "Jogo da Memória",
        description: "Jogo da Memória desenvolvido por Daniel Cordeiro com o proposito de aplicar conhecimentos de programação.",
        theme_color: "#212121",
        icons: [
          {
            src: "/assets/icon/16.png",
            sizes: "16x16",
            type: "image/png",
          },
          {
            src: "/assets/icon/20.png",
            sizes: "20x20",
            type: "image/png",
          },
          {
            src: "/assets/icon/29.png",
            sizes: "29x29",
            type: "image/png",
          },
          {
            src: "/assets/icon/32.png",
            sizes: "32x32",
            type: "image/png",
          },
          {
            src: "/assets/icon/40.png",
            sizes: "40x40",
            type: "image/png",
          },
          {
            src: "/assets/icon/48.png",
            sizes: "48x48",
            type: "image/png",
          },
          {
            src: "/assets/icon/50.png",
            sizes: "50x50",
            type: "image/png",
          },
          {
            src: "/assets/icon/55.png",
            sizes: "55x55",
            type: "image/png",
          },
          {
            src: "/assets/icon/57.png",
            sizes: "57x57",
            type: "image/png",
          },
          {
            src: "/assets/icon/58.png",
            sizes: "58x58",
            type: "image/png",
          },
          {
            src: "/assets/icon/60.png",
            sizes: "60x60",
            type: "image/png",
          },
          {
            src: "/assets/icon/64.png",
            sizes: "64x64",
            type: "image/png",
          },
          {
            src: "/assets/icon/66.png",
            sizes: "66x66",
            type: "image/png",
          },
          {
            src: "/assets/icon/72.png",
            sizes: "72x72",
            type: "image/png",
          },
          {
            src: "/assets/icon/76.png",
            sizes: "76x76",
            type: "image/png",
          },
          {
            src: "/assets/icon/80.png",
            sizes: "80x80",
            type: "image/png",
          },
          {
            src: "/assets/icon/87.png",
            sizes: "87x87",
            type: "image/png",
          },
          {
            src: "/assets/icon/88.png",
            sizes: "88x88",
            type: "image/png",
          },
          {
            src: "/assets/icon/92.png",
            sizes: "92x92",
            type: "image/png",
          },
          {
            src: "/assets/icon/100.png",
            sizes: "100x100",
            type: "image/png",
          },
          {
            src: "/assets/icon/102.png",
            sizes: "102x102",
            type: "image/png",
          },
          {
            src: "/assets/icon/114.png",
            sizes: "114x114",
            type: "image/png",
          },
          {
            src: "/assets/icon/120.png",
            sizes: "120x120",
            type: "image/png",
          },
          {
            src: "/assets/icon/128.png",
            sizes: "128x128",
            type: "image/png",
          },
          {
            src: "/assets/icon/144.png",
            sizes: "144x144",
            type: "image/png",
          },
          {
            src: "/assets/icon/152.png",
            sizes: "152x152",
            type: "image/png",
          },
          {
            src: "/assets/icon/167.png",
            sizes: "167x167",
            type: "image/png",
          },
          {
            src: "/assets/icon/172.png",
            sizes: "172x172",
            type: "image/png",
          },
          {
            src: "/assets/icon/180.png",
            sizes: "180x180",
            type: "image/png",
          },
          {
            src: "/assets/icon/196.png",
            sizes: "196x196",
            type: "image/png",
          },
          {
            src: "/assets/icon/216.png",
            sizes: "216x216",
            type: "image/png",
          },
          {
            src: "/assets/icon/256.png",
            sizes: "256x256",
            type: "image/png",
          },
          {
            src: "/assets/icon/512.png",
            sizes: "512x512",
            type: "image/jpeg",
            purpose: "any maskable",
          },
          {
            src: "/assets/icon/1024.png",
            sizes: "1024x1024",
            type: "image/jpeg",
            purpose: "any maskable",
          },
        ],
      },
      workbox: {
        cleanupOutdatedCaches: false,
      },
    }),
  ],
});
