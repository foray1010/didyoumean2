import {ReturnTypeEnums} from './enums/ReturnTypeEnums'
import {ThresholdTypeEnums} from './enums/ThresholdTypeEnums'

export type Maybe<T> = T | void

export type InputOptions = {
  caseSensitive?: boolean
  deburr?: boolean
  matchPath?: Array<number | string>
  returnType?: ReturnTypeEnums
  threshold?: number
  thresholdType?: ThresholdTypeEnums
  trimSpaces?: boolean
}

export type Options = {
  caseSensitive: boolean
  deburr: boolean
  matchPath: Array<number | string>
  returnType: ReturnTypeEnums
  threshold: number
  thresholdType: ThresholdTypeEnums
  trimSpaces: boolean
}
