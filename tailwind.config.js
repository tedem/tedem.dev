const defaultTheme = require("tailwindcss/defaultTheme");
const colors = require("tailwindcss/colors");

module.exports = {
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    fontFamily: {
      sans: ["Inter var", ...defaultTheme.fontFamily.sans],
      mono: [...defaultTheme.fontFamily.mono],
      system: defaultTheme.fontFamily.sans,
    },
    extend: {
      colors: {
        emerald: colors.emerald,
        fuchsia: colors.fuchsia,
        violet: colors.violet,
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
