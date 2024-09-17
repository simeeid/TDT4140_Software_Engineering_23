import {
  ChevronLeftIcon,
  ChevronRightIcon,
  SettingsIcon,
} from "@chakra-ui/icons";
import {
  Flex,
  SimpleGrid,
  Grid,
  Box,
  Text,
  Image,
  Button,
  Card,
  CardBody,
  CardHeader,
  Icon,
  useColorModeValue,
  Avatar,
} from "@chakra-ui/react";
import BgSignUp from "assets/img/BgSignUp.png";

import "react-slideshow-image/dist/styles.css";
import {
  ContactUs,
  Logo,
  ProfileInformation,
  FavButton,
  FavoritesButton,
  TextArena,
} from "components/atoms";
import {
  ProjectPanel,
  DefaultHeader,
  SidebarButtons,
  ReviewCard,
  ImageSlider,
} from "components/molecules";
import {
  collection,
  doc,
  getDoc,
  limit,
  query,
  where,
} from "firebase/firestore";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { BsHeart, BsStar } from "react-icons/bs";
import { FaShareSquare } from "react-icons/fa";

// firebase
import { auth, db } from "../../firebase/clientApp";
import { TripTemplate } from "templates/tripTemplate";

export default function Index() {
  // Logic to set user state
  const [user, setUser] = useState(auth.currentUser);

  const [fav, setFav] = useState(false);

  const defaultImage =
    "https://i.natgeofe.com/k/e800ca90-2b5b-4dad-b4d7-b67a48c96c91/spain-madrid.jpg?w=636&h=358";
  const [slideImages, setSlideImages] = useState<string[]>([defaultImage]);

  const router = useRouter();
  const { tripId, tripJSON } = router.query;
  const trip: TripTemplate = JSON.parse(tripJSON ? (tripJSON as string) : "{}");

  const [favorite, setFavorite] = useState(false);

  console.log("tripId: ", tripId);
  console.log("tripJSON: ", tripJSON);
  console.log("trip: ", trip);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setUser(user);
      console.log(user?.email);
    });
  }, []);

  const [haveShared, setHaveShared] = useState(false);

  return (
    <Flex pt="5px">
      {/* SIDEPANEL */}
      <Flex
        minH={"100vh"}
        w="270px"
        flexDirection="column"
        pt="30px"
        alignItems="center"
        gap="20px"
      >
        <Flex
          mx="25px"
          pb="15px"
          mb="5px"
          w="80%"
          borderBottom="1px"
          borderColor="blackAlpha.200"
          justifyContent="center"
        >
          <Logo h="40px" />
        </Flex>
        <SidebarButtons
          size={"medium"}
          gapSize={"10px"}
          width={"100%"}
          type={user ? "logged_in" : "logged_out"}
          selected="ratedtrips"
        />
        <ContactUs />
      </Flex>

      <Flex w="80%" flexWrap="wrap">
        <Flex mt="20px" flexDirection="column" gap="20px" w="full" pr="10px">
          <ImageSlider
            slideRef={useRef(null)}
            images={
              trip?.pictures || [defaultImage, defaultImage, defaultImage]
            }
          />

          {/* Header, h1, add to favorite button, share button */}
          <Flex w="full" justifyContent="space-between" alignItems="center">
            <Text fontSize="4xl" fontWeight="bold">
              {trip?.title || "Trip to Backpacking in Spain with Guides!"}
            </Text>
            <Flex alignItems={"center"}>
              <FavButton
                favorites={trip?.favorites || []}
                tripID={tripId as string}
              />

              <Button
                colorScheme="teal"
                variant="link"
                size="sm"
                leftIcon={<Icon as={FaShareSquare} boxSize="25px" mb="2px" />}
                mx="10px"
                px="10px"
                _active={{ bg: "teal.100" }}
                onClick={() => {
                  navigator.clipboard.writeText(
                    // `https://pu.alfnes.dev/trip/${tripId}`
                    // `http://localhost:3000/trip/${tripId}`
                    `${window.location.href}`
                  );
                  setHaveShared(true);
                }}
              >
                {haveShared ? "Copied!" : "Share"}
              </Button>
            </Flex>
          </Flex>

          {/* Locations, in button, white buttons with box shadow*/}
          <Flex w="full" gap="10px">
            {[...(trip?.destinations || ["Madrid", "Barcelona", "Paris"])].map(
              (destination) => (
                <Button
                  bg="hovComp"
                  size="md"
                  width="130px"
                  fontWeight="semibold"
                  boxShadow="md"
                  _hover={{ boxShadow: "lg" }}
                >
                  {destination}
                </Button>
              )
            )}
          </Flex>

          {/* Trip description, Price estimate, Duration and rating. Big numbers, but small label over the numbers */}
          <Flex w="full" alignItems="center" gap="40px" mt="20px">
            <Flex flexDirection="column">
              <Text fontSize="sm" mb="-2">
                Price estimate:
              </Text>
              <Text m="0" fontSize="4xl" fontWeight="bold">
                €{trip?.cost ? trip.cost : 1539}
              </Text>
            </Flex>
            <Flex flexDirection="column">
              <Text fontSize="sm" mb="-2">
                Duration:
              </Text>
              <Text m="0" fontSize="4xl" fontWeight="bold">
                {trip?.duration ? trip.duration : 5} days
              </Text>
            </Flex>
            <Flex flexDirection="column">
              <Text fontSize="sm" mb="-2">
                Rating (501 reviews):
              </Text>
              <Text m="0" fontSize="4xl" fontWeight="bold">
                4.5 / 5
              </Text>
            </Flex>
          </Flex>

          <TextArena text={trip?.description || ""} length={520} />

          {/* STAR, "write a review" button */}

          <Button
            bg="teal.300"
            borderRadius="xl"
            color={"white"}
            w="220px"
            size="lg"
            mb="8px"
            leftIcon={<Icon as={BsStar} boxSize="30px" mr="5px" />}
          >
            Write a review
          </Button>

          <hr />

          {/* Reviews, 3 reviews, with a "..." and read more button */}
          <Text fontSize="2xl" fontWeight="bold">
            Reviews:
          </Text>

          <ReviewCard
            name="Kari Nordman"
            age="3 weeks ago"
            rating={5}
            length={360}
            avatar="https://i.pinimg.com/280x280_RS/c0/f9/77/c0f977bcd3a674f429463950b4c6428a.jpg"
            info="The journey of a lifetime! This trip exceeded my expectations and left me with unforgettable memories. The diverse landscapes, rich culture, and welcoming locals made this adventure an experience like no other. Highly recommend for anyone seeking a unique and immersive travel experience."
          />
          <ReviewCard
            name="Jesper Eriksen"
            age="3 weeks ago"
            rating={4}
            length={360}
            avatar="https://in4adventure.com/wp-content/uploads/2021/04/ericprofile.jpg"
            info="If you're looking for an adventure that will leave you with unforgettable memories, then is is the perfect choice for you. With its stunning landscapes, rich history, and unique cultural experiences, this destination is sure to capture your heart and leave you wanting more. From exploring ancient landmarks to embarking on thrilling outdoor activities, there's something for everyone. Whether you're a solo traveler, a couple, or a family, you'll find plenty of opportunities to connect with the local culture and create memories that will last a lifetime."
          />
          <ReviewCard
            name="Mei Lin"
            age="3 weeks ago"
            rating={5}
            length={360}
            avatar="https://img.freepik.com/premium-photo/vintage-photo-back-view-young-asian-woman-hiker-enjoy-nature-view-mountain-peak-cliff-big-sur-chinese-girl-backpacker-sitting-relaxing-rock-top-seeing-pacific-ocean-california-usa_678158-7001.jpg"
            info="An absolute must-do for any adventurous traveler! This trip offers a perfect balance of exploring new cultures, stunning landscapes, and exciting activities. I can't imagine a more rewarding way to experience a new country."
          />

          {user && (
            <ProjectPanel
              title="My Trips"
              tripQuery={query(
                collection(db, "trips"),
                where("userEmailAddress", "==", user?.email),
                limit(3)
              )}
            />
          )}
        </Flex>
      </Flex>
    </Flex>
  );
}
