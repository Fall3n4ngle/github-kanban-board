import { Box, Heading, Text } from "@chakra-ui/react";
import { BaseIssue } from "../types";
import { formatIssueDate } from "../utils";

type Props = Pick<
  BaseIssue,
  "title" | "number" | "comments" | "created_at" | "user"
>;

export default function Issue({
  title,
  user,
  comments,
  number,
  created_at,
}: Props) {
  const date = formatIssueDate(created_at);

  return (
    <Box
      rounded="xl"
      as="div"
      w={200}
      p={5}
      cursor="grab"
      width="100%"
      bg="white"
    >
      <Heading fontSize="lg" mb={1}>{title}</Heading>
      <Text color="GrayText" mb={2} fontSize="sm">
        #{number} {date}
      </Text>
      <Text>
        {user.login} | Comments: {comments}
      </Text>
    </Box>
  );
}
