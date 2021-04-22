module.exports = {
  purge: [
    'components/**/*.vue',
    'layouts/**/*.vue',
    'pages/**/*.vue',
    'plugins/**/*.js',
    'nuxt.config.js',
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    filter: {
      // defaults to {}
      none: 'none',
      grayscale: 'grayscale(1)',
      invert: 'invert(1)',
      sepia: 'sepia(1)',
    },
    backdropFilter: {
      // defaults to {}
      none: 'none',
      blur: 'blur(20px)',
    },
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1440px',
    },
    container: {
      center: true,
      padding: '1rem',
    },
    fontSize: {
      xs: '.75rem',
      sm: '.875rem',
      tiny: '.875rem',
      base: '1rem',
      md: '16px',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
      '5xl': '3rem',
      '6xl': '4rem',
      '7xl': '5rem',
    },
    extend: {
      boxShadow: {
        primary: '0 12px 24px 0 rgba(17,17,17,.06)',
      },
      maxWidth: {
        0: '0',
        '1/4': '25%',
        '1/3': '33%',
        '1/2': '50%',
        '3/4': '75%',
        full: '100%',
      },
      width: {
        primary: '40px',
      },
      minHeight: {
        primary: '40px',
      },
      transitionProperty: {
        height: 'height',
        spacing: 'margin, padding',
      },
      colors: {
        google: {
          DEFAULT: 'rgb(234, 67, 53)',
        },
        facebook: {
          DEFAULT: 'rgb(59, 89, 153)',
        },
        primary: {
          DEFAULT: '#ffb200',
          hover: '#ff9200',
        },
        vk: {
          DEFAULT: '#2787F5',
          hover: '#3b597c',
        },
        telegram: {
          DEFAULT: '#2ba4e0',
          hover: '#1994d1',
        },
        secondary: '#e3e2df',
        grayest: 'rgba(249,248,246,.3)',
        cream: '#f9f8f6',
        dark: '#393835',
      },
      borderWidth: {
        1: '1px',
      },
      borderRadius: {
        none: '0',
        sm: '0.125rem',
        DEFAULT: '10px',
        md: '0.375rem',
        lg: '0.5rem',
        full: '9999px',
        large: '12px',
      },
    },
  },
  variants: {
    extend: {
      padding: ['important'],
    },
  },
  plugins: [require('tailwindcss-filters'), require('tailwindcss-important')],
}
