import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        pulse: {
          bg: "#030303",
          panel: "#121214",
          text: "#f5f5f2",
          muted: "#a3a3a3",
          silver: "#d7d7d2",
          volt: "#d9ff66",
          cyan: "#8fe7ff"
        }
      },
      borderRadius: {
        pulse: "8px"
      },
      boxShadow: {
        glow: "0 0 46px rgba(255,255,255,.08)",
        panel: "0 24px 80px rgba(0,0,0,.42)"
      }
    }
  },
  plugins: []
};

export default config;

