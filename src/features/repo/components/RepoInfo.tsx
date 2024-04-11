import { useAppSelector } from "../../../app/hooks";
import { selectRepo, selectRepoStatus } from "../store";
import { HStack, Link, Text, Skeleton } from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";
import { formatStarsCount } from "../utils";

export default function RepoInfo() {
  const isLoading = useAppSelector(selectRepoStatus);
  const repo = useAppSelector(selectRepo);

  if (isLoading) return <Skeleton w={350} h={5} />;
  if (!repo) return null;

  return (
    <HStack fontSize="large" spacing={8}>
      <HStack color="blue" fontWeight="600">
        <Link href={repo.owner.html_url} isExternal>
          {repo.owner.login}
        </Link>
        <span>{">"}</span>
        <Link href={repo.html_url} isExternal>
          {repo.name}
        </Link>
      </HStack>
      <Text alignItems="center" display="flex" gap={2}>
        <StarIcon color="gold" /> {formatStarsCount(repo.stargazers_count)}
      </Text>
    </HStack>
  );
}
