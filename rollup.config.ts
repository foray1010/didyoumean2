// @ts-ignore
import babel, { getBabelOutputPlugin } from '@rollup/plugin-babel'
import commonjs from '@rollup/plugin-commonjs'
import resolve from '@rollup/plugin-node-resolve'
import type { RollupOptions } from 'rollup'
import dts from 'rollup-plugin-dts'
import { terser } from 'rollup-plugin-terser'

import packageJson from './package.json'

const rollupOptions: RollupOptions[] = [
  {
    external: Object.keys(packageJson.dependencies),
    input: 'src/index.ts',
    output: [
      {
        exports: 'named',
        file: 'dist/index.cjs.js',
        format: 'cjs',
        plugins: [getBabelOutputPlugin()],
        sourcemap: true,
      },
      {
        exports: 'named',
        file: 'dist/index.esm.js',
        format: 'esm',
        plugins: [getBabelOutputPlugin()],
        sourcemap: true,
      },
    ],
    plugins: [
      babel({
        babelHelpers: 'runtime',
        extensions: ['.js', '.ts'],
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
        babelHelpers: 'runtime',
        extensions: ['.js', '.ts'],
        // https://github.com/rollup/plugins/issues/381
        skipPreflightCheck: true,
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

export default rollupOptions
