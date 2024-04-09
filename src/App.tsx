import { Container } from "@chakra-ui/react";
import Board from "./features/board/Board";
import { useEffect } from "react";
import { useAppDispatch } from "./app/hooks";
import { fetchRepo } from "./features/board/reposSlice";

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchRepo({ repo: "react", owner: "facebook" }));
  });

  return (
    <Container maxW="6xl" py={30}>
      <Board />
    </Container>
  );
}

export default App;
