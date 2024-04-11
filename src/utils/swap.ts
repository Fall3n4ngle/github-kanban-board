export function swap<T>(arr: T[], index1: number, index2: number) {
  const copy = [...arr];
  const tmp = copy[index1];
  copy[index1] = copy[index2];
  copy[index2] = tmp;
  return copy;
}
