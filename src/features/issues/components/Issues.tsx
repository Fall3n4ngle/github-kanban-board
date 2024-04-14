import { Heading, SimpleGrid } from "@chakra-ui/react";
import { useAppSelector } from "@/app/hooks";
import {
  selectRepo,
  selectRepoError,
  selectRepoStatus,
} from "@/features/repo/store";
import { selectIssuesError, selectIssuesStatus } from "../store";
import ColumnSkeleton from "./ColumnSkeleton";
import Board from "./Board";
import { columns } from "../const";

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

  return <Board repoId={repo.id} />;
}
