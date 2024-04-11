import { Box, Heading, Stack } from "@chakra-ui/react";
import { DragItem } from "../types";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { changeIssueStatus, selectIssuesByKey } from "../store";
import Issue from "./Issue";
import { useDrop } from "react-dnd";
import { dragAndDropKey } from "../const";

type Props = {
  title: string;
  issuesKey: string;
};

export default function Column({ title, issuesKey }: Props) {
  const issues = useAppSelector((state) => selectIssuesByKey(state, issuesKey));
  const dispatch = useAppDispatch();

  const [{ isOver }, dropRef] = useDrop<DragItem, void, { isOver: boolean }>({
    accept: dragAndDropKey,
    drop: (dragItem) => {
      if (dragItem.from === issuesKey) {
        return;
      }

      dispatch(
        changeIssueStatus({
          id: dragItem.id,
          from: dragItem.from,
          to: issuesKey,
        })
      );
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  return (
    <Box>
      <Heading
        fontSize="x-large"
        mb={4}
        letterSpacing="wide"
        textAlign="center"
      >
        {title}
      </Heading>
      <Stack
        ref={dropRef}
        h={{ base: 300, md: 600 }}
        p={4}
        mt={2}
        spacing={4}
        bgColor="gray.100"
        rounded="md"
        overflow="auto"
        opacity={isOver ? 0.85 : 1}
      >
        {issues?.map((issue, index) => (
          <Issue
            key={issue.id}
            issuesKey={issuesKey}
            index={index}
            {...issue}
          />
        ))}
      </Stack>
    </Box>
  );
}