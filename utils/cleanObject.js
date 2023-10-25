export function clean(obj) {
  for (var propName in obj) {
    if (obj[propName] === "" || obj[propName] === undefined) {
      delete obj[propName];
    }
  }
}