import { eslintIgnoresConfig, eslintNodeConfig } from '@foray1010/eslint-config'

const config = [...eslintIgnoresConfig, ...eslintNodeConfig]
export default config
