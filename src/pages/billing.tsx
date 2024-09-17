import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  HStack,
  Icon,
  Input,
  Link,
  Switch,
  Text,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
// Assets
import BgSignUp from "assets/img/BgSignUp.png";
import { SignInButton, InputField, NavBar } from "components/atoms/";
import { auth } from "../firebase/clientApp";
import { FaFacebook, FaInstagram, FaTwitter, FaPhoneAlt } from "react-icons/fa";
import { AiOutlineMail } from "react-icons/ai";
import { useEffect, useState } from "react";

export default function ContactUs() {
  const textColor = useColorModeValue("gray.600", "white");
  const bgColor = useColorModeValue("white", "gray.bg1");
  const bg = useColorModeValue("teal.300", "teal.700");
  const mainbg = useColorModeValue("gray.100", "gray.bg1");

  const [user, setUser] = useState(auth.currentUser);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setUser(user);
      console.log(user?.email);
    });
  }, []);

  return (
    <Flex
      direction="column"
      alignSelf="center"
      justifySelf="center"
      overflow="hidden"
    >
      <NavBar
        backgroundtype="clear"
        login={user ? "logged_in" : "logged_out"}
      />
      <Box
        position="absolute"
        minH={{ base: "70vh", md: "50vh" }}
        w={{ md: "calc(100vw - 50px)" }}
        borderRadius={{ md: "15px" }}
        left="0"
        right="0"
        bgRepeat="no-repeat"
        overflow="hidden"
        zIndex="-1"
        top="0"
        bgImage={`url(${BgSignUp.src})`}
        bgSize="cover"
        mx={{ md: "auto" }}
        mt={{ md: "14px" }}
      />
      <Flex
        direction="column"
        textAlign="center"
        justifyContent="center"
        align="center"
        mt="200px"
        mb="0px"
      ></Flex>
      <Flex alignItems="center" justifyContent="center" mb="60px" mt="20px">
        <Flex
          direction="column"
          w="445px"
          background="transparent"
          borderRadius="15px"
          p="40px"
          pt="20px"
          minH="400px"
          mx={{ base: "100px" }}
          bg={bgColor}
          boxShadow="0 20px 27px 0 rgb(0 0 0 / 5%)"
          alignItems="center"
        >
          <Text fontSize="3xl" textAlign="center" mb="22px" fontWeight={"bold"}>
            Billing
          </Text>

          <Text textAlign={"center"}>
            Do you want to increase the visibility of your trips? Became an
            advertiser
          </Text>

          <Button
            w="300px"
            h="50px"
            bg="teal.100"
            mt="50px"
            textColor="black"
          >
            Become an advertiser
          </Button>

          <Box
            color={bg}
            width="75%"
            alignItems="center"
            display="flex"
            justifyContent="space-between"
            m="auto"
            fontSize="50px"
            mt="90px"
          >
            <FaFacebook />
            <FaInstagram />
            <FaTwitter />
          </Box>
        </Flex>
      </Flex>
    </Flex>
  );
}
