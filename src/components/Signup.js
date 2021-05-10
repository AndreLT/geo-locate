import React, { useState } from "react";
import { useAuth } from "../providers/UserProvider";
import { Container, Heading, Box, Button, Text, Input } from "@chakra-ui/react";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState(null);
  const { signUpWithEmail } = useAuth();

  const onSubmit = (event, email, password, name) => {
    event.preventDefault();
    signUpWithEmail(email, password, name).catch((error) => {
      setError(error.message);
    });
  };

  const onChangeHandler = (event) => {
    const { name, value } = event.currentTarget;

    if (name === "userEmail") {
      setEmail(value);
    } else if (name === "userPassword") {
      setPassword(value);
    } else if (name === "username") {
      setName(value);
    }
  };

  return (
    <Container>
      <Heading size="md" pb="5">
        Sign Up
      </Heading>
      <Box>
        {error !== null && <Text color="red.400">{error}</Text>}
        <form>
          <Text mt="2px">Username</Text>
          <Input
            type="text"
            name="username"
            color="black"
            value={name}
            placeholder="Nickname"
            id="username"
            onChange={(event) => onChangeHandler(event)}
            mb="8px"
          />
          <Text mt="2px">Email</Text>
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
          <Text mt="2px">Password</Text>
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
              onSubmit(event, email, password, name);
            }}
            mt="5"
          >
            Sign up
          </Button>
        </form>
      </Box>
    </Container>
  );
};
export default Signup;
