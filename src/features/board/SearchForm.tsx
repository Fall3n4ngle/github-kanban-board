import {
  Button,
  Input,
  FormControl,
  FormLabel,
  VisuallyHidden,
  HStack,
} from "@chakra-ui/react";
import { FormEvent, useState } from "react";

export default function SearchForm() {
  const [repoUrl, setRepoUrl] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit}>
      <HStack>
        <FormControl>
          <VisuallyHidden>
            <FormLabel>Github repo url</FormLabel>
          </VisuallyHidden>
          <Input
            placeholder="Enter repo url"
            value={repoUrl}
            onChange={(e) => setRepoUrl(e.target.value)}
          />
        </FormControl>
        <Button type="submit">Load issues</Button>
      </HStack>
    </form>
  );
}
