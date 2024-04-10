import { Container } from "@chakra-ui/react";
import { Repo } from "./features/repo";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    fetch("https://api.github.com/repos/facebook/react/issues?state=all")
      .then((res) => res.json())
      .then(console.log);
  }, []);

  return (
    <Container maxW="6xl" py={30}>
      <Repo />
    </Container>
  );
}

export default App;
