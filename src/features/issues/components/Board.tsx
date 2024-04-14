import { SimpleGrid } from "@chakra-ui/react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { getIssuesKey } from "../utils";
import Column from "./Column";
import { columns } from "../const";

type Props = {
  repoId: string;
};

export default function Board({ repoId }: Props) {
  return (
    <DndProvider backend={HTML5Backend}>
      <SimpleGrid
        data-testid="board"
        columns={{ base: 1, lg: 3 }}
        spacing={{ base: 16, md: 4 }}
      >
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
