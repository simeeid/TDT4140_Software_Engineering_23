import { QuestionIcon } from "@chakra-ui/icons";
import { Box, Flex, SimpleGrid } from "@chakra-ui/react";
import { Text } from "@chakra-ui/react";
import { Button, ButtonGroup } from "@chakra-ui/react";
import { Center, Square, Circle } from "@chakra-ui/react";

interface ContactUsProps {
  [key: string]: any;
}

export const ContactUs: React.FC<ContactUsProps> = ({ ...props }) => {
  return (
    <Center bg="teal.300" width={218} height={169.5} borderRadius="2xl">
      <SimpleGrid columns={1} spacing={5}>
        <Center bg="white" width={35} height={35} borderRadius="xl">
          <QuestionIcon boxSize={5} color="teal.300" />
        </Center>

        <Text fontSize="lg" as="b" color="white">
          Need help?
        </Text>

        <Button
          backgroundColor="white"
          width={186}
          height={35}
          fontSize="xs"
          as="b"
          textColor={"black"}
          borderRadius="xl"
          cursor="pointer"
          // onclick redirect to ./contact
          onClick={() => {
            window.location.href = "/contact";
          }}
        >
          Contact us!
        </Button>
      </SimpleGrid>
    </Center>
  );
};
