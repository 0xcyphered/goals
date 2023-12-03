export function orderToCoordinate(a: number) {
  return (a & 1) === 1 ? (-1 / 2) * a - 1 / 2 : a / 2;
}

export function coordinateToOrder(a: number) {
  return a > 0 ? 2 * a : a < 0 ? -2 * a - 1 : 0;
}
