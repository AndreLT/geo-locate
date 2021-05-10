import React, { useEffect, useState } from "react";
import { Flex, Text, Spacer, Box, Heading, Button } from "@chakra-ui/react";
import { analytics } from "../lib/firebase";
import { useAuth } from "../providers/UserProvider";

import Map from "./Map";

const Dashboard = ({ user }) => {
  const [location, setLocation] = useState(false);
  const auth = useAuth();

  const showPosition = (position) => {
    setLocation([position.coords.longitude, position.coords.latitude]);
    localStorage.setItem("geo-locate-last-location", position);
    analytics.logEvent("location_rendered");
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else {
      alert("Geolocation not supported");
    }
  }, []);

  return (
    <Flex
      direction="column"
      align="center"
      justify="center"
      w="90%"
      h="90%"
      borderWidth="1px"
      py="10"
      px="10"
      borderRadius="lg"
      boxShadow="md"
    >
      {location ? (
        <Flex w="80%">
          <Box>
            <Heading size="md" color="blue.400">
              Your Coordinates:
            </Heading>
            <Text>Latitude: {location[1]}</Text>
            <Text>Longitude: {location[0]}</Text>
          </Box>
          <Spacer />
          <Box>
            <Text fontWeight="bold" color="gray.600">
              Signed in as {user.name}
            </Text>
            <Button onClick={() => auth.signOut()}>Signout</Button>
          </Box>
        </Flex>
      ) : (
        <Text>Getting your location...</Text>
      )}
      <Map coords={location} />
    </Flex>
  );
};

export default Dashboard;
