import { Text, Button, Flex } from "@chakra-ui/react";
import { useState } from "react";
interface TextArenaProps {
  text: string;
  length?: number;
  [key: string]: any;
}

export const TextArena: React.FC<TextArenaProps> = ({ text, length, ...props }) => {
  
  if (!length) {
    length = 100;
  }
  //   <Flex flexDirection="column" position={"relative"} alignItems="start">
  //   <Text>
  //     Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
  //     tincidunt, nisl eget ultricies tincidunt, nisl nisl aliquam nisl,
  //     et aliquam nisl nisl sit amet nisl. Sed tincidunt, nisl eget
  //     ultricies tincidunt, nisl nisl aliquam nisl, et aliquam nisl nisl
  //     sit amet nisl. Sed tincidunt, nisl eget ultricies tincidunt, nisl
  //     nisl aliquam nisl, et aliquam nisl nisl sit amet nisl. Sed
  //     tincidunt, nisl eget ultricies tincidunt, nisl nisl aliquam nisl,
  //     et aliquam nisl nisl sit amet nisl. Sed tincidunt, nisl eget
  //     ultricies tincidunt, nisl nisl aliquam nisl, et aliquam nisl nisl
  //     sit amet nisl. Sed tincidunt, nisl eget ultricies tincidunt, nisl
  //     nisl aliquam nisl, et aliquam nisl nisl sit amet...
  //   </Text>
  //   <Button variant="link" mt="4px" colorScheme="black">
  //     {" "}
  //     Read More
  //   </Button>
  // </Flex>

  // If the text is to long, slice the text and add "..." at the end and add a "Read More" button.
  // add also a "Read Less" button if the text is already sliced.
  // make the it so that it functional

  const [viewText, setViewText] = useState(text.length > length);

  const toggleViewText = () => {
    setViewText(!viewText);
  };
  return (
    <Flex flexDirection="column" position={"relative"} alignItems="start">
      {/* <Text>{viewText ? text.slice(0, length) + "..." : text}</Text> */}
      <Text>
        {
          viewText && text.length > length ? text.slice(0, length) + "..." : text
        }
      </Text>
      <Button
        variant="link"
        mt="4px"
        colorScheme="black"
        onClick={toggleViewText}
      >
        { text.length > length && (viewText ? "Read More" : "Read Less") }
      </Button>
    </Flex>
  );
};
