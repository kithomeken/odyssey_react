const colors = require('tailwindcss/colors.js')

module.exports = {
    purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
    darkMode: false, // or 'media' or 'class'
    theme: {
        colors: {
            transparent: 'transparent',
            current: 'currentColor',
            black: colors.black,
            white: colors.white,
            gray: colors.gray,
            slate: colors.slate,
            green: colors.green,
            emerald: colors.emerald,
            indigo: colors.indigo,
            yellow: colors.yellow,
        },
    },
    variants: {
        extend: {
            backgroundColor: ['checked'],
            borderColor: ['checked'],
            opacity: ['disabled'],
            textColor: ['visited'],
        },
    },
    plugins: [
        require('flowbite/plugin')
    ],
    content: [
        'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}'
    ]
}
