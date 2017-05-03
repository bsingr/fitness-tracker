import { compose, multiply } from 'ramda'

// cutLow :: (Number) -> (Number) -> Number
const cutLow = (boundary) => (number) => (number < boundary) ? boundary : number

// cutHigh :: (Number) -> (Number) -> Number
const cutHigh = (boundary) => (number) => (number > boundary) ? boundary : number

// fullPercent :: (Number) -> Number
const fullPercent = compose(multiply(100), cutHigh(1), cutLow(0))

// toDegree :: (Number) -> Number
const to90Degree = compose(multiply(90), cutHigh(1), cutLow(-1))

module.exports = {
  cutLow, cutHigh, fullPercent, to90Degree
}
