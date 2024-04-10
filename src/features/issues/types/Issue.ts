export type BaseIssue = {
  id: number;
  title: string;
  number: number;
  created_at: Date;
  user: {
    login: string;
  };
  comments: number;
};

export type IssueStatus = "todo" | "in_progress" | "done";

export type Issue = BaseIssue & {
  repoId: string;
  state: IssueStatus;
};

export type GuthubIssueStatus = "open" | "closed";