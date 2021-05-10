import { BrowserRouter as Router } from "react-router-dom";
import SignIn from "./SignIn";
import { Box, Center, Flex } from "@chakra-ui/react";

function App() {
  return (
    <Flex justify="center" width="100%" height="100vh" align="center">
      <Box w="50%" borderWidth="1px" py="10" borderRadius="lg" boxShadow="md">
        <Router>
          <SignIn />
        </Router>
      </Box>
    </Flex>
  );
}

export default App;
