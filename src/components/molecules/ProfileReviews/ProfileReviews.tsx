import {
  Box,
  VStack,
  HStack,
  Card,
  CardHeader,
  CardBody,
  Text,
  Center,
  Spacer,
  Heading,
  Image,
  useColorModeValue,
} from "@chakra-ui/react";
import { Rating } from "../../atoms/Rating/Rating";

interface ProfileReviewsProps {
  userNames: Array<String>;
  reviews: Array<number>;
  description: Array<String>;
  profileURL: any;
}

export const ProfileReviews: React.FC<ProfileReviewsProps> = ({
  userNames,
  profileURL,
  reviews,
  description,
  ...props
}) => {

  const bgCompontent = useColorModeValue("teal.100", "teal.800");
  return (
    <Card borderRadius="2xl" width="32%" bg="hovComp">
      <CardHeader pb="0px">
        <Heading size="md">Reviews</Heading>
      </CardHeader>
      <CardBody>
        <VStack align={"strech"}>
          {userNames.map((name, index) => (
            <HStack
              align={"center"}
              h="72px"
              bg={bgCompontent}
              borderRadius="2xl"
              spacing="24px"
            >
              <Image src={profileURL} boxSize={50} ml="10px" borderRadius="2xl" />
              <VStack spacing={1} align={"flex-start"}>
                <Heading size="sm">{name}</Heading>
                <Text size="xs">{description[index]}</Text>
              </VStack>
              <Spacer />
              <Center width={"xs"}>
                <Rating stars={reviews[index]} size="small"></Rating>
              </Center>
            </HStack>
          ))}
        </VStack>
      </CardBody>
    </Card>
  );
};
