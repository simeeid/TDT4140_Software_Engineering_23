import { Button } from "@chakra-ui/react";
interface ButtonProps {
  [key: string]: any;
  onclick?: () => void;
}

export const SignInButton: React.FC<ButtonProps> = ({ children, ...props }) => {
  return (
      <Button
        fontSize="10px"
        type="submit"
        bg="teal.300"
        w="100%"
        h="45"
        mb="20px"
        color="white"
        mt="20px"
        border={0}
        borderRadius="5px"
        _hover={{
          bg: "teal.200"
        }}
        _active={{
          bg: "teal.400"
        }}
        {...props}
      >
        {children}
      </Button>
  );
};
