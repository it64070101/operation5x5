function checkwrongRoom(roomCode) {
    
firebase.database().ref('Game').once('value', (snapshot) => {
    const rooms = snapshot.val();
            if (roomCode in rooms){
                wrongRoom = false;
            }
            if (wrongRoom) {
                alert("you are in the wrong room");
                window.location.href = `playmode.html`;
            }
});
}

function checkUserCanPlay() {
    let kickplayer = true;
    const currentUser = firebase.auth().currentUser;
    addUser.child(currentUser.uid).once("value").then((snapshot) => {
        snapshot.forEach((data) => {
          var id = data.key;
          var id_data = data.val();
          if (id == "Isplay" && id_data == true) {
            kickplayer = false
          }
        });
        // add score win round losr to user
        if (kickplayer == true) {
          alert("wrong way to join")
          window.location.href = `playmode.html`;
        }
      });
}
