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
        >
          <Text fontSize="3xl" color={textColor} textAlign="center" mb="22px">
            Contact Us
          </Text>

          {/* TODO: Setup icons and text */}
          <Box display="flex" flexDirection="row" alignItems="center" mb="10px">
            <Box
              pt="2px"
              pb="2px"
              pl="5px"
              pr="5px"
              //border="1px solid"
              borderColor={bg}
              borderRadius="12px"
              color={bg}
              fontSize="40px"
              mr="10px"
            >
              <AiOutlineMail />
            </Box>
            <Text>Email: contactus@vamos.com</Text>
          </Box>
          <Box display="flex" flexDirection="row" alignItems="center" mb="20px">
            <Box
              pt="6px"
              pb="6px"
              pl="10px"
              pr="10px"
              //border="1px solid"
              borderColor={bg}
              borderRadius="12px"
              color={bg}
              fontSize="30px"
              mr="10px"
            >
              <FaPhoneAlt />
            </Box>
            <Text>Phone: 123-45-678</Text>
          </Box>
          <Text
            display="flex"
            flexDirection="row"
            alignItems="center"
            margin="auto"
            mb="20px"
            mt="18px"
          >
            Or fill in the form
          </Text>
          <Text>Full name</Text>
          <InputField placeholder="Your full name" radius="medium" />
          <Text>Email</Text>
          <InputField placeholder="Your email" radius="medium" />
          <Text>Message</Text>
          <InputField placeholder="Your message" radius="medium" />
          <SignInButton>Contact us</SignInButton>
          <Box
            color={bg}
            width="75%"
            alignItems="center"
            display="flex"
            justifyContent="space-between"
            m="auto"
            fontSize="50px"
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
