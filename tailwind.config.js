/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Montserrat', 'sans-serif'],
                script: ['"Sacramento"', 'cursive'],
            },
            colors: {
                navy: {
                    DEFAULT: '#0F1E43',
                    dark: '#0A1530',
                },
                gold: {
                    DEFAULT: '#97BFBF',
                    light: '#B3D1D1',
                },
                lightGrey: '#F2F0F0',
                darkFooter: '#2A2B2D',
            },
            borderRadius: {
                'none': '0',
            }
        },
    },
    plugins: [],
}
