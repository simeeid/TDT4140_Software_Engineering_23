import {
  Image,
  Flex,
  Button,
  Grid,
  GridItem,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { Rating } from "../../atoms";
import Link from "next/link";
import { useRouter } from "next/router";
import { TripTemplate } from "templates/tripTemplate";
import { json } from "stream/consumers";

interface Cardprops {
  reviewCount?: number;
  rating: number;
  trip: TripTemplate;
}

export const ProjectCard: React.FC<Cardprops> = ({
  reviewCount,
  rating,
  trip,
}) => {
  const router = useRouter();

  return (
    <Flex
      w="260px"
      h="220px"
      borderRadius="2xl"
      overflow="hidden"
      boxShadow="md"
    >
      <Grid
        h="100%"
        w="100%"
        templateColumns="1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr"
        templateRows="1fr 1fr 1fr 1fr"
        gap="5px"
        borderRadius="2xl"
        borderColor="hovComp"
        borderWidth="1px"
      >
        <GridItem
          colSpan={10}
          rowSpan={1}
          bg="teal.500"
          w="260px"
          h="120px"
          borderRadius="2xl"
        >
          <Image
            src={
              trip?.pictures
                ? trip.pictures[0]
                : "gs://vamos-pu.appspot.com/images/spain3.webp"
            }
            alt="Your Image"
            boxSize="100%"
            borderRadius="2xl"
            borderBottomRadius="0px"
            objectFit="cover"
          />
        </GridItem>
        <GridItem
          colSpan={8}
          rowSpan={4}
          bg="hovComp"
          fontWeight="bold"
          lineHeight="tight"
          noOfLines={2}
          position="relative"
          pt="5px"
        >
          <Text
            ml="13px"
            lineHeight={1}
            noOfLines={2}
          >{`${trip?.title ? trip.title : "Trip Title"}`}</Text>
        </GridItem>
        <GridItem
          colSpan={2}
          rowSpan={1}
          bg="hovComp"
          w="100%"
          h="100%"
          lineHeight="tight"
          pt="0px"
        >
          <Rating
            stars={rating}
            size="small"
            mt="5px"
            fontWeight="semibold"
            lineHeight="tight"
            marginTop="5px"
          />
        </GridItem>
        <GridItem
          colSpan={10}
          rowSpan={1}
          bg="hovComp"
          w="100%"
          h="100%"
          fontSize={8}
        >
          <Text ml="13px" textColor="gray.400" noOfLines={1}>
            {trip?.description ? trip.description : "Undefined description"}
          </Text>
        </GridItem>
        <GridItem colSpan={4} rowSpan={1} w="100%" h="100%" textAlign="center">
          <Button
            w="85%"
            h="80%"
            variant="outline"
            colorScheme="teal"
            p="3px"
            borderRadius="15"
            fontSize="9px"
            alignItems={"center"}
            ml="8px"
            onClick={() => {
              router.push({
                pathname: "/trip/" + trip.id,
                query: { tripJSON: JSON.stringify(trip) },
              });
            }}
          >
            VIEW TRIP
          </Button>
        </GridItem>
        <GridItem
          colSpan={6}
          rowSpan={2}
          bg="hovComp"
          w="100%"
          h="100%"
          p="2px"
          fontSize={12}
          style={{ wordWrap: "break-word" }}
        >
          <Flex justifyContent="space-between">
            {trip.duration && (
              <Text mt="3px" ml="4px" fontWeight="bold" lineHeight="tight">
                {trip.duration} {trip.duration === 1 ? "day" : "days"}
              </Text>
            )}
            {trip.cost && (
              <Text fontWeight="bold" lineHeight="tight" mr="20px" mt="3px">
                {trip.cost}€
              </Text>
            )}
          </Flex>
        </GridItem>
      </Grid>
    </Flex>
  );
};
