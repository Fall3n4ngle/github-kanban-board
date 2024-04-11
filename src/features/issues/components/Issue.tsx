import { Box, Heading, Text } from "@chakra-ui/react";
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

export default function Issue({
  title,
  user,
  comments,
  number,
  created_at,
  id,
  issuesKey,
  index,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();

  const [{ isDragging }, drag] = useDrag<
    DragItem,
    void,
    {
      isDragging: boolean;
    }
  >({
    type: dragAndDropKey,
    item: { from: issuesKey, id, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
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
        (hoveredBoundingRect.bottom - hoveredBoundingRect.top) / 2;

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
