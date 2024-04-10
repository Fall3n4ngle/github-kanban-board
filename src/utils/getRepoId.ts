type Props = {
  owner: string;
  repo: string;
};

export const getRepoId = ({ owner, repo }: Props) => {
  return `${owner}_${repo}`;
};
