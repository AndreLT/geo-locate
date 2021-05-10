import React, { useState } from "react";
import { Box, Flex, Button } from "@chakra-ui/react";

import Dashboard from "./Dashboard";
import SignIn from "./SignIn";
import Signup from "./Signup";
import { useAuth } from "../providers/UserProvider";

function App() {
  const auth = useAuth();
  const [signin, setSignin] = useState(true);

  return (
    <Flex justify="center" width="100%" height="100vh" align="center">
      {auth.user ? (
        <Dashboard user={auth.user} />
      ) : (
        <Box borderWidth="1px" py="10" px="10" borderRadius="lg" boxShadow="md">
          {signin ? <SignIn /> : <Signup />}
          {signin ? (
            <Button
              size="xs"
              mt="4"
              ml="4"
              variant="link"
              onClick={() => setSignin(false)}
            >
              Don't hava an account? Signup
            </Button>
          ) : (
            <Button
              size="xs"
              mt="4"
              ml="4"
              variant="link"
              onClick={() => setSignin(true)}
            >
              Already have an account? Signin
            </Button>
          )}
        </Box>
      )}
    </Flex>
  );
}

export default App;
