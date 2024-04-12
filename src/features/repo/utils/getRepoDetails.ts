export function getRepoDetails(url: string) {
  const match = url.match(/https:\/\/github\.com\/([^/]+)\/([^/]+)/);

  if (match) {
    return { owner: match[1], repo: match[2] };
  }

  return null;
}
