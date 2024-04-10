import { SimpleGrid } from "@chakra-ui/react";
import { useAppSelector } from "../../../app/hooks";
import { selectRepo } from "../../repo/store";
import Column from "./Column";

export default function Board() {
  const repo = useAppSelector(selectRepo);

  if (!repo) {
    return null;
  }

  return (
    <SimpleGrid columns={3} spacing={4}>
      <Column issuesStatus="todo" repoId={repo.id} title="Todo" />
      <Column issuesStatus="in_progress" repoId={repo.id} title="In Progress" />
      <Column issuesStatus="done" repoId={repo.id} title="Done" />
    </SimpleGrid>
  );
}
