/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        container: {
            center: true,
            padding: "2rem",
            screens: {
                "2xl": "1400px",
            },
        },
        extend: {
            colors: {
                // OASIS AI Brand Colors
                oasis: {
                    cyan: '#00D4FF',
                    'cyan-dark': '#00A3CC',
                    'cyan-glow': 'rgba(0, 212, 255, 0.3)',
                },
                bg: {
                    primary: '#0A0A0F',
                    secondary: '#0F1419',
                    tertiary: '#1A1F2E',
                    card: 'rgba(15, 20, 25, 0.6)',
                },
                text: {
                    primary: '#FFFFFF',
                    secondary: '#E2E8F0',
                    tertiary: '#94A3B8',
                    muted: '#64748B',
                },
                success: '#10B981',
                warning: '#F59E0B',
                error: '#EF4444',

                // Keep shadcn/ui variables for compatibility if needed, but override where possible
                border: "hsl(var(--border))",
                input: "hsl(var(--input))",
                ring: "hsl(var(--ring))",
                background: "hsl(var(--background))",
                foreground: "hsl(var(--foreground))",
                primary: {
                    DEFAULT: "hsl(var(--primary))",
                    foreground: "hsl(var(--primary-foreground))",
                },
                secondary: {
                    DEFAULT: "hsl(var(--secondary))",
                    foreground: "hsl(var(--secondary-foreground))",
                },
                destructive: {
                    DEFAULT: "hsl(var(--destructive))",
                    foreground: "hsl(var(--destructive-foreground))",
                },
                muted: {
                    DEFAULT: "hsl(var(--muted))",
                    foreground: "hsl(var(--muted-foreground))",
                },
                accent: {
                    DEFAULT: "hsl(var(--accent))",
                    foreground: "hsl(var(--accent-foreground))",
                },
                popover: {
                    DEFAULT: "hsl(var(--popover))",
                    foreground: "hsl(var(--popover-foreground))",
                },
                card: {
                    DEFAULT: "hsl(var(--card))",
                    foreground: "hsl(var(--card-foreground))",
                },
            },
            borderRadius: {
                lg: "var(--radius)",
                md: "calc(var(--radius) - 2px)",
                sm: "calc(var(--radius) - 4px)",
            },
            backgroundImage: {
                'gradient-oasis': 'linear-gradient(135deg, #00D4FF 0%, #00A3CC 100%)',
                'gradient-dark': 'linear-gradient(180deg, #0A0A0F 0%, #0D1117 100%)',
            },
            boxShadow: {
                'oasis': '0 0 20px rgba(0, 212, 255, 0.3), 0 0 40px rgba(0, 212, 255, 0.2)',
                'oasis-strong': '0 0 30px rgba(0, 212, 255, 0.5), 0 0 60px rgba(0, 212, 255, 0.3)',
            },
            keyframes: {
                "accordion-down": {
                    from: { height: "0" },
                    to: { height: "var(--radix-accordion-content-height)" },
                },
                "accordion-up": {
                    from: { height: "var(--radix-accordion-content-height)" },
                    to: { height: "0" },
                },
                "float": {
                    '0%, 100%': { transform: 'translateY(0px)' },
                    '50%': { transform: 'translateY(-20px)' },
                },
                "pulse-glow": {
                    '0%, 100%': { opacity: '1', boxShadow: '0 0 0 0 rgba(0, 212, 255, 0.4)' },
                    '50%': { opacity: '0.8', boxShadow: '0 0 0 15px rgba(0, 212, 255, 0)' },
                },
            },
            animation: {
                "accordion-down": "accordion-down 0.2s ease-out",
                "accordion-up": "accordion-up 0.2s ease-out",
                "float": "float 6s ease-in-out infinite",
                "pulse-glow": "pulse-glow 3s ease-in-out infinite",
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
                display: ['Space Grotesk', 'sans-serif'],
                mono: ['JetBrains Mono', 'monospace'],
            }
        },
    },
    plugins: [
        require("tailwindcss-animate")
    ],
}
