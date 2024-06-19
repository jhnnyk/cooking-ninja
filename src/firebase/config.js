import firebase from "firebase/compat/app"
import 'firebase/compat/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyDSVPD66uggiuSnotWBgRbVqKghCXPXKhM",
  authDomain: "ninja-cooking-site-e905d.firebaseapp.com",
  projectId: "ninja-cooking-site-e905d",
  storageBucket: "ninja-cooking-site-e905d.appspot.com",
  messagingSenderId: "132261471807",
  appId: "1:132261471807:web:847a6c20753fbd0139ba8a"
}

// initialize firebase
firebase.initializeApp(firebaseConfig)

// initialize services
const projectFirestore = firebase.firestore()

export { projectFirestore }
