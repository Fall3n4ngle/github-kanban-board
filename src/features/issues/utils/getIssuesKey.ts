import { IssueStatus } from "../types";

type Props = {
  repoId: string;
  status: IssueStatus;
};

export const getIssuesKey = ({ repoId, status }: Props) => {
  return `${repoId}_${status}`;
};
