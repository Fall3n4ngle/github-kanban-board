import { Heading, SimpleGrid } from "@chakra-ui/react";
import { useAppSelector } from "../../../app/hooks";
import { selectRepo, selectRepoStatus } from "../../repo/store";
import Column from "./Column";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { selectIssuesStatus } from "../store";
import ColumnSkeleton from "./ColumnSkeleton";
import { IssueStatus } from "../types";
import { getIssuesKey } from "../utils";

type TColumn = {
  issuesStatus: IssueStatus;
  title: string;
};

const columns: TColumn[] = [
  { issuesStatus: "todo", title: "Todo" },
  { issuesStatus: "in_progress", title: "In Progress" },
  { issuesStatus: "done", title: "Done" },
];

export default function Board() {
  const repo = useAppSelector(selectRepo);
  const isIssuesLoading = useAppSelector(selectIssuesStatus);
  const isRepoLoading = useAppSelector(selectRepoStatus);

  if (isIssuesLoading || isRepoLoading) {
    <SimpleGrid columns={3} spacing={4}>
      {columns.map((column, index) => (
        <ColumnSkeleton key={index} title={column.title} />
      ))}
    </SimpleGrid>;
  }

  if (!repo) {
    return (
      <Heading textAlign="center" fontSize="x-large">
        Enter repo url to load issues
      </Heading>
    );
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <SimpleGrid columns={3} spacing={4}>
        {columns.map((column) => {
          const issuesKey = getIssuesKey({
            repoId: repo.id,
            status: column.issuesStatus,
          });

          return (
            <Column
              key={issuesKey}
              issuesKey={issuesKey}
              title={column.title}
            />
          );
        })}
      </SimpleGrid>
    </DndProvider>
  );
}
