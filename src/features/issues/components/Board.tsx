import { SimpleGrid } from "@chakra-ui/react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { getIssuesKey } from "../utils";
import Column from "./Column";
import { IssueStatus } from "../types";

type TColumn = {
  issuesStatus: IssueStatus;
  title: string;
};

type Props = {
  columns: TColumn[];
  repoId: string;
};

export default function Board({ columns, repoId }: Props) {
  return (
    <DndProvider backend={HTML5Backend}>
      <SimpleGrid columns={{ base: 1, lg: 3 }} spacing={{ base: 16, md: 4 }}>
        {columns.map((column) => {
          const issuesKey = getIssuesKey({
            repoId,
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
