import { StarIcon } from "@chakra-ui/icons";
import { HStack } from "@chakra-ui/react";
import React, { useState } from "react";

interface StarSliderProps {
  initialReview?: number;
}

export const StarSlider: React.FC<StarSliderProps> = ({ initialReview = 0 }) => {
  const [review, setReview] = useState(Math.max(0, Math.min(5, initialReview)));

  return (
    <HStack>
      {[...Array(5)].map((_, index) => (
        <StarIcon
          key={index}
          color={index < review ? "yellow.300" : "gray.300"}
          onClick={() => setReview(index + 1)}
          cursor="pointer"
          boxSize="30px"
        />
      ))}
    </HStack>
  );
};
