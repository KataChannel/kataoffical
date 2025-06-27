import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import postcss from 'rollup-plugin-postcss';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const packageJson = require('./package.json');

export default {
  input: 'src/index.ts',
  output: [
    {
      file: packageJson.main,
      format: 'cjs',
      sourcemap: true,
      exports: 'named',
    },
    {
      file: packageJson.module,
      format: 'esm',
      sourcemap: true,
      exports: 'named',
    },
  ],
  plugins: [
    peerDepsExternal(),
    resolve({
      browser: true,
      preferBuiltins: false,
    }),
    commonjs(),
    typescript({
      tsconfig: './tsconfig.json',
      exclude: [
        '**/*.stories.tsx',
        '**/*.test.tsx',
        '.storybook/**/*',
        'scripts/**/*',
      ],
      declaration: true,
      declarationDir: 'dist',
      rootDir: 'src',
    }),
    postcss({
      config: {
        path: './postcss.config.js',
      },
      extensions: ['.css'],
      minimize: true,
      inject: {
        insertAt: 'top',
      },
      extract: 'index.css',
    }),
  ],
  external: ['react', 'react-dom', 'next', 'tailwindcss'],
  onwarn: (warning, warn) => {
    // Bỏ qua warnings về external dependencies
    if (warning.code === 'EXTERNAL_DEPENDENCY') return;
    warn(warning);
  },
};