import {
  Button,
  Input,
  FormControl,
  FormLabel,
  VisuallyHidden,
  HStack,
  FormErrorMessage,
} from "@chakra-ui/react";
import { ChangeEvent, FormEvent, useState } from "react";
import { useAppDispatch } from "../../app/hooks";
import { fetchRepo } from "./reposSlice";
import { extractRepoDetails } from "./utils";

export default function SearchForm() {
  const [repoUrl, setRepoUrl] = useState("");
  const [error, setError] = useState<string | null>(null);
  const dispatch = useAppDispatch();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    if (extractRepoDetails(value) && error) {
      setError(null);
    }

    setRepoUrl(value);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    const details = extractRepoDetails(repoUrl);

    if (!details) {
      setError("Invalid repo url");
      return;
    }

    dispatch(fetchRepo({ owner: details.owner, repo: details.repo }));
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormControl isRequired isInvalid={!!error}>
        <HStack>
          <VisuallyHidden>
            <FormLabel>Github repo url</FormLabel>
          </VisuallyHidden>
          <Input
            placeholder="Enter repo url"
            value={repoUrl}
            onChange={handleChange}
          />
          <Button type="submit">Load issues</Button>
        </HStack>
        {error && <FormErrorMessage>{error}</FormErrorMessage>}
      </FormControl>
    </form>
  );
}
