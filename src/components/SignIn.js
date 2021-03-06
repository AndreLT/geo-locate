import React, { useState } from "react";
import { useAuth } from "../providers/UserProvider";
import { Container, Heading, Box, Button, Text, Input } from "@chakra-ui/react";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const { signInWithEmail } = useAuth();

  const onSubmit = (event, email, password) => {
    event.preventDefault();
    signInWithEmail(email, password).catch((error) => {
      setError(error.message);
    });
  };

  const onChangeHandler = (event) => {
    const { name, value } = event.currentTarget;

    if (name === "userEmail") {
      setEmail(value);
    } else if (name === "userPassword") {
      setPassword(value);
    }
  };

  return (
    <Container>
      <Heading size="md" pb="5">
        Sign In
      </Heading>
      <Box>
        {error !== null && <Text color="red.400">{error}</Text>}
        <form>
          <Text mt="2">Email</Text>
          <Input
            type="email"
            name="userEmail"
            color="black"
            value={email}
            placeholder="andre@email.com"
            id="userEmail"
            onChange={(event) => onChangeHandler(event)}
            mb="8px"
          />
          <Text mt="2">Password</Text>
          <Input
            type="password"
            name="userPassword"
            value={password}
            placeholder="Your Password"
            id="userPassword"
            onChange={(event) => onChangeHandler(event)}
            mb="8px"
          />
          <Button
            onClick={(event) => {
              onSubmit(event, email, password);
            }}
            mt="5"
          >
            Sign in
          </Button>
        </form>
      </Box>
    </Container>
  );
};
export default SignIn;
