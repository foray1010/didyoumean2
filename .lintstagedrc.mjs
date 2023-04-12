const config = {
  '*.{cjs,cts,js,mjs,mts,ts,tsx}': [
    'yarn prettier --write',
    'eslint --fix',
    'jest --bail --findRelatedTests --passWithNoTests',
  ],
  '*.{json,yaml,yml}': 'yarn prettier --write',
  '*.{markdown,md}': ['yarn prettier --write', 'yarn remark'],
  '*ignore-sync': 'ignore-sync',
}
export default config
