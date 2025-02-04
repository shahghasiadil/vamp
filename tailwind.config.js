const { colors } = require("tailwindcss/colors")
const { fontFamily } = require("tailwindcss/defaultTheme")
const plugin = require("tailwindcss/plugin")
/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./app/**/*.{ts,tsx}",
        "./components/**/*.{ts,tsx}",
        "./ui/**/*.{ts,tsx}",
        "./content/**/*.{md,mdx}",
    ],
    future: {
        hoverOnlyWhenSupported: true,
    },
    theme: {
        container: {
            center: true,
            padding: "1.5rem",
            screens: {
                lg: "1024px",
            },
        },
        extend: {
            fontFamily: {
                display: ["var(--font-satoshi)", "system-ui", "sans-serif"],
                default: ["var(--font-inter)", "system-ui", "sans-serif"],
            },
            colors: {
                ...colors,
                appbg: "#14141b",
                toolbar: "#161721",
                palette: {
                    100: "#232530",
                    150: "#1e1e26",
                    200: "#22222e",
                    300: "#2b2b3c",
                    400: "#1c1d25",
                    500: "#161620",
                    600: "#14141b",
                },
                brandtext: {
                    200: "#eaebfc",
                    300: "#c8c9d9",
                    400: "#c8c9d9",
                    500: "#eaebfc",
                    600: "#a6aec7",
                    700: "#737388",
                },
                primary: "#eaebfc",
                secondary: "#7a7895",
                "secondary-button": "rgb(41, 42, 53)",
                raised: "#1b1d25",
                "secondary-border": "#262639",
                "raised-border": "#2b2b3c",
                default: "#eaebfc",
                placeholder: "#3c3e58",
            },
            animation: {
                // Tooltip
                "slide-up-fade":
                    "slide-up-fade 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
                "slide-down-fade":
                    "slide-down-fade 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
            },
            keyframes: {
                // Tooltip
                "slide-up-fade": {
                    "0%": { opacity: 0, transform: "translateY(6px)" },
                    "100%": { opacity: 1, transform: "translateY(0)" },
                },
                "slide-down-fade": {
                    "0%": { opacity: 0, transform: "translateY(-6px)" },
                    "100%": { opacity: 1, transform: "translateY(0)" },
                },
            },
        },
    },
    plugins: [
        require("@tailwindcss/typography"),
        require("@tailwindcss/line-clamp"),
        require("@tailwindcss/forms"),
        require("tailwindcss-animate"),
        plugin(({ addVariant }) => {
            addVariant("radix-side-top", '&[data-side="top"]')
            addVariant("radix-side-bottom", '&[data-side="bottom"]')
        }),
    ],
}
