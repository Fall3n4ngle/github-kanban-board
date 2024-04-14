import { Box, Heading, Link, Text } from "@chakra-ui/react";
import { DragItem, Issue as TIssue } from "../types";
import { formatIssueDate } from "../utils";
import { XYCoord, useDrag, useDrop } from "react-dnd";
import { useRef } from "react";
import { dragAndDropKey } from "../const";
import { useAppDispatch } from "../../../app/hooks";
import { swapIssues } from "../store";

type Props = TIssue & {
  issuesKey: string;
  index: number;
};

export default function IssueCard({
  title,
  user,
  comments,
  number,
  created_at,
  id,
  issuesKey,
  index,
  html_url,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();

  const [, drag] = useDrag<
    DragItem,
    void,
    {
      isDragging: boolean;
    }
  >({
    type: dragAndDropKey,
    item: { from: issuesKey, id, index },
  });

  const [, drop] = useDrop<DragItem, void, unknown>({
    accept: dragAndDropKey,
    hover: (item, monitor) => {
      if (!ref.current) return;
      if (item.from !== issuesKey) return;

      const draggedItemIndex = item.index;
      const hoveredItemIndex = index;

      if (draggedItemIndex === hoveredItemIndex) return;

      const isDraggedItemAboveHovered = draggedItemIndex < hoveredItemIndex;
      const isDraggedItemBelowHovered = !isDraggedItemAboveHovered;

      const { y: mouseY } = monitor.getClientOffset() as XYCoord;

      const hoveredBoundingRect = ref.current.getBoundingClientRect();

      const hoveredMiddleHeight =
        (hoveredBoundingRect.bottom - hoveredBoundingRect.top) / 1.5;

      const mouseYRelativeToHovered = mouseY - hoveredBoundingRect.top;

      const isMouseYAboveHoveredMiddleHeight =
        mouseYRelativeToHovered < hoveredMiddleHeight;

      const isMouseYBelowHoveredMiddleHeight =
        mouseYRelativeToHovered > hoveredMiddleHeight;

      if (isDraggedItemAboveHovered && isMouseYAboveHoveredMiddleHeight) {
        return;
      }

      if (isDraggedItemBelowHovered && isMouseYBelowHoveredMiddleHeight) {
        return;
      }

      dispatch(
        swapIssues({
          index1: draggedItemIndex,
          index2: hoveredItemIndex,
          issuesKey,
        })
      );

      item.index = hoveredItemIndex;
    },
  });

  drag(drop(ref));

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
      minW={300}
    >
      <Heading fontSize="lg" mb={2}>
        {title}
      </Heading>
      <Text color="GrayText" mb={2}>
        <Link href={html_url} target="_blank" color="blue" fontWeight="500">
          #{number}
        </Link>
        <Text ml={2} as="span" fontSize="sm">
          {date}
        </Text>
      </Text>
      <Text>
        <Text as="span" mr={1}>
          {user.login}
        </Text>{" "}
        |{" "}
        <Text as="span" ml={1}>
          Comments: {comments}
        </Text>
      </Text>
    </Box>
  );
}
