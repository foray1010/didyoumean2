import { babel } from '@rollup/plugin-babel'
import commonjs from '@rollup/plugin-commonjs'
import resolve from '@rollup/plugin-node-resolve'
import type { OutputOptions, RollupOptions } from 'rollup'
import dts from 'rollup-plugin-dts'

const outputDir = 'dist'
const commonOutputOptions: Readonly<OutputOptions> = {
  dir: outputDir,
  exports: 'named',
  generatedCode: {
    constBindings: true,
    preset: 'es2015',
  },
  sourcemap: true,
}

const rollupOptions: readonly RollupOptions[] = [
  {
    external: /\/node_modules\//u,
    input: 'src/index.ts',
    output: [
      {
        ...commonOutputOptions,
        entryFileNames: '[name].cjs',
        format: 'cjs',
      },
      {
        ...commonOutputOptions,
        entryFileNames: '[name].mjs',
        format: 'esm',
      },
    ],
    plugins: [
      babel({
        extensions: ['.js', '.ts'],
      }),
      commonjs({
        include: '**/node_modules/**',
      }),
      resolve({
        extensions: ['.js', '.ts'],
      }),
    ],
    watch: {
      clearScreen: false,
    },
  },
  {
    input: 'build/dts/index.d.ts',
    output: {
      dir: outputDir,
      entryFileNames: '[name].ts',
    },
    plugins: [dts()],
  },
  {
    input: 'build/dts/index.d.ts',
    output: {
      dir: outputDir,
      entryFileNames: '[name].mts',
    },
    plugins: [dts()],
  },
]

export default rollupOptions
