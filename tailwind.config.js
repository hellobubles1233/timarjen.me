/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        notion: {
          DEFAULT: '#2F3437',
          light: '#37352F',
          gray: {
            light: '#E9ECEF',
            medium: '#9BA1A6',
            dark: '#787774'
          }
        },
        tag: {
          default: {
            bg: '#F1F1EF',
            text: '#37352F'
          },
          react: {
            bg: '#E6F6FF',
            text: '#0070F3'
          },
          typescript: {
            bg: '#E7EDF3',
            text: '#3178C6'
          },
          javascript: {
            bg: '#FFF7E6',
            text: '#F7B93E'
          },
          node: {
            bg: '#E7F5E7',
            text: '#539E43'
          },
          python: {
            bg: '#EEEEF5',
            text: '#3776AB'
          },
          design: {
            bg: '#FFE8F3',
            text: '#FF3399'
          },
          aws: {
            bg: '#FFF2E8',
            text: '#FF9900'
          },
          docker: {
            bg: '#E7F1FF',
            text: '#2496ED'
          },
          database: {
            bg: '#E8F5FF',
            text: '#336791'
          },
          api: {
            bg: '#F3E8FF',
            text: '#7C3AED'
          }
        },
        badge: {
          gray: {
            bg: '#F1F1EF',
            text: '#37352F'
          },
          brown: {
            bg: '#F4EEEE',
            text: '#9F6B53'
          },
          orange: {
            bg: '#FAEBDD',
            text: '#D4732C'
          },
          yellow: {
            bg: '#FBF3DB',
            text: '#DFAB01'
          },
          green: {
            bg: '#EEF3ED',
            text: '#448361'
          },
          blue: {
            bg: '#E9F3F7',
            text: '#2E7CB9'
          },
          purple: {
            bg: '#F4F0F7',
            text: '#6940A5'
          },
          pink: {
            bg: '#F9F2F5',
            text: '#AD1A72'
          },
          red: {
            bg: '#FDEBEC',
            text: '#E03E3E'
          }
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif']
      },
      keyframes: {
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' }
        }
      },
      animation: {
        shimmer: 'shimmer 2s infinite'
      }
    }
  },
  plugins: [
    require('@tailwindcss/typography')
  ]
};