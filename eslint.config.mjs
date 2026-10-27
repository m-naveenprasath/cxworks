import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';

const config = [
  ...nextVitals,
  ...nextTs,
  { ignores: ['.next/**', 'node_modules/**', '_legacy/**', 'next-env.d.ts'] },
  {
    rules: {
      // Marketing images are small static SVG/PNGs served from /public; <img> keeps their exact inline sizing.
      '@next/next/no-img-element': 'off',
    },
  },
];

export default config;
