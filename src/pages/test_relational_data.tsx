import { useState } from "react";
import { background, Button, Box, Image } from "@chakra-ui/react";
import { auth, db, storage } from "../firebase/clientApp";
import { signInWithPopup, GoogleAuthProvider, updateProfile } from "firebase/auth";
import {ref, uploadBytes, getDownloadURL} from "firebase/storage"
import { doc, setDoc, getDocs, query, collection, where } from "firebase/firestore";

const provider = new GoogleAuthProvider();

const login = () => {
  signInWithPopup(auth, provider)
    .then((result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential?.accessToken;
      const user = result.user;
      console.log({ credential, token, user });
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      const email = error.email;
      const credential = GoogleAuthProvider.credentialFromError(error);
      console.log({ errorCode, errorMessage, email, credential });
    });
};

const logout = () => {
  auth.signOut();
  console.log("logout");
};


export default function Home() {
  function findAllTripsWithUserEmailAddress(userEmailAddress : string) {
    const tripsRef = collection(db, "trips");
    const q = query(tripsRef, where("userEmailAddress", "==", userEmailAddress));
    getDocs(q).then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
      });
    });
  }

  function addTrip() {
    const randomId : string = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    const title : string = "trip1";
    const userEmailAddress : string = user?.email as string;
    const description : string = "description";
    const cost : number = 100;
    const duration : number = 10;
    const destinations : string[] = ["Los Angeles", "New York", "Chicago"];
    const pictures : string[] = ["https://media.snl.no/media/71710/standard_troll.jpg"];

    if (!user) return;

    setDoc(doc(db, "trips", randomId), {
      title: title,
      userEmailAddress: userEmailAddress,
      description: description,
      cost: cost,
      duration: duration,
      destinations: destinations,
      pictures: pictures
    }).then(() => {
      console.log("Document successfully written!");
    }).catch((error) => {
      console.error("Error writing document: ", error);
    });
  }


  function handleFileChange(event : any) {
    const imageFile = event.target.files[0] as File;
    // const storageRef = ref(storage, user?.email + "/profilePicture/" + imageFile.name);
    const storageRefProfilePicture = ref(storage, user?.email + "/profilePicture");
    uploadBytes(storageRefProfilePicture, imageFile).then((snapshot) => {
      console.log('Uploaded a blob or file!');
    });

    // get url of image
    getDownloadURL(ref(storage, user?.email + "/profilePicture")).then((url) => {
      // Insert url into an <img> tag to "download"
      // document.getElementById("profilePicture")?.setAttribute("src", url);
      console.log(url);
      document.getElementById("profilePicture")?.setAttribute("src", url);
      
      // set user.photoURL to the url of the image
      if (user) updateProfile(user, {
        photoURL: url
      }).then(() => {
        // Update successful
      }).catch((error) => {
        // An error occurred
      });
    }).catch((error) => {
      // Handle any errors
    });


    console.log(imageFile);
  }

  // show profile picture
  function showProfile() {
    getDownloadURL(ref(storage, user?.email + "/profilePicture")).then((url) => {
      // Insert url into an <img> tag to "download"
      document.getElementById("profilePicture")?.setAttribute("src", url);
      console.log(url);
    }).catch((error) => {
      // Handle any errors
    }
    );
  }
  

  const [user, setUser] = useState(auth.currentUser);
  auth.onAuthStateChanged((user) => {
    setUser(user);
  });


  return (
	<Box>
	  <h1>Home</h1>
	  <h2>{user?.email}</h2>
    <Button onClick={login}>Login</Button>
    <Button onClick={logout}>Logout</Button>
    {/* <Image
      src="https://media.snl.no/media/71710/standard_troll.jpg"
      alt="Picture of the author"
      width="30vw"
      height="100%"
      objectFit="cover"
      objectPosition="center"
      borderRadius="10px"
      id="profilePicture"
      onClick={showProfile}
    /> */}
    {/* Show profile picture */}
    <Image
      src={user?.photoURL || undefined}
      alt="Picture of the author"
      width="30vw"
      height="100%"
      objectFit="cover"
      objectPosition="center"
      borderRadius="10px"
      id="profilePicture"
      onClick={showProfile}
    />
    {/* Upload image */}
    <input id="fileInput" type="file" accept="image/*" onChange={handleFileChange} />
    {/* <Button onClick={handleUpload}>Upload</Button> */}
    <Button onClick={addTrip}>Add trip</Button>
    <Button onClick={() => findAllTripsWithUserEmailAddress(user?.email as string)}>Find trips</Button>
  </Box>
  );
}