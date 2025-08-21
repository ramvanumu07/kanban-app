// src/styles/theme.js
const theme = {
    colors: {
        primary: '#1464ff',
        secondary: '#e5eefc',
        accent: '#f0f7ff',
        danger: '#e21e45',
        warning: '#f59e0b',
        success: '#10b981',
        info: '#3b82f6',

        background: {
            main: '#f7f9fb',
            card: '#fff',
            hover: '#f5f5f5',
            selected: '#f0f7ff',
        },

        text: {
            primary: '#203970',
            secondary: '#697189',
            light: '#8896ab',
            dark: '#24344a',
        },

        border: {
            light: '#e4e7ef',
            medium: '#d0d5e0',
            dark: '#b0b7c3',
        },

        priority: {
            critical: '#8b1538',
            high: '#dc2626',
            medium: '#f97316',
            low: '#eab308',
        },
    },

    button: {
        primary: {
            bg: '#1464ff',
            color: '#fff',
            hoverBg: '#0a56e8',
            border: '#1464ff',
        },
        secondary: {
            bg: '#e5eefc',
            color: '#1464ff',
            hoverBg: '#d5e3f7',
            border: '#e5eefc',
        },
        danger: {
            bg: '#fee',
            color: '#e21e45',
            hoverBg: '#fdd',
            border: '#fee',
        },
        ghost: {
            bg: 'transparent',
            color: '#697189',
            hoverBg: '#f5f5f5',
            border: 'transparent',
        },
        outline: {
            bg: 'transparent',
            color: '#1464ff',
            hoverBg: '#f0f7ff',
            border: '#d0e1fc',
        },
    },

    badge: {
        default: {
            bg: '#e5eefc',
            text: '#1464ff',
        },
        critical: {
            bg: '#f3e8e8',
            text: '#8b1538',
        },
        high: {
            bg: '#fee2e2',
            text: '#dc2626',
        },
        medium: {
            bg: '#fed7aa',
            text: '#f97316',
        },
        low: {
            bg: '#fef3c7',
            text: '#eab308',
        },
        security: {
            bg: '#f0f0f0',
            text: '#666666',
        },
        bug: {
            bg: '#ffe0e0',
            text: '#e21e45',
        },
        enhancement: {
            bg: '#e0f7ee',
            text: '#10b981',
        },
        status: {
            bg: '#f0f0f0',
            text: '#666666',
        },
    },

    spacing: {
        xs: '0.25rem',
        sm: '0.5rem',
        md: '1rem',
        lg: '1.5rem',
        xl: '2rem',
    },

    borderRadius: {
        small: '4px',
        medium: '8px',
        large: '12px',
        round: '50%',
    },

    shadows: {
        card: '0 1px 3px rgba(0, 0, 0, 0.08)',
        dropdown: '0 4px 16px rgba(0, 0, 0, 0.12)',
        modal: '0 8px 30px rgba(0, 0, 0, 0.15)',
    },

    breakpoints: {
        mobile: '480px',
        tablet: '768px',
        laptop: '1024px',
        desktop: '1280px',
    },
};

export default theme;
