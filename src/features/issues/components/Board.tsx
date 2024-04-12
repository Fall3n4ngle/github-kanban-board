import { Heading, SimpleGrid } from "@chakra-ui/react";
import { useAppSelector } from "../../../app/hooks";
import { selectRepo } from "../../repo/store";
import Column from "./Column";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { selectIssuesError, selectIssuesStatus } from "../store";
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
  const issuesError = useAppSelector(selectIssuesError);

  if (issuesError) {
    return (
      <Heading textAlign="center" fontSize="x-large" color="red">
        {issuesError}
      </Heading>
    );
  }

  if (isIssuesLoading) {
    <SimpleGrid columns={{ base: 1, md: 4 }} spacing={{ base: 16, md: 4 }}>
      {columns.map((column, index) => (
        <ColumnSkeleton key={index} title={column.title} />
      ))}
    </SimpleGrid>;
  }

  if (!repo) return null;

  return (
    <DndProvider backend={HTML5Backend}>
      <SimpleGrid
        columns={{ base: 1, lg: 3 }}
        spacing={{ base: 16, md: 4 }}
      >
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
