export function extractRepoDetails(url: string) {
  const match = url.match(/https:\/\/github\.com\/([^/]+)\/([^/]+)/);

  if (match) {
    return { owner: match[1], repo: match[2] };
  }

  return null;
}

export function formatStarsCount(stars: number) {
  if (stars < 1000) {
    return `${stars} stars`;
  }

  return `${Math.floor(stars / 1000)} k stars`;
}
