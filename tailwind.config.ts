import type { Config } from "tailwindcss";

module.exports = {
  content: ["./app/**/*.{ts,tsx,jsx,js}",
    "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('flowbite/plugin')
  ],
} satisfies Config;
