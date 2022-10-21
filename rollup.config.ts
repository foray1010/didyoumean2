import { babel, getBabelOutputPlugin } from '@rollup/plugin-babel'
import commonjs from '@rollup/plugin-commonjs'
import resolve from '@rollup/plugin-node-resolve'
import type { RollupOptions } from 'rollup'
import dts from 'rollup-plugin-dts'
import { terser } from 'rollup-plugin-terser'

import pkg from './package.json'

const outputDir = 'dist'

const rollupOptions: readonly RollupOptions[] = [
  {
    external: Object.keys(pkg.dependencies),
    input: 'src/index.ts',
    output: [
      {
        dir: outputDir,
        entryFileNames: '[name].cjs',
        exports: 'named',
        format: 'cjs',
        plugins: [getBabelOutputPlugin()],
        preferConst: true,
        sourcemap: true,
      },
      {
        dir: outputDir,
        entryFileNames: '[name].mjs',
        exports: 'named',
        format: 'esm',
        plugins: [getBabelOutputPlugin()],
        preferConst: true,
        sourcemap: true,
      },
    ],
    plugins: [
      babel({
        babelHelpers: 'runtime',
        extensions: ['.js', '.ts'],
      }),
      commonjs({
        include: '**/node_modules/**',
      }),
      resolve({
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
      dir: outputDir,
      entryFileNames: '[name].[format].js',
      exports: 'named',
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
        include: '**/node_modules/**',
      }),
      resolve({
        extensions: ['.js', '.ts'],
      }),
      terser(),
    ],
  },
  {
    input: 'build/dts/index.d.ts',
    output: {
      dir: outputDir,
      entryFileNames: '[name].ts',
    },
    plugins: [dts()],
  },
]

export default rollupOptions
