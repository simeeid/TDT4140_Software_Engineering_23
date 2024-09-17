import { SettingsIcon } from "@chakra-ui/icons";
import {
  Flex,
  SimpleGrid,
  Grid,
  Box,
  Text,
  Button,
  Card,
  CardBody,
  CardHeader,
  Icon,
  useColorModeValue,
  Avatar,
} from "@chakra-ui/react";

interface HeaderProps {
  img_src: any;
  title: string;
  type?: "profile" | "homepage" | "newTrip";
  profilePic?: string | undefined | null;
  [key: string]: any;
}

const AvatarIcon = ({ ...props }: { [key: string]: any }) => {
  return (
    <Avatar
      src="https://bit.ly/dan-abramov"
      color="white"
      size="md"
      mr="10px"
      showBorder={true}
      {...props}
    />
  );
};

export const DefaultHeader: React.FC<HeaderProps> = ({
  img_src,
  title,
  type,
  profilePic,
  ...props
}) => {
  if (!type) {
    const type = "homepage";
  }

  if (type === "newTrip") {
    return (
      <Flex
        h="50px"
        w="100%"
        bgSize="cover"
        px="0px"
        justifyContent="space-between"
      >
        <Box>
          <Text> Pages / Add Trip</Text>
          <Text fontWeight="bold"> Add Trip</Text>
        </Box>
        <Flex alignItems="center" onClick={() => { window.location.href = "/profile" }} style={{ cursor: "pointer" }}>
          {title === "You are logged out" ? null : <AvatarIcon src={profilePic} name={title} />}
          <Text fontWeight="bold" mr="10px">
            {title}
          </Text>
          <SettingsIcon boxSize="20px" />
        </Flex>
      </Flex>
    );
  }

  return (
    <Box
      h="200px"
      borderRadius="2xl"
      w="100%"
      bgImage={img_src}
      bgSize="cover"
      px="0px"
      flexDirection="column"
    >
      <Flex h="10px" px="20px" pt="15px" justifyContent="space-between">
        <Box>
          <Text color="white"> Pages / Backpack Trips</Text>
          <Text color="white" fontWeight="bold">
            {" "}
            Backpack Trips
          </Text>
        </Box>
        <Flex color="white" alignItems="center" mt="20px" onClick={() => { window.location.href = "/profile" }} style={{ cursor: "pointer" }}>
          {type === "profile" ? null : (
            title === "You are logged out" ? null : <AvatarIcon src={profilePic} name={title} />
          )}
          <Text fontWeight="bold" color="white" mr="10px">
            {title}
          </Text>
          <SettingsIcon boxSize="20px" />
        </Flex>
      </Flex>
      {/* BLURR */}
      <Box backdropFilter="blur(8px)" w="98%" mt="140px">
        <Flex
          h="80px"
          borderRadius="2xl"
          boxShadow="0px 4px 4px rgba(0, 0, 0, 0.15)"
          bg="defaultHeader"
          align="center"
          justify="space-between"
        >
          {type === "profile" ? (
            <>
              <AvatarIcon
                borderRadius="15px"
                ml="20px"
                size="lg"
                src={profilePic}
                name={title}
              />
            </>
          ) : (
            <>
              <Text ml="20px" fontSize="5xl" fontWeight="bold">
                Backpack trips
              </Text>
              <Flex mr="10px" gap="10px">
                <Button
                  borderRadius="2xl"
                  fontSize="2xs"
                  width="100px"
                  bg="hovComp"
                  boxShadow="base"
                  onClick={() => {
                    window.location.href = "/addTrip";
                  }}
                >
                  ADD A TRIP
                </Button>
                <Button
                  borderRadius="2xl"
                  fontSize="2xs"
                  width="100px"
                  bg="hovComp"
                  boxShadow="base"
                >
                  LIST VIEW
                </Button>
                <Button
                  borderRadius="2xl"
                  fontSize="2xs"
                  bg="transparent"
                  _hover={{ bg: "hovComp" }}
                >
                  SEARCH
                </Button>
              </Flex>
            </>
          )}
        </Flex>
      </Box>
    </Box>
  );
};
