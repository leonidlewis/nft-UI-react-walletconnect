import { BigNumber } from '@0x/utils'

export const multiple = (val1: string, val2: string) =>
  new BigNumber(val1).multipliedBy(new BigNumber(val2)).toString()

export const divide = (dividend: string, divider: string) =>
  new BigNumber(dividend).dividedBy(new BigNumber(divider)).toString()

export const compare = (val1: string, val2: string) => {
  if (new BigNumber(val1).isEqualTo(val2)) return 0
  if (new BigNumber(val1).isLessThan(val2)) return -1
  return 1
}

export const reciprocal = (val: string, fixedDecimals?: number) => {
  if (parseFloat(val) == 0) return '0'
  const result = new BigNumber('1').dividedBy(new BigNumber(val))
  if (fixedDecimals == null) return result.toString()
  return result.toFixed(fixedDecimals).toString()
}

export const toFixed = (val: string, decimals: number) =>
  new BigNumber(convertNumerString(val)).toFixed(decimals)

export const toDecimal = (val: string, decimals: number) =>
  divide(val, `1${'0'.repeat(decimals)}`)

export const priceFormat = (val: string) => {
  const price = new BigNumber(val)
  let digits = '100'

  if (price.isLessThan(1)) digits = '10000'
  if (price.isLessThan(0.1)) digits = '1000000'
  if (price.isLessThan(0.0001)) digits = '1000000000000'
  if (price.isLessThan(0.0000001)) digits = '100000000000000000'

  return new BigNumber(price.multipliedBy(digits).toFixed(0))
    .dividedBy(new BigNumber(digits))
    .toString()
}

export const convertNumerString = (v: string) => {
  let vf = '0'
  if (v != '') vf = v.replace(/,/g, '')
  if (v.substr(v.length - 1) === '.') {
    vf = v.substr(v.length - 1)
  }
  return vf
}

export const getMaxNumber = () => new BigNumber(2).pow(256).minus(1).toString()

export const priceConvert = (val: string, fixedDecimals?: number) => {
  if (val == '') return ''

  const price = new BigNumber(convertNumerString(val))
  const digits = `1${'0'.repeat(fixedDecimals == undefined ? 12 : fixedDecimals)}`

  const strVal = new BigNumber(price.multipliedBy(digits).toFixed(0))
    .dividedBy(new BigNumber(digits))
    .toString()
  return strVal == '0' && val == '0' ? '' : strVal
}

export const calcTipFeeAmount = (amount: string, feeRate: number) => {
  const bnAmount = new BigNumber(amount)
  return bnAmount.minus(divide(amount, `${1 + feeRate}`)).toString()
}
