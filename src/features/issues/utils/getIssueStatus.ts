import { GuthubIssueState, IssueStatus } from "../types";

type Props = {
  status: GuthubIssueState;
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
