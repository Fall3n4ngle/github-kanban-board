import { Container } from "@chakra-ui/react";
import Board from "./features/board/Board";

function App() {
  return (
    <Container maxW="6xl" py={30}>
      <Board />
    </Container>
  );
}

export default App;
