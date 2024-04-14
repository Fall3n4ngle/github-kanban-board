import { Container } from "@chakra-ui/react";
import { Issues } from "@/features/issues";
import { Repo } from "@/features/repo";

function App() {
  return (
    <Container
      maxW="container.xl"
      py={30}
      display="flex"
      flexDirection="column"
      gap={10}
    >
      <Repo />
      <Issues />
    </Container>
  );
}

export default App;
