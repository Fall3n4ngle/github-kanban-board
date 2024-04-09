export function formatStarsCount(stars: number) {
  if (stars < 1000) {
    return `${stars} stars`;
  }

  return `${Math.floor(stars / 1000)} k stars`;
}
