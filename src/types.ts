import {ReturnTypeEnums} from './enums/ReturnTypeEnums'
import {ThresholdTypeEnums} from './enums/ThresholdTypeEnums'

export interface InputOptions {
  caseSensitive?: boolean
  deburr?: boolean
  matchPath?: Array<number | string>
  returnType?: ReturnTypeEnums
  threshold?: number
  thresholdType?: ThresholdTypeEnums
  trimSpaces?: boolean
}

export interface Options {
  caseSensitive: boolean
  deburr: boolean
  matchPath: Array<number | string>
  returnType: ReturnTypeEnums
  threshold: number
  thresholdType: ThresholdTypeEnums
  trimSpaces: boolean
}
