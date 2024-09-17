import { Box, Button } from "@chakra-ui/react";
import { auth, db } from "../../../firebase/clientApp";
import { arrayRemove, arrayUnion, doc, setDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

interface ButtonProps {
  [key: string]: any;
  // onclick?: () => void;
  favorites: string[];
  tripID: string;
  fontSize?: string;
  accentColor?: string;
}

export const FavoritesButton: React.FC<ButtonProps> = ({
  favorites,
  tripID,
  fontSize = "10px",
  accentColor = "red",
  children,
  ...props
}) => {
  const [user, setUser] = useState(auth.currentUser);
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setUser(user);
      console.log(user?.email);
    });
  }, []);

  const [isFavorite, setIsFavorite] = useState(false);
  useEffect(() => {
    console.log("favorites", favorites);
    if (favorites.includes(user?.email || "")) {
      setIsFavorite(true);
    } else {
      setIsFavorite(false);
    }
  }, [favorites, user]);

  const handleFavorite = () => {
    console.log("Favorite");
    console.log(tripID);

    if (!user) return;

    setDoc(
      doc(db, "trips", tripID),
      {
        favorites: isFavorite
          ? arrayRemove(user?.email || "")
          : arrayUnion(user?.email || ""),
      },
      { merge: true }
    )
      .then(() => {
        console.log("Document successfully written!");
        setIsFavorite(!isFavorite);
      })
      .catch((error) => {
        console.error("Error writing document: ", error);
      });
  };

  // Regex replacing everything not a number with nothing, then converting to number and multiplying by 1.5, then converting back to string and adding the original unit
  const iconFontSize =
    String(Number(fontSize.replace(/[^0-9]/g, "")) * 1.5) +
    fontSize.replace(/[0-9]/g, "");

  return (
    <Button
      fontSize={fontSize}
      type="submit"
      bg="whiteAlpha.400"
      w="130px"
      h="30px"
      mb="20px"
      mt="20px"
      color="teal.300"
      borderColor="gray.300"
      borderWidth="2px"
      borderRadius="5px"
      _hover={{
        bg: "whiteAlpha.500",
        color: "teal.400",
      }}
      _active={{
        bg: "whiteAlpha.700",
        color: "teal.600",
      }}
      onClick={() => handleFavorite()}
      {...props}
    >
      {/* <AiOutlineHeart fontSize={50} />
			<AiFillHeart fontSize={50} /> */}
      {isFavorite ? (
        <AiFillHeart fontSize={iconFontSize} color={accentColor} />
      ) : (
        <AiOutlineHeart fontSize={iconFontSize} />
      )}
      <Box ml="5px" display="inline-block">
        {" "}
      </Box>
      {isFavorite ? "Your favorite" : "Add to favorites"}
      {children}
    </Button>
  );
};
