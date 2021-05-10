import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../providers/UserProvider";
import { Container, Heading, Box, Button, Text, Input } from "@chakra-ui/react";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState(null);
  const { signInWithEmail, signUpWithEmail } = useAuth();

  const onSubmit = (event, email, password, name) => {
    event.preventDefault();
    signUpWithEmail(email, password, name).catch((error) => {
      setError(error.message);
      console.log(error.message);
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
      <Heading size="md">Sign In</Heading>
      <Box>
        {error !== null && <Text color="red.400">{error}</Text>}
        <form>
          <Text mb="8px">Username</Text>
          <Input
            type="text"
            name="username"
            color="black"
            value={name}
            placeholder="E.g: faruq123@gmail.com"
            id="username"
            onChange={(event) => onChangeHandler(event)}
          />
          <Text mb="8px">Email</Text>
          <Input
            type="email"
            name="userEmail"
            color="black"
            value={email}
            placeholder="E.g: faruq123@gmail.com"
            id="userEmail"
            onChange={(event) => onChangeHandler(event)}
          />
          <Text mb="8px">Password</Text>
          <Input
            type="password"
            className="mt-1 mb-3 p-1 w-full"
            name="userPassword"
            value={password}
            placeholder="Your Password"
            id="userPassword"
            onChange={(event) => onChangeHandler(event)}
          />
          <Button
            onClick={(event) => {
              onSubmit(event, email, password, name);
            }}
          >
            Sign in
          </Button>
        </form>
      </Box>
    </Container>
  );
};
export default SignIn;
