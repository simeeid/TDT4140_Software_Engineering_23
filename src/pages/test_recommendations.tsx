// imports
import { Button, Heading } from "@chakra-ui/react";
import { auth, db } from "../firebase/clientApp";
import { collection, doc, Firestore, getDoc, limit, query, setDoc, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { ProjectPanel } from "components/molecules";


// page
export default function TestRecommendations() {
	const [user, setUser] = useState(auth.currentUser);

	useEffect(() => {
		auth.onAuthStateChanged((user) => {
			setUser(user);
		});
	}, []);

	const [downloadedDestinations, setDownloadedDestinations] = useState<string[]>([]);

	useEffect(() => {
		const dbRef = doc(db, "users", user?.email || "undefined");
		getDoc(dbRef).then((doc) => {
			if (doc.exists()) {
				const topDestinations = doc.data()?.topDestinations;
				const top5 = Object.keys(topDestinations).sort((a, b) => topDestinations[b] - topDestinations[a]).slice(0, 5);
				setDownloadedDestinations(top5);
			} else {
				// doc.data() will be undefined in this case
				console.log("No such document!");
			}
		}).catch((error) => {
			console.log("Error getting document:", error);
		});
	}, [user]);

	// key, value
	// destination, number of times visited
	const topDestinations = {
		'new york': 4,
		'los angeles': 2,
		'chicago': 3,
		'houston': 4,
		'philadelphia': 2,
		'phoenix': 1,
		'san antonio': 1,
		'san diego': 2,
		'dallas': 3,
		'san jose': 1,
		'austin': 8,
		'jacksonville': 1,
		'san francisco': 4,
		'columbus': 11,
	}

	const destinationsOfInterest = [
		'new york',
		'los angeles',
		'chicago',
		'houston',
		'philadelphia',
		'oslo'
	]

	const handleUpload = () => {
		// Upload to firestore in users/{user.email}/topDestinations, top destinations should be a map containing the values of topDestinations
		if (user) {
			const dbRef = doc(db, "users", user.email || "undefined");
			setDoc(dbRef, { topDestinations: topDestinations }, { merge: true })
			.then(() => {
				console.log("Document successfully written!");
			}
			)
			.catch((error) => {
				console.error("Error writing document: ", error);
			}
			);
		} else {
			console.log("User not logged in");
		}
	}
	const handleDownload = () => {
		// Download from firestore in users/{user.email}/topDestinations, top destinations should be a map containing the values of topDestinations
		const dbRef = doc(db, "users", user?.email || "undefined");
		getDoc(dbRef).then((doc) => {
			if (doc.exists()) {
				console.log("Document data:", doc.data());
				// get the top 5 destinations
				const top5 = Object.keys(doc.data()?.topDestinations).sort((a, b) => doc.data()?.topDestinations[b] - doc.data()?.topDestinations[a]).slice(0, 5);
				console.log(top5);
			} else {
				// doc.data() will be undefined in this case
				console.log("No such document!");
			}
		}).catch((error) => {
			console.log("Error getting document:", error);
		});
	}

	const addOneToDestinations = (destinations: string[]) => {
		// Add one to the number of times visited for each destination in the destinations array
		// If the destination is not in the topDestinations map, add it to the map with a value of 1
		
		// 1. Get the current topDestinations map
		const dbRef = doc(db, "users", user?.email || "undefined");
		getDoc(dbRef).then((doc) => {
			// 2. Add one to the number of times visited for each destination in the destinations array
			if (doc.exists()) {
				let topDestinations = doc.data()?.topDestinations;
				destinationsOfInterest.forEach((destination) => {
					if (topDestinations.hasOwnProperty(destination)) {
						topDestinations[destination] += 1;
					} else {
						topDestinations[destination] = 1;
					}
				});
				// 3. Upload the new topDestinations map to firestore
				setDoc(dbRef, { topDestinations: topDestinations }, { merge: true })
				.then(() => {
					console.log("Document successfully written!");
				}
				)
				.catch((error) => {
					console.error("Error writing document: ", error);
				}
				);
			} else {
				// doc.data() will be undefined in this case
				console.log("No such document!");
			}
		}).catch((error) => {
			console.log("Error getting document:", error);
		}
		);
	}

	return (
		<>
			<Heading as="h1" size="2xl" mb="10px"> Test Recommendations </Heading>
			<Button colorScheme="teal" variant="solid" onClick={handleUpload}> Upload </Button>
			<Button colorScheme="teal" variant="solid" onClick={handleDownload}> Download </Button>
			<Button colorScheme="teal" variant="solid" onClick={() => addOneToDestinations(destinationsOfInterest)}> Add One </Button>
			{downloadedDestinations.length > 0 && (
            	<ProjectPanel title="My Recommended Trips" tripQuery={query(collection(db, "trips"), where("destinationsLowercase", "array-contains-any", downloadedDestinations), limit(3))} />
          	)}
		</>
	)
}