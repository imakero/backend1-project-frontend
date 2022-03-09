const rtf = new Intl.RelativeTimeFormat("en", {
  numeric: "auto",
  style: "short",
})

const intervals = [
  { unit: "second", multiplier: 60 },
  { unit: "minute", multiplier: 60 },
  { unit: "hour", multiplier: 24 },
  { unit: "week", multiplier: 7 },
  { unit: "month", multiplier: 4.34 },
  { unit: "year", multiplier: 12 },
]

const getDiffAndUnit = (date) =>
  intervals.reduce(
    (format, { unit, multiplier }) =>
      format.diff > multiplier && !format.done
        ? {
            unit,
            diff: format.diff / multiplier,
            sign: format.sign,
            done: false,
          }
        : { ...format, unit: format.done ? format.unit : unit, done: true },
    {
      unit: "second",
      diff: Math.abs(date - Date.now()) / 1000,
      sign: Math.sign(date - Date.now()),
      done: false,
    }
  )

export const formatDate = (date) => {
  const { unit, diff, sign } = getDiffAndUnit(date)
  return rtf.format(Math.round(diff * sign), unit)
}

export const isExpired = (exp) => Date.now() > exp * 1000
