import { Box, Heading, Text } from "@chakra-ui/react";
import { DragItem, Issue as TIssue } from "../types";
import { formatIssueDate } from "../utils";
import { useDrag } from "react-dnd";
import { useRef } from "react";
import { dragAndDropKey } from "../const";

type Props = TIssue & {
  issuesKey: string
}

export default function Issue({
  title,
  user,
  comments,
  number,
  created_at,
  id,
  issuesKey,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);

  const [{ isDragging }, drag] = useDrag<
    DragItem,
    void,
    {
      isDragging: boolean;
    }
  >({
    type: dragAndDropKey,
    item: { from: issuesKey, id },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drag(ref);

  const date = formatIssueDate(created_at);

  return (
    <Box
      ref={ref}
      rounded="xl"
      as="div"
      w={200}
      p={5}
      cursor="grab"
      width="100%"
      bg="white"
      opacity={isDragging ? 0.8 : 1}
    >
      <Heading fontSize="lg" mb={1}>
        {title}
      </Heading>
      <Text color="GrayText" mb={2} fontSize="sm">
        #{number} {date}
      </Text>
      <Text>
        {user.login} | Comments: {comments}
      </Text>
    </Box>
  );
}
