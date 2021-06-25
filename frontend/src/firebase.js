import firebase from "firebase";

// Your web app's Firebase configuration
var firebaseConfig = {
	// apiKey: process.env.FIREBASE_APIKEY,
	// authDomain: process.env.FIREBASE_AUTHDOMAIN,
	// projectId: process.env.FIREBASE_PROJECTID,
	// storageBucket: process.env.FIREBASE_STORAGEBUCKET,
	// messagingSenderId: process.env.FIREBASE_MESSAGINGSENDERID,
	// appId: process.env.FIREBASE_APPID,
	// measurementId: process.env.FIREBASE_MEASUREMENTID,
	apiKey: "AIzaSyB2cUFkq-KsuyOtR1MoNc4qVXhBKFJqskg",
	authDomain: "cfg-2021.firebaseapp.com",
	projectId: "cfg-2021",
	storageBucket: "cfg-2021.appspot.com",
	messagingSenderId: "795583915608",
	appId: "1:795583915608:web:abccd6251799e72cafcc2d",
	measurementId: "G-56FLEX854R",
};

// Initialize Firebase
export const fire = firebase.initializeApp(firebaseConfig);
firebase.analytics();
