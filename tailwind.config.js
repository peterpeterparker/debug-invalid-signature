import { fontFamily } from 'tailwindcss/defaultTheme';

/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		fontFamily: {
			sans: ['JetBrains Mono', 'sans-serif', ...fontFamily.sans]
		},
		extend: {
			animation: {
				fade: 'fadeIn .25s ease-in-out'
			},
			keyframes: {
				fadeIn: {
					from: { opacity: '0' },
					to: { opacity: '1' }
				}
			}
		},
		colors: {
			inherit: 'inherit',
			transparent: 'transparent',
			current: 'currentColor',
			black: 'rgb(0 0 0)',
			white: 'rgb(255 255 255)',
			['lavender-blue']: {
				50: '#f2f3ff',
				100: '#e4e7ff',
				200: '#c9cfff',
				300: '#aeb8ff',
				400: '#93a0ff',
				500: '#7888ff',
				600: '#606dcc',
				700: '#485299',
				800: '#303666',
				900: '#181b33'
			}
		}
	}
};
