import type { ReturnTypeEnums } from './enums/ReturnTypeEnums.js'
import type { ThresholdTypeEnums } from './enums/ThresholdTypeEnums.js'

export type MatchItem = Record<string, unknown> | string

export type Options = {
  readonly caseSensitive: boolean
  readonly deburr: boolean
  readonly matchPath: ReadonlyArray<number | string>
  readonly returnType: ReturnTypeEnums
  readonly threshold: number
  readonly thresholdType: ThresholdTypeEnums
  readonly trimSpaces: boolean
}
