export function formatIssueDate(date: Date) {
  const diffTime = Math.abs(new Date().getTime() - new Date(date).getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays > 1) {
    return `${diffDays} days ago`;
  }

  if (diffDays === 1) {
    return `1 day ago`;
  }

  const diffHours = Math.floor(diffTime / (1000 * 60 * 60));

  if (diffHours > 1) {
    return `${diffHours} hours ago`;
  }

  return `less than 1 hour ago`;
}
