/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{js,jsx,ts,tsx}'],
	theme: {
		extend: {
			minWidth: {
				'7xl': '80rem',
			},
		},
	},
	plugins: [require('@tailwindcss/typography')], // For Lexical Styling
};
