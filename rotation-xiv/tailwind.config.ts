import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'selector',
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  /* everforest */
  theme: {
    colors: {
      'dark': {
        'bg': {
          0: '#22282c',
          1: '#272f34',
          dim: '#2f383e',
          2: '#374247',
          3: '#404c51',
          4: '#4a555b',
          5: '#525c62',
          visual: '#503946',
          red: '#4e3e43',
          green: '#404d44',
          blue: '#394f5a',
          yellow: '#4a4940'
        },
        fg: '#d3c6aa',
        'grey': {
          0: '#7f897d',
          1: '#859289',
          2: '#9aa79d'
        },
        'faded': {
          red: '#e67e80',
          orange: '#e69875',
          yellow: '#dbbc7f',
          green: '#a7c080',
          aqua: '#83c092',
          blue: '#7fbbb3',
          purple: '#d699b6'
        },
        'dim': {
          red: '#da6362',
          orange: '#d77f48',
          yellow: '#bf983d',
          green: '#899c40',
          aqua: '#569d79',
          blue: '#5a93a2',
          purple: '#b87b9d',
        }
      },
      'light': {
        'bg': {
          0: '#f0edd8',
          1: '#f6f1dd',
          dim: '#fdf6e3',
          2: '#f3efda',
          3: '#edead5',
          4: '#e4e1cd',
          5: '#dfdbc8',
          visual: '#eaedc8',
          red: '#fbe3da',
          green: '#f0f1d2',
          blue: '#e9f0e9',
          yellow: '#faedcd'
        },
        fg: '#5c6a72',
        'grey': {
          0: '#a4ad9e',
          1: '#939f91',
          2: '#879686'
        },
        red: '#f85552',
        orange: '#f57d26',
        yellow: '#bf983d',
        green: '#899c40',
        aqua: '#569d79',
        blue: '#5a93a2',
        purple: '#b87b9d',
        'dim': {
          red: '#f1706f',
          orange: '#f39459',
          yellow: '#e4b649',
          green: '#a4bb4a',
          aqua: '#6ec398',
          blue: '#6cb3c6',
          purple: '#e092be'
        }
      }
    }
  },
  plugins: [],
};
export default config;
