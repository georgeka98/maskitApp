
import * as firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyBBWHoXR83UTxS0HZok04MTzcO91rZ4Dmg",
  authDomain: "maskit-421ad.firebaseapp.com",
  databaseURL: "https://maskit-421ad.firebaseapp.com",
  projectId: "maskit-421ad",
  storageBucket: "maskit-421ad.appspot.com",
  messagingSenderId: "698888500597",
  appId: "1:698888500597:ios:c144c5b20e103259944f3c",
  measurementId: "G-244001912",
};

if(!firebase.apps.length){
    firebase.initializeApp(firebaseConfig);
}

export default firebase;