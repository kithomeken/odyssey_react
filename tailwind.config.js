const colors = require('tailwindcss/colors')

module.exports = {
    purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
    darkMode: false, // or 'media' or 'class'
    theme: {
        colors: {
            gray:   colors.gray,
            green:  colors.green,
            purple: colors.purple,
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
