import { Heading, SimpleGrid } from "@chakra-ui/react";
import { useAppSelector } from "@/app/hooks";
import {
  selectRepo,
  selectRepoError,
  selectRepoStatus,
} from "@/features/repo/store";
import { selectIssuesError, selectIssuesStatus } from "../store";
import ColumnSkeleton from "./ColumnSkeleton";
import { IssueStatus } from "../types";
import Board from "./Board";

type TColumn = {
  issuesStatus: IssueStatus;
  title: string;
};

const columns: TColumn[] = [
  { issuesStatus: "todo", title: "Todo" },
  { issuesStatus: "in_progress", title: "In Progress" },
  { issuesStatus: "done", title: "Done" },
];

export default function Issues() {
  const repo = useAppSelector(selectRepo);
  const isRepoLoading = useAppSelector(selectRepoStatus);
  const repoError = useAppSelector(selectRepoError);
  const isIssuesLoading = useAppSelector(selectIssuesStatus);
  const issuesError = useAppSelector(selectIssuesError);

  if (issuesError) {
    return (
      <Heading textAlign="center" fontSize="x-large" color="red">
        {issuesError}
      </Heading>
    );
  }

  if (isIssuesLoading || isRepoLoading) {
    return (
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={{ base: 16, md: 4 }}>
        {columns.map((column, index) => (
          <ColumnSkeleton key={index} title={column.title} />
        ))}
      </SimpleGrid>
    );
  }

  if (repoError) return null;

  if (!repo) {
    return (
      <Heading textAlign="center" fontSize="x-large">
        Enter repo url to load issues
      </Heading>
    );
  }

  return <Board columns={columns} repoId={repo.id} />;
}
