//create component navbar

import { Box, Button, Flex, Image } from "@chakra-ui/react";
import { auth } from "../../../firebase/clientApp";
import { FaKey, FaUserAlt, FaUserCircle } from "react-icons/fa";
import { SiHackthebox } from "react-icons/si";
import { Logo } from "../";
import { GoSignOut } from "react-icons/go";
import { AiFillHome } from "react-icons/ai";
import { ThemeButton } from "../ThemeButton/ThemeButton";
interface BoxProps {
  backgroundtype?: "clear" | "blur";
  login?: "logged_in" | "logged_out";
  darkmode?: string;
  [key: string]: any;
}
export const NavBar: React.FC<BoxProps> = ({
  backgroundtype,
  login,
  darkmode,
  ...props
}: BoxProps) => {
  if (!login) {
    login = "logged_out";
  }

  let backdropfilter = undefined;
  let bordercolor = undefined;
  let borderwidth = undefined;
  let fontcolor = undefined;
  let fontcolor2 = undefined;
  let backgroundimage = undefined;
  let backgroundcolor = undefined;
  let shadowvalue = undefined;
  if (backgroundtype) {
    if (backgroundtype === "clear") {
      backdropfilter = "none";
      bordercolor = "none";
      borderwidth = "0";
      fontcolor = "white";
      fontcolor2 = "black";
      backgroundimage = "linear-gradient(white, white)";
      backgroundcolor = "none";
      shadowvalue = "none";
    }
    if (backgroundtype === "blur") {
      backdropfilter = "blur(5px)";
      fontcolor = "black";
      fontcolor2 = "white";
      backgroundimage = "linear-gradient(to right, #313860, #151928)";
      backgroundcolor = "rgba(255, 255, 255, 0.5)";
      shadowvalue = "md";
    }
  }

  let style1 = {
    fontSize: "14px",
  };
  let style2 = {
    alignItems: "center",
    display: "flex",
    justifyContent: "center",
  };

  return (
    <Flex
      position="absolute"
      w="80vw"
      mt="50px"
      left="50%"
      transform="translate(-50%, -50%)"
      zIndex="1000"
      shadow={shadowvalue}
      backgroundColor={backgroundcolor}
      backdropFilter={backdropfilter}
      borderColor={bordercolor}
      borderWidth={borderwidth}
      borderRadius="12px"
      alignItems="center"
      justifyContent="space-between"
      h="50px"
      {...props}
    >
      <Box as="button" marginLeft="20px" borderRadius="md" color={fontcolor}>
        <Logo h="20px" darkMode="false" />
      </Box>
      <Flex
        margin="auto"
        marginRight="auto"
        marginTop="10px"
        pl="90px"
        h="30px"
        gap="20px"
      >
        {login === "logged_in" ? (
          <>
            <Box
              as="button"
              style={Object.assign(style1)}
              borderRadius="md"
              color={fontcolor}
              px={2}
              h={8}
              onClick={() => {
                window.location.href = "/profile";
              }}
            >
              <Box style={style2}>
                <FaUserCircle />
                &nbsp;PROFILE
              </Box>
            </Box>
            <Box
              as="button"
              style={Object.assign(style1)}
              borderRadius="md"
              color={fontcolor}
              px={2}
              h={8}
              onClick={() => {
                auth.signOut();
                window.location.href = "/#";
              }}
            >
              <Box style={style2}>
                <GoSignOut />
                &nbsp;LOG OUT
              </Box>
            </Box>
            <Box
              as="button"
              style={Object.assign(style1)}
              borderRadius="md"
              color={fontcolor}
              px={2}
              h={8}
              onClick={() => {
                window.location.href = "/homepage";
              }}
            >
              <Box style={style2}>
                <AiFillHome />
                &nbsp;HOME PAGE
              </Box>
            </Box>
          </>
        ) : (
          <>
            {" "}
            <Box
              as="button"
              style={Object.assign(style1)}
              borderRadius="md"
              color={fontcolor}
              px={2}
              h={8}
              onClick={() => {
                window.location.href = "/login";
              }}
            >
              <Box style={style2}>
                <FaKey />
                &nbsp;SIGN IN
              </Box>
            </Box>
            <Box
              as="button"
              style={Object.assign(style1)}
              borderRadius="md"
              color={fontcolor}
              px={2}
              h={8}
              onClick={() => {
                window.location.href = "/register";
              }}
            >
              <Box style={style2}>
                <FaUserCircle />
                &nbsp;SIGN UP
              </Box>
            </Box>
            <Box
              as="button"
              style={Object.assign(style1)}
              borderRadius="md"
              color={fontcolor}
              px={2}
              h={8}
              onClick={() => {
                window.location.href = "/homepage";
              }}
            >
              <Box style={style2}>
                <AiFillHome />
                &nbsp;HOME PAGE
              </Box>
            </Box>
          </>
        )}
      </Flex>
      <ThemeButton
        mr="10px"
        width="130px"
        mt="5px"
        height="30px"
        bottom="2.5px"
        borderRadius="20px"
        color={fontcolor2}
        backgroundImage={backgroundimage}
        fontSize="10px"
        fontWeight="medium"
      >
        Look at previous trips
      </ThemeButton>
    </Flex>
  );
};
