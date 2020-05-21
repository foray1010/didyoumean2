// @ts-ignore
import babel from '@rollup/plugin-babel'
import commonjs from '@rollup/plugin-commonjs'
import resolve from '@rollup/plugin-node-resolve'
import dts from 'rollup-plugin-dts'
import { terser } from 'rollup-plugin-terser'

import packageJson from './package.json'

export default [
  {
    external: Object.keys(packageJson.dependencies),
    input: 'src/index.ts',
    output: [
      {
        exports: 'named',
        file: 'dist/index.cjs.js',
        format: 'cjs',
        sourcemap: true,
      },
      {
        exports: 'named',
        file: 'dist/index.esm.js',
        format: 'esm',
        sourcemap: true,
      },
    ],
    plugins: [
      babel({
        babelHelpers: 'runtime',
        extensions: ['.js', '.ts'],
        plugins: ['@babel/plugin-transform-runtime'],
      }),
      commonjs({
        extensions: ['.js', '.ts'],
      }),
      terser(),
    ],
    watch: {
      clearScreen: false,
    },
  },
  {
    input: 'src/index.ts',
    output: {
      exports: 'named',
      file: 'dist/index.umd.js',
      format: 'umd',
      name: 'didYouMean',
      sourcemap: true,
    },
    plugins: [
      babel({
        babelHelpers: 'bundled',
        extensions: ['.js', '.ts'],
      }),
      commonjs({
        extensions: ['.js', '.ts'],
      }),
      resolve(),
      terser(),
    ],
  },
  {
    input: 'build/dts/index.d.ts',
    output: { file: 'dist/index.d.ts' },
    plugins: [dts()],
  },
]
