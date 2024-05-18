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
  const currentUser = firebase.auth().currentUser;
  const url = new URL(window.location.href);
  const pageName = url.pathname.split("/").pop();
  if (user && (pageName == "index.html" || pageName == "")) {

    window.location.href = "profile.html";
  }
  else if (!user && pageName != "index.html") {
    window.location.href = "index.html";
  }
  if (user && ((pageName != "game.html") && (pageName != "result.html"))) {

    let playingRoom = ""
    addUser.child(currentUser.uid).once("value").then((snapshot) => {
      snapshot.forEach((data) => {
        var id = data.key;
        var id_data = data.val();
        if (id == "Inroom" && id_data != "") {
          playingRoom = id_data
        }
      });
      // add score win round losr to user
      if (playingRoom != "") {

        window.location.href = `game.html?room=${playingRoom}`;
      }
    });
  }
});

function logoutUser() {
  firebase.auth().signOut();
  console.log("Logout completed")
  window.location.href = "index.html";
}

var add_score = true;
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
      addUser.child(currentUser.uid).update({
        email: currentUser.email,
        google_id: currentUser.uid,
        name: currentUser.displayName,
      })
      // read data
      addUser.child(currentUser.uid).once("value").then((snapshot) => {
        snapshot.forEach((data) => {
          var id = data.key;
          var id_data = data.val();
          if (id == "count_round") {
            add_score = false
          }
        });
        // add score win round losr to user
        if (add_score == true) {
          addUser.child(currentUser.uid).update({
            count_lose: 0,
            count_round: 0,
            count_win: 0,
          })

        }
      });

      window.location.href = "room.html";

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
