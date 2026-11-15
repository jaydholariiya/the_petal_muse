import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./content/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Deep Night & Botanical Shadows
        "ink-aubergine": "#1B1220",
        "midnight-forest": "#10251F",
        "mulberry-wine": "#4A1F3D",

        // Petal Tones & Accents
        "dusty-orchid": "#B78AA8",
        "apricot-blush": "#F4B9A0",
        "peony-rose": "#E58FA0",
        "coral-accent": "#F16B5B",
        "pale-lilac": "#C9B9D9",

        // Garden Greens & Foliage
        fern: "#3F5A45",
        "pistachio-sage": "#B9C9A3",
        "muted-jade": "#668B78",
        "soft-sage": "#C6D3C5",

        // Light & Ambient Glow
        "butter-cream": "#FBF4E6",
        "porcelain-white": "#F7F7F0",
        "marigold-glow": "#E8A93B",
        pearl: "#FFFFFF",
      },
      fontFamily: {
        serif: ["var(--font-cormorant)", "Georgia", "serif"],
        sans: ["var(--font-manrope)", "system-ui", "sans-serif"],
        display: ["var(--font-cormorant)", "Georgia", "serif"],
        script: ["var(--font-italiana)", "var(--font-cormorant)", "serif"],
      },
      animation: {
        "float-slow": "float 8s ease-in-out infinite",
        "float-gentle": "floatGentle 6s ease-in-out infinite",
        "pulse-glow": "pulseGlow 4s ease-in-out infinite",
        "spin-slow": "spin 24s linear infinite",
        "marquee-scroll": "marquee 35s linear infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
          "50%": { transform: "translateY(-14px) rotate(4deg)" },
        },
        floatGentle: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" },
        },
        pulseGlow: {
          "0%, 100%": { opacity: "0.4", transform: "scale(1)" },
          "50%": { opacity: "0.85", transform: "scale(1.08)" },
        },
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      borderRadius: {
        arch: "160px 160px 0 0",
        "arch-full": "240px 240px 240px 240px",
        petal: "0 60% 0 60%",
      },
    },
  },
  plugins: [],
};

export default config;

