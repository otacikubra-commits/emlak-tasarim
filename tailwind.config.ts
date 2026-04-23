import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: "#0B1E3F", // koyu lacivert — emlak/finans hissi
          accent: "#D4AF37", // şampanya altın — premium vurgu
          warm: "#E63946", // kırmızı — aciliyet (Haftanın Fırsatı)
          soft: "#F5F1E8", // krem — bilgi kartı arka plan
        },
      },
      fontFamily: {
        display: ["'Playfair Display'", "Georgia", "serif"],
        sans: ["'Inter'", "system-ui", "sans-serif"],
      },
      boxShadow: {
        card: "0 25px 60px -20px rgba(11,30,63,0.45)",
      },
    },
  },
  plugins: [],
};

export default config;
