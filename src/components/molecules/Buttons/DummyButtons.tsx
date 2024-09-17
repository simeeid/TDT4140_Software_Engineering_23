import { DummyButton } from "../../atoms/Button/DummyButton";
import { Box } from "@chakra-ui/react";

interface ButtonsProps {
  size?: "small" | "medium" | "large";
  onClick?: () => void;
  [key: string]: any;
}

export const DummyButtons: React.FC<ButtonsProps> = ({size, onClick, children, ...props}) => {
  return (
    <Box>
      <DummyButton size={size} onClick={onClick} {...props}>{children}</DummyButton>
      <DummyButton size={size} onClick={onClick} {...props}>{children}</DummyButton>
      <DummyButton size={size} onClick={onClick} {...props}>{children}</DummyButton>
    </Box>
  );
    
};