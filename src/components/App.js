import { BrowserRouter as Router } from "react-router-dom";
import SignIn from "./SignIn";
import { Box, Text, Flex, Button } from "@chakra-ui/react";

import Dashboard from "./Dashboard";
import { useAuth } from "../providers/UserProvider";

function App() {
  const auth = useAuth();

  return (
    <Flex justify="center" width="100%" height="100vh" align="center">
      <Box
        w="50%"
        borderWidth="1px"
        py="10"
        px="10"
        borderRadius="lg"
        boxShadow="md"
      >
        {auth.user ? <Dashboard user={auth.user} /> : <SignIn />}
        <Button onClick={() => console.log(auth.user)}>user</Button>
      </Box>
    </Flex>
  );
}

export default App;
