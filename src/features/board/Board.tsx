import { Stack } from "@chakra-ui/react";
import RepoInfo from "./RepoInfo";
import SearchForm from "./SearchForm";

export default function Board() {
  return (
    <div>
      <Stack spacing={4}>
        <SearchForm />
        <RepoInfo />
      </Stack>
    </div>
  );
}
