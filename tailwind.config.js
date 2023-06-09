/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      animation: {
        typing: 'blink 1s steps(5, start) infinite'
      },
      backgroundImage: {
        gradient: 'linear-gradient(180deg,rgba(53,55,64,0),#353740 58.85%)'
      },
      keyframes: {
        blink: {
          to: { visibility: 'hidden' }
        }
      },
      colors: {
        gptlogo: '#10a37f',
        gptdarkgray: '#202123',
        gptgray: '#343541',
        gptlightgray: '#444654',
        gptSteelBlue: '#3B3E44',
        gptCharcoalGray: '#18191a',
        gptMidnightBlue: '#2A2B32',
        gptGunmetal: '#565869',
        gptJungleGreen: '#1a7f64'
      }
    }
  },
  plugins: []
}
