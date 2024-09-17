//Create component footer to hold information at the bottom of the page

import { Box, Image, Flex, Text, Link } from "@chakra-ui/react";
import { Logo } from "../";

interface FooterProps {
  [key: string]: any;
}

export const Footer: React.FC<FooterProps> = () => {
  return (
    <Flex alignItems="center" h="50px" mt="50px" justifyContent="space-between">
      <Flex alignItems="center" ml="30px">
        <Text mr="5px">&copy; 2023</Text>
        <Logo h="20px" mr="20px" />
        <Text color="gray.400">
          {" "}
          Made by Sondre Alfnes, Axel Mender, Jakob Relling, Ragni Bonvik, Simen
          Eidal & Trygve Ruud
        </Text>
      </Flex>
      <Box mr="40px">
        <Text
          color="gray.400"
          onClick={() => {
            window.location.href = "/contact";
          }}
          cursor="pointer"
          _hover={{ color: "gray.900" }}
        >
          Contact us
        </Text>
      </Box>
    </Flex>
  );
};
