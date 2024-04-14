export function swap<T>(arr: T[], index1: number, index2: number) {
  if (
    index1 >= arr.length ||
    index1 < 0 ||
    index2 >= arr.length ||
    index2 < 0
  ) {
    return [...arr];
  }

  const copy = [...arr];

  const tmp = copy[index1];
  copy[index1] = copy[index2];
  copy[index2] = tmp;

  return copy;
}
