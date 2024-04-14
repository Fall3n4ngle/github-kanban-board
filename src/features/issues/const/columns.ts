import { IssueStatus } from "../types";

type Column = {
  issuesStatus: IssueStatus;
  title: string;
};

export const columns: Column[] = [
  { issuesStatus: "todo", title: "Todo" },
  { issuesStatus: "in_progress", title: "In Progress" },
  { issuesStatus: "done", title: "Done" },
];
