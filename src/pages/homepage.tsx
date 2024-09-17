import { SettingsIcon } from "@chakra-ui/icons";
import { Flex } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import BgSignUp from "assets/img/BgSignUp.png";

import { ContactUs, Logo } from "components/atoms";
import {
  ProjectPanel,
  DefaultHeader,
  SidebarButtons,
  ProjectCard,
} from "components/molecules";
import NewYork from "assets/img/NewYork.jpeg";
import { queryFilter } from "utils/queryFilter";

// firebase
import { auth, db } from "../firebase/clientApp";
import { collection, limit, orderBy, query, where } from "firebase/firestore";

export default function Index() {
  // Logic to set user state
  const [user, setUser] = useState(auth.currentUser);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setUser(user);
      console.log(user?.email);
    });
  }, []);

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
        />
        <ContactUs />
      </Flex>

      <Flex w="80%" flexWrap="wrap">
        <DefaultHeader
          profilePic={user ? user.photoURL : undefined}
          img_src={`url(${BgSignUp.src})`}
          title={user ? `Hello ${user.displayName}` : "You are not logged in"}
        />

        {/* PROJECT PANELS */}
        <Flex mt="70px" flexDirection="column" gap="20px" w="full">
          <ProjectPanel
            title="Promoted"
            tripQuery={query(
              collection(db, "trips"),
              where(
                "promote",
                "==",
                true
              ),
              limit(3)
            )}
          />
          <ProjectPanel
            title="USA"
            tripQuery={query(
              collection(db, "trips"),
              where(
                "destinationsLowercase",
                "array-contains-any",
                queryFilter.USA
              ),
              limit(3)
            )}
          />
          <ProjectPanel
            title="Europe"
            tripQuery={query(
              collection(db, "trips"),
              where(
                "destinationsLowercase",
                "array-contains-any",
                queryFilter.Europe
              ),
              limit(3)
            )}
          />
          <ProjectPanel
            title="Cheap trips"
            tripQuery={query(
              collection(db, "trips"),
              orderBy("cost"),
              limit(3)
            )}
          />
          <ProjectPanel
            title="Longest trips"
            tripQuery={query(
              collection(db, "trips"),
              orderBy("duration", "desc"),
              limit(3)
            )}
          />
          {/* <ProjectPanel title="Most popular" tripQuery={query(collection(db, "trips"), orderBy("rating", "desc"), limit(3))} /> */}
        </Flex>
      </Flex>
    </Flex>
  );
}
