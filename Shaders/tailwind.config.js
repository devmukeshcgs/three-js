// tailwind.config.js
module.exports = {
    purge: [
        './dist/*.html',
        './src/**/*.html',
        './src/**/*.js',
    ],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {},
    },
    variants: {},
    plugins: [],
}

// module.exports = {
//     purge: ['./src/*.html'],
//     darkMode: false, // or 'media' or 'class'
//     theme: {
//         extend: {},
//     },
//     variants: {
//         extend: {},
//     },
//     plugins: [],
// };