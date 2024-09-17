// imports

import { Button, Heading } from "@chakra-ui/react";
import { ProjectPanel } from "components/molecules";
import { auth, db } from "../firebase/clientApp";
import { collection, doc, getDoc, limit, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { FavoritesButton } from "components/atoms";


// page
export default function TestFavorites() {
	const [user, setUser] = useState(auth.currentUser);
	useEffect(() => {
		auth.onAuthStateChanged((user) => {
		setUser(user);
		console.log(user?.email);
		});
	}, []);

	const tripID = "7xkd0sggwnm5xdylvhw8h";
	const getFavorites = async () => {
		const docRef = doc(db, "trips", tripID);
		const docSnap = await getDoc(docRef);
		if (docSnap.exists()) {
			console.log("Document data:", docSnap.data());
			return docSnap.data()?.favorites;
		} else {
			// doc.data() will be undefined in this case
			console.log("No such document!");
		}
	};

	const [favorites, setFavorites] = useState<string[]>([]);
	useEffect(() => {
		getFavorites().then((favorites) => {
			setFavorites(favorites || []);
		});
	}, []);

	

	return (
		<>
			<Heading>Test Favorites</Heading>
			{user && (<>
        This button affects the trip with ID: {tripID} <br />
				<FavoritesButton
					favorites={favorites}
					tripID={tripID}
				>
				</FavoritesButton>
			</>)}
		</>
	);
}
