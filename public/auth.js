const firebaseConfig = {
  apiKey: "AIzaSyDRDsD1Ea0eXl9CQLGW0uqmebhqP3Mmiuw",
  authDomain: "operation-5x5.firebaseapp.com",
  databaseURL: "https://operation-5x5-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "operation-5x5",
  storageBucket: "operation-5x5.appspot.com",
  messagingSenderId: "870363256350",
  appId: "1:870363256350:web:572187379ae84b0ccd000f",
  measurementId: "G-1KSH1NP49Z"
};
firebase.initializeApp(firebaseConfig)
const addUser = firebase.database().ref("user_google")

var provider = new firebase.auth.GoogleAuthProvider();

firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      console.log(user)
    //   document.getElementById("userImage").src = user.photoURL;
    //   document.getElementById("showName").innerHTML = user.displayName;
      //getList(user);
    }
      //setupUI(user)
  });

//const btnLogout = document.querySelector("#logout-button")
// btnLogout.addEventListener("click", function()
function logoutUser(){
    firebase.auth().signOut();
    console.log("Logout completed")
    window.location.href = "index.html";
}

//const loginForm = document.querySelector("#login-button");
// loginForm.addEventListener("click", loginUser);

function loginUser(event) {
    firebase.auth()
        .signInWithPopup(provider)
        .then((result) => {
            /** @type {firebase.auth.OAuthCredential} */
            var credential = result.credential;

            // This gives you a Google Access Token. You can use it to access the Google API.
            var token = credential.accessToken;
            // The signed-in user info.
            var user = result.user;
            // IdP data available in result.additionalUserInfo.profile.
            // ...
            // Add a second document with a generated ID.
          // database

          const currentUser = firebase.auth().currentUser;
          console.log(currentUser.uid)
          console.log(addUser.child(currentUser.uid))
          addUser.child(currentUser.uid).update({
              email: currentUser.email,
              google_id: currentUser.uid,
              name: currentUser.displayName,
          })
      
          window.location.href = "profile.html";

        }).catch((error) => {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            // ...
        });
}
