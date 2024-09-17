import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { Box, Icon, Text } from "@chakra-ui/react";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";

interface ImageSliderProps {
  slideRef: any;
  images: string[];
  [key: string]: any;
}

export const ImageSlider: React.FC<ImageSliderProps> = ({
  slideRef,
  images,
  ...props
}) => {
  const slideImagesWithNumber = images.map((slideImage, index) => {
    return {
      url: slideImage,
      caption: `${index + 1} / ${images.length}`,
    };
  });

  return (
    <Box borderRadius="2xl" overflow="hidden" position="relative">
      <Slide arrows={false} autoplay={false} ref={slideRef}>
        {slideImagesWithNumber.map((slideImage, index) => (
          <Box
            key={index}
            h="400px"
            w="100%"
            bgImage={`url(${slideImage.url})`}
            position="relative"
            bgSize="cover"
          >
            <Text
              position="absolute"
              left="50%"
              bottom="10px"
              bg="blackAlpha.500"
              color="gray.300"
              px="10px"
              py="5px"
              borderRadius="10px"
            >
              {slideImage.caption}
            </Text>
          </Box>
        ))}
      </Slide>
      {/* button for previous img */}

      <Icon
        as={ChevronLeftIcon}
        onClick={() => slideRef.current.goBack()}
        position="absolute"
        top="42%"
        left="10px"
        cursor="pointer"
        boxSize="50px"
        color="gray.400"
        bg="blackAlpha.300"
        borderRadius="20%"
        _hover={{ color: "gray.500" }}
      />
      <Icon
        as={ChevronRightIcon}
        onClick={() => slideRef.current.goNext()}
        position="absolute"
        top="42%"
        right="10px"
        cursor="pointer"
        boxSize="50px"
        color="gray.300"
        bg="blackAlpha.500"
        borderRadius="20%"
        _hover={{ color: "gray.400" }}
      />
    </Box>
  );
};
