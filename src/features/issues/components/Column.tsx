import { Box, Heading, Stack } from "@chakra-ui/react";
import { IssueStatus } from "../types";
import { useAppSelector } from "../../../app/hooks";
import { selectIssuesByStatus } from "../store";
import Issue from "./Issue";

type Props = {
  title: string;
  repoId: string;
  issuesStatus: IssueStatus;
};

export default function Column({ issuesStatus, title, repoId }: Props) {
  const issues = useAppSelector((state) =>
    selectIssuesByStatus(state.issues, { repoId, status: issuesStatus })
  );

  return (
    <Box>
      <Heading fontSize="x-large" mb={4} letterSpacing="wide" textAlign="center" >
        {title}
      </Heading>
      <Stack
        h={{ base: 300, md: 600 }}
        p={4}
        mt={2}
        spacing={4}
        bgColor="gray.100"
        rounded="md"
        overflow="auto"
      >
        {issues.map((issue) => (
          <Issue key={issue.id} {...issue} />
        ))}
      </Stack>
    </Box>
  );
}
