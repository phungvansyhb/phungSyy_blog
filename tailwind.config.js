/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {},
        screens: {
            tablet: { max: "875px" },
            mobile: { max: "475px" },
        },
    },
    plugins: [require("@tailwindcss/line-clamp")],
    darkMode: "class",
};
