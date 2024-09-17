import React, { useState } from "react";
import { background, Button } from "@chakra-ui/react";
//Inside the AuthContext file.

import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth, db } from "../firebase/clientApp";
import { collection, doc, Firestore, getFirestore, setDoc, getDoc, getDocs, deleteDoc } from "firebase/firestore";

// Inside AuthProvider
const provider = new GoogleAuthProvider();


const list_of_cities = [
  { name: "Los Angeles", state: "CA", country: "USA" },
  { name: "New York", state: "NY", country: "USA" },
  { name: "Chicago", state: "IL", country: "USA" },
  { name: "Houston", state: "TX", country: "USA" },
  { name: "Philadelphia", state: "PA", country: "USA" },
  { name: "Phoenix", state: "AZ", country: "USA" },
  { name: "San Diego", state: "CA", country: "USA" },
  { name: "San Antonio", state: "TX", country: "USA" },
  { name: "Dallas", state: "TX", country: "USA" },
  { name: "San Jose", state: "CA", country: "USA" },
  { name: "Austin", state: "TX", country: "USA" },
  { name: "Indianapolis", state: "IN", country: "USA" },
  { name: "Jacksonville", state: "FL", country: "USA" }
];

const login = () => {
  signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential?.accessToken;
      // The signed-in user info.
      const user = result.user;
      console.log({ credential, token, user });
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      console.log({ errorCode, errorMessage, email, credential });
    });
};

const logout = () => {
  auth.signOut();
  console.log("logout");
};

const addCity = async () => {
  await setDoc(doc(db, "cities", "Los Angeles"), {
    name: "Los Angeles",
    state: "CA",
    country: "USA"
  });
};

const readCity = async () => {
  const docRef = doc(db, "cities", "Los Angeles");
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    console.log("Document data:", docSnap.data());
  } else {
    // doc.data() will be undefined in this case
    console.log("No such document!");
  }
};

const displayAllCitiesInDB = async () => {
  const citiesRef = collection(db, "cities");
  const snapshot = await getDocs(citiesRef);
  snapshot.forEach((doc) => {
    console.log(doc.id, "=>", doc.data());
  });

  // Display all cities in list format in the div with id="cities"
  const cities = document.getElementById("cities");
  if (cities) cities.innerHTML = "";
  snapshot.forEach((doc) => {
    const city = document.createElement("li");
    city.innerText = doc.id;
    // set style
    city.style.color = "white";
    if (cities) cities.appendChild(city);
  });
};

const addAllCitiesInDB = async () => {
  list_of_cities.forEach(async (city) => {
    await setDoc(doc(db, "cities", city.name), {
      name: city.name,
      state: city.state,
      country: city.country
    });
  });
};

const deleteAllCitiesInDB = async () => {
  // list_of_cities.forEach(async (city) => {
  //   await deleteDoc(doc(db, "cities", city.name));
  // });

  const citiesRef = collection(db, "cities");
  const snapshot = await getDocs(citiesRef);
  snapshot.forEach(async (e : any) => {
    await deleteDoc(doc(db, "cities", e.id));
  });
};

const deleteFirstCityInDB = async () => {
  const citiesRef = collection(db, "cities");
  const snapshot = await getDocs(citiesRef);
  if (snapshot.docs[0]) await deleteDoc(doc(db, "cities", snapshot.docs[0].id));
};



// create page
const Login = () => {
  // use hooks to get auth.currentUser
  const [user, setUser] = useState(auth.currentUser);
  // listen for auth state changes
  auth.onAuthStateChanged((user) => {
    setUser(user);
  });

  displayAllCitiesInDB();

  return (
    <div>
      <Button background="mediumseagreen" color="ButtonText" margin="2px" onClick={logout}>Logout</Button>
      <Button background="mediumseagreen" color="ButtonText" margin="2px" onClick={login}>Login</Button>
      <p>{user ? `Hello ${user.displayName}` : "You are logged out"}</p>

      <Button background="mediumseagreen" color="ButtonText" margin="2px" onClick={addCity}>Add City</Button>
      <Button background="mediumseagreen" color="ButtonText" margin="2px" onClick={readCity}>Read City</Button>
      <Button background="mediumseagreen" color="ButtonText" margin="2px" onClick={displayAllCitiesInDB}>Display</Button>
      <Button background="mediumseagreen" color="ButtonText" margin="2px" onClick={addAllCitiesInDB}>Add all cities</Button>
      <Button background="mediumseagreen" color="ButtonText" margin="2px" onClick={deleteAllCitiesInDB}>Delete all cities</Button>
      <Button background="mediumseagreen" color="ButtonText" margin="2px" onClick={deleteFirstCityInDB}>Delete first city</Button>

      {/* Display all cities from firebase */}
      <div style={{ background: "SlateBlue" }} id="cities"></div>
    </div>
  );
};

export default Login;