import { GuthubIssueStatus, StateIssueStatus } from "../store";

type Props = {
  status: GuthubIssueStatus;
  assignee: null | object;
};

export const getIssueStatus = ({
  assignee,
  status,
}: Props): StateIssueStatus => {
  if (status === "closed") {
    return "done";
  }

  if (assignee) {
    return "in_progress";
  }

  return "todo";
};
