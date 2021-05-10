import React, { useEffect, useState } from "react";
import { Box, Text, Button } from "@chakra-ui/react";

import Map from "./Map";

const Dashboard = ({ user }) => {
  const [location, setLocation] = useState(false);

  const showPosition = (position) => {
    setLocation([position.coords.longitude, position.coords.latitude]);
    localStorage.setItem("geo-locate-last-location", position);
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else {
      console.log("Geolocation not supported");
    }
  }, []);

  return (
    <Box>
      <Text>Signed in as {user.name}</Text>
      {location ? (
        <Text>
          You're at {location[0]}/{location[1]}
        </Text>
      ) : (
        <Text>Getting your location...</Text>
      )}
      <Map coords={location} />
    </Box>
  );
};

export default Dashboard;
