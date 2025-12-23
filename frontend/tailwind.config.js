/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            // Paleta de cores "Cyber-Fitness"
            colors: {
                // Cores primárias - Emerald
                emerald: {
                    50: '#ecfdf5',
                    100: '#d1fae5',
                    200: '#a7f3d0',
                    300: '#6ee7b7',
                    400: '#34d399',
                    500: '#10b981', // Cor primária principal
                    600: '#059669',
                    700: '#047857',
                    800: '#065f46',
                    900: '#064e3b',
                    950: '#022c22',
                },
                // Background dark - Zinc/Slate
                dark: {
                    50: '#fafafa',
                    100: '#f4f4f5',
                    200: '#e4e4e7',
                    300: '#d4d4d8',
                    400: '#a1a1aa',
                    500: '#71717a',
                    600: '#52525b',
                    700: '#3f3f46',
                    800: '#27272a',
                    850: '#1f1f23',
                    900: '#18181b',
                    950: '#09090b', // Background principal
                }
            },
            // Fontes
            fontFamily: {
                sans: ['Inter', 'system-ui', 'sans-serif'],
                display: ['Inter', 'system-ui', 'sans-serif'],
            },
            // Sombras customizadas
            boxShadow: {
                'glow': '0 0 20px rgba(16, 185, 129, 0.15)',
                'glow-lg': '0 0 40px rgba(16, 185, 129, 0.2)',
                'inner-glow': 'inset 0 0 20px rgba(16, 185, 129, 0.1)',
            },
            // Animações
            animation: {
                'fade-in': 'fadeIn 0.5s ease-out',
                'slide-up': 'slideUp 0.5s ease-out',
                'slide-in-right': 'slideInRight 0.3s ease-out',
                'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                'glow': 'glow 2s ease-in-out infinite alternate',
            },
            keyframes: {
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                slideUp: {
                    '0%': { opacity: '0', transform: 'translateY(20px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                slideInRight: {
                    '0%': { opacity: '0', transform: 'translateX(-20px)' },
                    '100%': { opacity: '1', transform: 'translateX(0)' },
                },
                glow: {
                    '0%': { boxShadow: '0 0 20px rgba(16, 185, 129, 0.1)' },
                    '100%': { boxShadow: '0 0 30px rgba(16, 185, 129, 0.3)' },
                },
            },
            // Backdrop blur
            backdropBlur: {
                xs: '2px',
            },
        },
    },
    plugins: [],
}
