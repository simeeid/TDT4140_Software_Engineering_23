import { SidepanelButton } from "../../atoms/SidepanelButton/SidepanelButton";
import { Box, Flex, Text, useColorMode, Button } from "@chakra-ui/react";
import { AiFillHome, AiFillStar } from "react-icons/ai";
import { MdBackpack } from "react-icons/md";
import {
  BsFillCreditCardFill,
  BsFillPersonFill,
  BsPlusLg,
} from "react-icons/bs";
import { GoSignIn, GoSignOut } from "react-icons/go";
import { IoRocketSharp } from "react-icons/io5";
import { FaSignOutAlt } from "react-icons/fa";
import { auth } from "../../../firebase/clientApp";
import { ThemeButton } from "../../atoms/ThemeButton/ThemeButton";

interface ButtonsProps {
  size?: "small" | "medium" | "large";
  onClick?: () => void;
  [key: string]: any;
  gapSize?: string;
  height?: string;
  width?: string;
  type?: "logged_in" | "logged_out";
  selected?:
    | "home"
    | "mytrips"
    | "ratedtrips"
    | "addtrips"
    | "profile"
    | "billing";
}

export const SidebarButtons: React.FC<ButtonsProps> = ({
  type,
  onClick,
  selected,
  children,
  ...props
}) => {
  if (!type) {
    const type = "logged_out";
  }

  let dir = {
    home: false,
    mytrips: false,
    ratedtrips: false,
    addtrips: false,
    profile: false,
    billing: false,
  };

  if (!selected) {
    dir["home"] = true;
  } else {
    dir[selected] = true;
  }
  return (
    <Box w={props.width} textAlign="center">
      <Flex
        direction="column"
        gap={props.gapSize}
        alignItems={"center"}
        mb="20px"
      >
        <SidepanelButton
          icon={AiFillHome}
          selected={dir["home"]}
          size={props.size}
          href="/homepage"
        >
          Home
        </SidepanelButton>
        <SidepanelButton
          icon={MdBackpack}
          selected={dir["mytrips"]}
          size={props.size}
          href="/trips"
        >
          Trips
        </SidepanelButton>
        <SidepanelButton
          icon={BsPlusLg}
          selected={dir["addtrips"]}
          size={props.size}
          href="/addTrip"
        >
          Add trips
        </SidepanelButton>
        <SidepanelButton
          icon={BsFillCreditCardFill}
          selected={dir["billing"]}
          size={props.size}
          href="/billing"
        >
          Billing
        </SidepanelButton>

      </Flex>
      <Text fontSize="xl" mb="20px" mt="60px">
        Account Pages
      </Text>
      <Flex
        direction="column"
        gap={props.gapSize}
        alignItems={"center"}
        pb="25px"
      >
        {type === "logged_in" ? (
          <>
            {" "}
            <SidepanelButton
              icon={BsFillPersonFill}
              selected={dir["profile"]}
              size={props.size}
              href="/profile"
            >
              Profile
            </SidepanelButton>
            <SidepanelButton
              icon={GoSignOut}
              selected={false}
              size={props.size}
              href="/login"
              onClick={() => {
                auth.signOut();
              }}
            >
              Log out
            </SidepanelButton>
          </>
        ) : (
          <>
            {" "}
            <SidepanelButton
              icon={GoSignIn}
              selected={false}
              size={props.size}
              href="/login"
            >
              Sign In
            </SidepanelButton>
            <SidepanelButton
              icon={IoRocketSharp}
              selected={false}
              size={props.size}
              href="/register"
            >
              Sign Up
            </SidepanelButton>
          </>
        )}
        <ThemeButton
          w="80%"
          borderRadius="10px"
          mt="20px"
          color="white"
          light="teal.300"
          dark="teal.700"
        />
      </Flex>
    </Box>
  );
};
