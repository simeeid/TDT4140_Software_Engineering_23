import { SettingsIcon } from "@chakra-ui/icons";
import { FaToggleOff, FaToggleOn } from "react-icons/fa";
import {
  Flex,
  SimpleGrid,
  Grid,
  Box,
  Text,
  Button,
  Card,
  CardBody,
  CardHeader,
  Icon,
  useColorModeValue,
  Input,
  Image,
  Avatar,
  Textarea,
  IconButton,
  Switch,
} from "@chakra-ui/react";
import BgSignUp from "assets/img/BgSignUp.png";
import { ContactUs, Logo } from "components/atoms";
import {
  ProjectPanel,
  DefaultHeader,
  SidebarButtons,
} from "components/molecules";
import { useState, useEffect } from "react";

// firebase
import { auth, db, storage } from "../firebase/clientApp";
import { setDoc, doc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

// templates
import { TripTemplate } from "templates/tripTemplate";
  
export default function Index() {
  // Logic to set user state
  const [user, setUser] = useState(auth.currentUser);
  const [isToggled, setIsToggled] = useState(false);

  // add useeffect of onAuthStateChanged
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setUser(user);
    });
  }, []);

  const [localTripTemplate, setLocalTripTemplate] = useState<TripTemplate>();

  // add trip to database
  const addTrip = () => {
    console.log(localTripTemplate);
    const randomId: string =
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15);

    if (!user) {
      alert("You are not logged in. You need to be logged in to add a trip.");
      return;
    }
    if (
      !localTripTemplate ||
      !localTripTemplate?.title ||
      !localTripTemplate?.description ||
      !localTripTemplate?.cost ||
      !localTripTemplate?.duration
    ) {
      alert("You need to fill in all the fields.");
      return;
    }

    if (!localTripTemplate.pictures) {
      alert("You need to upload at least one picture.");
      return;
    }

    setDoc(doc(db, "trips", randomId), {
      title: localTripTemplate?.title,
      userEmailAddress: user?.email as string,
      description: localTripTemplate?.description,
      cost: localTripTemplate?.cost,
      duration: localTripTemplate?.duration,
      destinations: localTripTemplate?.destinations,
      destinationsLowercase: localTripTemplate?.destinations ? localTripTemplate?.destinations.map((destination) => destination.toLowerCase()) : [],
      pictures: localTripTemplate?.pictures,
      promote: localTripTemplate?.promote ? localTripTemplate?.promote : false,
    }).then(() => {
      console.log("Document successfully written!");
    }).catch((error: Error) => {
      console.error("Error writing document: ", error);
    });

    setLocalTripTemplate({
      title: "",
      description: "",
      cost: 0,
      duration: 0,
      destinations: [],
      pictures: [],
    });

    // clear the input fields
    const titleInput = document.getElementById("title") as HTMLInputElement;
    const descriptionInput = document.getElementById("description") as HTMLInputElement;
    const costInput = document.getElementById("cost") as HTMLInputElement;
    const durationInput = document.getElementById("duration") as HTMLInputElement;

    titleInput.value = "";
    descriptionInput.value = "";
    costInput.value = "";
    durationInput.value = "";

    alert("Trip added successfully!");
  };

  const handleImageUpload = (e: any) => {
    const imageFile = e.target.files[0] as File;

    if (!imageFile) {
      alert("No image selected");
      return;
    }
    if (imageFile.size > 1050000) {
      alert("Image size is too big");
      return;
    }

    const storageRef = ref(storage, `images/${imageFile.name}`);
    uploadBytes(storageRef, imageFile).then((snapshot) => {
      console.log("Uploaded a blob or file!");
    }).then(() => {
      getDownloadURL(storageRef).then((url) => {
        console.log(url);
        setLocalTripTemplate({
          ...localTripTemplate,
          pictures: localTripTemplate?.pictures ? [...localTripTemplate?.pictures as string[], url] : [url],
        });
      });
    }).catch((error: Error) => {
      console.error("Error writing document: ", error);
    });
  };

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
          w="80%"
          mx="25px"
          bg="sideBarBorderBottom">
          <Flex
            pb="15px"
            mb="1px"
            w="100%"
            justifyContent="center"
            bg="sideBar"
          >
            <Logo h="40px" />
          </Flex>
        </Flex>
        <SidebarButtons
          size={"medium"}
          gapSize={"10px"}
          width={"100%"}
          type={user ? "logged_in" : "logged_out"}
          selected="addtrips"
        />
        <ContactUs />
      </Flex>

      <Flex w="80%" flexDirection="column">
        <DefaultHeader
          profilePic={user ? user.photoURL : undefined}
          img_src={`url(${BgSignUp.src})`}
          title={user ? `Hello ${user.displayName}` : "You are logged out"}
          type="newTrip"
        />

        <Card
          display="flex"
          flexDirection="column"
          w="100%"
          p="20px"
          gap="30px"
          bgColor="white"
          minH="500px"
          borderRadius="md"
          mt="30px"
          bg="hovComp"
        >
          <Text fontSize="xl" fontWeight="bold">
            New Trip
          </Text>

          <SimpleGrid columns={4} spacing={8}>
            <Box>
              <Text fontSize="md">Title</Text>
              <Input
                placeholder="Enter title"
                size="md"
                mt="3px"
                borderRadius="lg"
                id="title"
                onChange={(e) => {
                  setLocalTripTemplate({
                    ...localTripTemplate,
                    title: e.target.value,
                  });
                }}
              />
            </Box>

            <Box>
              <Text fontSize="md" >Estimated costs</Text>
              <Input
                placeholder="Enter estimated costs"
                size="md"
                mt="3px"
                borderRadius="lg"
                id="cost"
                onChange={(e) => {
                  setLocalTripTemplate({
                    ...localTripTemplate,
                    cost: Number(e.target.value),
                  });
                }}
              />
            </Box>

            <Box>
              <Text fontSize="md">Duration</Text>
              <Input
                placeholder="Enter duration"
                size="md"
                mt="3px"
                borderRadius="lg"
                id="duration"
                onChange={(e) => {
                  setLocalTripTemplate({
                    ...localTripTemplate,
                    duration: Number(e.target.value),
                  });
                }}
              />
            </Box>
        </SimpleGrid>

          <Box>
            <Text fontSize="md">Destinations</Text>
            <Flex justifyContent="space-between" alignItems="center">
              <Input
                placeholder="Enter destination"
                size="md"
                mt="3px"
                mb="10px"
                borderRadius="lg"
                h="50px"
                mr="10px"
                id="destinationInput"
              />
              <Button
                variant="outline"
                colorScheme="teal"
                borderRadius="lg"
                size="md"
                w="200px"
                h="50px"
                textAlign="center"
                mt="-7px"
                onClick={() => {
                  const destinationInput = document.getElementById("destinationInput") as HTMLInputElement;
                  const destination = destinationInput.value;
                  if (destination) {
                    setLocalTripTemplate({
                      ...localTripTemplate,
                      destinations: localTripTemplate?.destinations ? [...localTripTemplate?.destinations as string[], destination] : [destination],
                    });
                    destinationInput.value = "";
                  }
                }}
              >
                Add destination
              </Button>
            </Flex>
            <Flex flexWrap="wrap" gap="10px">
              {localTripTemplate?.destinations?.map((destination, index) => (
                <Button
                  key={index}
                  variant="outline"
                  colorScheme="teal"
                  borderRadius="lg"
                  size="md"
                  w="150px"
                  h="50px"
                  textAlign="center"
                >
                  {destination}
                </Button>
              ))}
            </Flex>
          </Box>
          
          <Flex flexWrap="wrap" gap="10px">
            {localTripTemplate?.pictures
              ? localTripTemplate?.pictures.map((image, index) => (
                  <Box
                    position="relative"
                    key={index}
                    w="350px"
                    h="200px"
                    borderRadius="lg"
                    // bg="gray.100"
                    bg={`url(${image})`}
                    bgSize="cover"
                    bgPosition="center"
                  >
                    {/* X, text */}
                    <Text
                      position="absolute"
                      top="10px"
                      right="20px"
                      color="white"
                      fontWeight="bold"
                      // hover
                      cursor="pointer"
                      _hover={{
                        color: "gray.500",
                      }}
                    >
                      X
                    </Text>
                  </Box>
                ))
              : null}
            {/* Create stylized file input */}
            <Box
              w="350px"
              h="200px"
              borderRadius="lg"
              bg="teal.300"
              position="relative"
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              <Input
                type="file"
                accept="image/*"
                id="file"
                style={{ display: "none" }}
                onChange={(e) => {
                  handleImageUpload(e);
                }}
              />
              <label htmlFor="file">
                <Box
                  position="absolute"
                  top="0"
                  left="0"
                  w="100%"
                  h="100%"
                  opacity="0"
                  cursor="pointer"
                />
                <Text
                  position="absolute"
                  color="white"
                  fontWeight="bold"
                  // move to center
                  top="50%"
                  left="50%"
                  transform="translate(-50%, -50%)"
                  // hover
                  cursor="pointer"
                  _hover={{
                    color: "gray.200",
                  }}
                  zIndex={1}
                >
                  + ADD IMAGE
                </Text>
              </label>
            </Box>
          </Flex>

          {/* Big add Description field saying "Write here" */}

          <Box>
            <Text fontSize="md">Description</Text>
            <Textarea
              placeholder="Write here"
              size="md"
              mt="3px"
              borderRadius="lg"
              h="300px"
              id="description"
              onChange={(e) => {
                setLocalTripTemplate({
                  ...localTripTemplate,
                  description: e.target.value,
                });
              }}
            />
          </Box>

          <Box 
            id="paymentBox" 
            transition="max-height 0.5s ease-out" 
            maxHeight="0px" 
            overflow="hidden"
          > 

            <Text as="em" color="grey">Promote your post and reach out to more people for only €10</Text>
            <Box
              display="flex"
              flexDirection="row"
              justifyContent="space-between"
              alignItems="center"
              gap="20px"
              width="100%"
              mb="5px"
              pl="2px"
              pr="2px"
              mt="10px"
            >
              <Box>
                <Text fontSize="md">Credit card number</Text>
                <Input
                  type="number"
                  placeholder="Enter card number"
                  size="md"
                  mt="3px"
                  borderRadius="lg"
                  id="cardnumber"/>
              </Box>
              <Box>
                <Text fontSize="md">Card holder name</Text>
                <Input
                  placeholder="Enter full name"
                  size="md"
                  mt="3px"
                  borderRadius="lg"
                  id="nameOfCardholder"/>
              </Box>
              <Box>
                <Text fontSize="md">Security code</Text>
                <Input
                  type="number"
                  placeholder="Enter CVC"
                  size="md"
                  mt="3px"
                  borderRadius="lg"
                  id="securityCode"/>
              </Box>
              <Box>
                <Text fontSize="md">Card expiration</Text>
                <Input
                  type="month"
                  placeholder="Enter expiry date"
                  size="md"
                  mt="3px"
                  borderRadius="lg"
                  id="expiryDate"/>
              </Box>
            </Box>
          </Box>

          <Switch 
            colorScheme="teal"
            id="switch" 
            mt="35px" 
            //m="auto" 
            position="absolute"
            left="25px"
            bottom="25px"

            onChange = {() => {
              const paymentBox = document.getElementById("paymentBox");
              if (paymentBox){
                if(isToggled){
                  paymentBox.style.maxHeight = "0";
                } else {
                  paymentBox.style.maxHeight = "110px";
                }
                // paymentBox.style.maxHeight = paymentBox.style.maxHeight == "0px" ? "110px" : "0px";
                setIsToggled(!isToggled);
                setLocalTripTemplate({
                  ...localTripTemplate,
                  promote: !isToggled,
                });
                console.log("Promote: " + !isToggled);
              }
            }}
          >
            <Text 
            width="120px" 
            position="absolute" 
            left="50px" 
            bottom="10px"
            >
              Promote post
            </Text>
          </Switch>

          {/* Add cancel and upload button */}
          <Flex justifyContent="flex-end" gap="10px">
            <Button
              variant="outline"
              colorScheme="teal"
              borderRadius="lg"
              onClick={() => {
                window.location.href = "/homepage";
              }}
            >
              Cancel
            </Button>
            <Button
              variant="solid"
              colorScheme="teal"
              borderRadius="lg"
              w="150px"
              onClick={addTrip}
            >
              Upload
            </Button>
          </Flex>
        </Card>
      </Flex>
    </Flex>
  );
}
