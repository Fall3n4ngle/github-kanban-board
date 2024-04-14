import {
  Button,
  Input,
  FormControl,
  FormLabel,
  VisuallyHidden,
  HStack,
} from "@chakra-ui/react";
import { FormEvent, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { fetchRepo, selectRepoStatus } from "../store";
import { getRepoDetails } from "../utils";

export default function SearchForm() {
  const [repoUrl, setRepoUrl] = useState("");
  const isRepoLoading = useAppSelector(selectRepoStatus);
  const dispatch = useAppDispatch();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const details = getRepoDetails(repoUrl);

    if (!details) {
      dispatch({
        type: fetchRepo.rejected.type,
        payload: "failed to get repo details",
      });
      
      return;
    }

    dispatch(fetchRepo({ owner: details.owner, repo: details.repo }));
  };

  return (
    <form onSubmit={handleSubmit}>
      <HStack>
        <FormControl isRequired>
          <VisuallyHidden>
            <FormLabel>Github repo url</FormLabel>
          </VisuallyHidden>
          <Input
            type="url"
            placeholder="Enter repo url"
            value={repoUrl}
            onChange={(e) => setRepoUrl(e.target.value)}
            pattern="https:\/\/github\.com\/[^\/]+\/[^\/]+"
            title="Enter a valid GitHub repository URL"
          />
        </FormControl>
        <Button type="submit" disabled={isRepoLoading}>
          Load issues
        </Button>
      </HStack>
    </form>
  );
}
