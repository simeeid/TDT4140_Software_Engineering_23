import { Button, useColorMode, useColorModeValue } from "@chakra-ui/react";
interface ButtonProps {
  light?: string;
  dark?: string;
  [key: string]: any;
}

export const ThemeButton: React.FC<ButtonProps> = ({
  light,
  dark,
  ...props
}) => {
  const { colorMode, toggleColorMode } = useColorMode();

  const bg = useColorModeValue(light, dark);
  return (
    <Button type="button" onClick={toggleColorMode} bg={bg} {...props}>
      Toggle {colorMode === "light" ? "Dark" : "Light"} Mode
    </Button>
  );
};
