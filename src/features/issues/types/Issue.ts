export type Issue = {
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
export type GuthubIssueState = "open" | "closed";