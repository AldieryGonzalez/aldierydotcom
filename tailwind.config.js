/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./app/**/*.{js,ts,jsx,tsx}",
		"./pages/**/*.{js,ts,jsx,tsx}",
		"./components/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		extend: {
			colors: {
				layoutPrimary: "hsl(203, 90%, 19%)",
				layoutPrimaryLite: "hsl(205, 74%, 27%)",
				layoutAccent: "	hsl(190, 74%, 27%)",
				darkBG: "hsl(180, 17%, 8%)",
			},
		},
	},
	plugins: [],
};
