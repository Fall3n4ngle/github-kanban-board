import { Container } from "@chakra-ui/react";
import { Repo } from "./features/repo";

function App() {
  return (
    <Container maxW="6xl" py={30}>
      <Repo />
    </Container>
  );
}

export default App;
