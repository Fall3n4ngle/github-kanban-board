import { Stack } from "@chakra-ui/react";
import RepoInfo from "./RepoInfo";
import SearchForm from "./SearchForm";

export default function Repo() {
  return (
    <Stack spacing={4}>
      <SearchForm />
      <RepoInfo />
    </Stack>
  );
}
