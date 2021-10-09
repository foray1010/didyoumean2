import type { Config } from '@jest/types'

const config: Config.InitialOptions = {
  collectCoverage: true,
  collectCoverageFrom: ['<rootDir>/src/**/*.{cjs,cts,js,mjs,mts,ts,tsx}'],
  coverageReporters: ['lcov', 'text-summary'],
  testMatch: ['**/*.{spec,test}.{cjs,cts,js,mjs,mts,ts,tsx}'],
}

export default config
