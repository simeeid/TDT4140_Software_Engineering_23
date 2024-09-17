import {
  Card,
  CardHeader,
  Flex,
  CardBody,
  Grid,
  Button,
  Box,
  Text,
  useColorModeValue,
  useFocusEffect,
} from "@chakra-ui/react";
import { ProjectCard } from "../";
import NewYork from "../../../assets/img/NewYork.jpeg";

// firebase
import {
  getDocs,
  collection,
  Query,
  DocumentData,
  CollectionReference,
  getDoc,
  doc,
  setDoc,
} from "firebase/firestore";
import { auth, db } from "../../../firebase/clientApp";
import { TripTemplate } from "templates/tripTemplate";
import { useEffect, useState } from "react";

interface ProjectCardsProps {
  trips: TripTemplate[];
  descriptionWordLimit?: number;
  cardLimit: number;
}
interface ProjectPanelProps {
  title: string;
  tripQuery: Query<DocumentData> | CollectionReference<DocumentData>;
  cardLimit?: number;
  recommended?: boolean;
  onClick?: () => void;
  viewAll?: boolean;
  [key: string]: any;
}

const ProjectCards: React.FC<ProjectCardsProps> = ({
  trips,
  descriptionWordLimit = 200,
  cardLimit,
}) => {
  return (
    <>
      {trips.map((trip, index) =>
        index < cardLimit ? (
          <ProjectCard reviewCount={0} rating={5} trip={trip} />
        ) : (
          <></>
        )
      )}
    </>
  );
};

export const ProjectPanel: React.FC<ProjectPanelProps> = ({
  title,
  tripQuery,
  cardLimit,
  onClick,
  viewAll,
  children,
  recommended,
  ...props
}) => {
  const textColor = useColorModeValue("gray.700", "white");

  const [tripsArray, setTripsArray] = useState([] as TripTemplate[]);
  const [recommendedTrips, setRecommendedTrips] = useState(
    [] as TripTemplate[]
  );

  const topDestinations = {
    "new york": 4,
    "los angeles": 2,
    chicago: 3,
    houston: 4,
    philadelphia: 2,
    phoenix: 1,
    "san antonio": 1,
    "san diego": 2,
    dallas: 3,
    "san jose": 1,
    austin: 8,
    jacksonville: 1,
    "san francisco": 4,
    columbus: 11,
  };

  // if (!cardLimit) {
  //   cardLimit = 3;
  // }

  // if (viewAll) {
  //   cardLimit = 100;
  // }

  // Attempt to fix hydration issue, not sure if it works or if this caused the issue in the first place
  const actualCardLimit = viewAll ? 100 
    : cardLimit ? cardLimit
    : 3;


  const [user, setUser] = useState(auth.currentUser);
  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    setWindowWidth(window.innerWidth);
  }, []);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setUser(user);
    });
  }, []);

  useEffect(() => {
    if (!tripQuery) {
      return;
    }
    getDocs(tripQuery).then((querySnapshot) => {
      const tempArray: TripTemplate[] = [];
      querySnapshot.forEach((doc) => {
        tempArray.push(doc.data());
        tempArray[tempArray.length - 1].id = doc.id;
      });
      setTripsArray(tempArray);
      console.log(tempArray);
    });
  }, []);

  const handleUpload = () => {
    // Upload to firestore in users/{user.email}/topDestinations, top destinations should be a map containing the values of topDestinations
    if (user) {
      const dbRef = doc(db, "users", user.email || "undefined");
      setDoc(dbRef, { topDestinations: topDestinations }, { merge: true })
        .then(() => {
          console.log("Document successfully written!");
        })
        .catch((error) => {
          console.error("Error writing document: ", error);
        });
    } else {
      console.log("User not logged in");
    }
  };

  useEffect(() => {
    console.log(tripsArray);

    const dbRef = doc(db, "users", user?.email || "undefined");
    getDoc(dbRef).then((doc) => {
      if (!doc.exists()) {
        handleUpload();
      }
    });

    getDoc(dbRef)
      .then((doc) => {
        if (doc.exists()) {
          const topDestinations = doc.data()?.topDestinations;
          const top = Object.keys(topDestinations).sort(
            (a, b) => topDestinations[b] - topDestinations[a]
          );
          console.log("TOOOP");
          // filter tripsArray to recommendedTrips

          const tempArray: TripTemplate[] = [];

          top.forEach((dest) => {
            tripsArray.forEach((trip) => {
              if (
                trip.destinations &&
                trip.destinations.includes(dest) &&
                !tempArray.includes(trip)
              ) {
                tempArray.push(trip);
              }
            });
          });

          tripsArray.forEach((trip) => {
            if (!tempArray.includes(trip)) {
              tempArray.push(trip);
            }
          });

          setRecommendedTrips(tempArray);
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
        }
      })
      .catch((error) => {
        console.log("Error getting document:", error);
      });
  }, [tripsArray]);

  return (
    <Card p="16px" borderRadius="2xl" w="full" bg="hovComp">
      <CardHeader p="12px">
        <Flex direction="column">
          <Text fontSize="lg" color={textColor} fontWeight="bold">
            {title}
          </Text>
          <Text fontSize="sm" color="gray.500" fontWeight="400">
            A collection of projects
          </Text>
        </Flex>
      </CardHeader>
      <CardBody px="5px" py="0px">
        <Grid
          templateColumns={{
            sm: "1fr",
            md: "1fr 1fr",
            xl:
              windowWidth < 1420 && viewAll
                ? "1fr 1fr 1fr" 
                : "1fr 1fr 1fr 1fr",
          }}
          templateRows={{
            sm: "1fr 1fr 1fr auto",
            md: "1fr 1fr",
            xl: "1fr",
          }}
          gap="24px"
        >
          {/* Project Card */}
          {children ? (
            children
          ) : recommended ? (
            <ProjectCards trips={recommendedTrips} cardLimit={actualCardLimit} />
          ) : (
            <ProjectCards trips={tripsArray} cardLimit={actualCardLimit} />
          )}

          {viewAll ? (
            <></>
          ) : (
            <Button
              p="0px"
              bg="transparent"
              color="gray.500"
              border="1px solid lightgray"
              borderRadius="15px"
              minHeight="100px"
              h="100%"
              // onclick make a href redirect to /trips
              onClick={() => {
                window.location.href = "/trips";
              }}
            >
              <Flex direction="column" justifyContent="center" align="center">
                <Text fontSize="lg" mb="12px">
                  ...
                </Text>
                <Text fontSize="lg" fontWeight="bold">
                  More trips
                </Text>
              </Flex>
            </Button>
          )}
        </Grid>
      </CardBody>
    </Card>
  );
};
