import { Container } from "@chakra-ui/react";
import { Repo } from "./features/repo";
import { Board } from "./features/issues";

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
      <Board />
    </Container>
  );
}

export default App;
