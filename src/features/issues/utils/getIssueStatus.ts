import { GuthubIssueStatus, IssueStatus } from "../types";

type Props = {
  status: GuthubIssueStatus;
  assignee: null | object;
};

export const getIssueStatus = ({ assignee, status }: Props): IssueStatus => {
  if (status === "closed") {
    return "done";
  }

  if (assignee) {
    return "in_progress";
  }

  return "todo";
};
