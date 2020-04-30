export function TopFiveDate(obj) {
  return obj.sort(compare('value')).slice(0, 5)
}

function compare(prop) {
  return function(a, b) {
    const val1 = a[prop]
    const val2 = b[prop]
    return val2 - val1
  }
}
