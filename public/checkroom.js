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