import { TextArena } from "../../atoms/TextArena/TextArena";
import { Avatar, Flex, Icon, Text } from "@chakra-ui/react";
import { BsStar } from "react-icons/bs";

interface ReviewCardProps {
  name: string;
  age: string;
  rating: number;
  avatar: string;
  length?: number;
  info?: string;
  [key: string]: any;
}

export const ReviewCard: React.FC<ReviewCardProps> = ({name, age, rating, avatar, length, info, ...props}) => {
  return (
    <Flex
    flexDirection="column"
    position={"relative"}
    alignItems="start"
    mb="10px"
  >
    {/* avatar, name, rating, and how old post is */}
    <Flex alignItems="center" gap="10px" mb="10px">
      <Avatar
        size="md"
        name={name}
        src={avatar}
        borderRadius="2xl"
      />
      <Flex flexDirection="column">
        <Flex>
          <Text fontSize="md" fontWeight="bold">
            {name}
          </Text>
          <Text fontSize="md" ml="6px">
            {age}
          </Text>
        </Flex>
        <Flex alignItems="center" gap="5px">
          <Icon as={BsStar} boxSize="25px" color="teal.300" />
          <Text fontSize="xl" fontWeight="bold">
            {rating} / 5
          </Text>
        </Flex>
      </Flex>
    </Flex>
    { info !== undefined && <TextArena text={info} length={length} /> }
  </Flex>
  );
    
};