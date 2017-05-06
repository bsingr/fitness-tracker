import { compose, assoc } from 'ramda'

// intensity :: (Number, Number) -> Number
const intensity = (distance, pace) => distance * Math.pow(pace, 2) / 100

// pace :: (Number, Number) -> Number
const pace = (distance, time) => distance / (time / 60)

module.exports = (data, target) => {
  return compose(
    (run) => assoc('intensity', intensity(run.distance, run.pace) / intensity(run.targetDistance, run.targetPace), run),
    (run) => assoc('estimatedTime', pace(target.distance, run.pace), run),
    (run) => assoc('pace', pace(run.distance, run.time), run),
    (run) => assoc('targetPace', pace(target.distance, target.time), run),
    (run) => assoc('targetDistance', target.distance, run),
    (run) => assoc('targetTime', target.time, run),
    (run) => assoc('date', new Date(run.id), run)
  )(data)
}
