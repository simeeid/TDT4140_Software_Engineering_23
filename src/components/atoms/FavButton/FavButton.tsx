import { Button, Icon } from "@chakra-ui/react";
import { auth, db } from "../../../firebase/clientApp";
import { useState, useEffect } from "react";
import { BsHeart, BsHeartFill } from "react-icons/bs";
import { setDoc, doc, arrayRemove, arrayUnion } from "firebase/firestore";
interface FavButtonProps {
  favorites: string[];
  tripID: string;
  [key: string]: any;
}

export const FavButton: React.FC<FavButtonProps> = ({
  selected,
  favorites,
  tripID,
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

  return (
    <Button
      colorScheme="teal"
      variant="outline"
      size="sm"
      mr="10px"
      leftIcon={<Icon as={isFavorite ? BsHeartFill : BsHeart} boxSize="20px" />}
      onClick={() => handleFavorite()}
      {...props}
    >
      {isFavorite ? "Marked as favorite" : "Add to favorites"}
    </Button>
  );
};
