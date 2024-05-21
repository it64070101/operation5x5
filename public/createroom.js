function createRoom(publceRoom) {
    const roomCode = generateRoomCode();
    const roomURL = window.location.href + '?room=' + roomCode; // create code room
    console.log(roomURL);
    const createRoom = firebase.database().ref("Game")
    const currentUser = firebase.auth().currentUser;
    const getUserData = firebase.database().ref("user_google");
    let tmpTD = `user-x-id`;
    let tmpEmail = `user-x-email`;
    let tmpName = `user-x-name`;
    let tmpGenrank = `user-x-genrank`;
    
    getUserData.child(currentUser.uid).once("value").then((snapshot) => {
        let playerGenrank = 1;
        snapshot.forEach((data) => {
            let id = data.key;
            let id_data = data.val();
            if (id == "generalrank") {
                playerGenrank = id_data;
            }
        });
        createRoom.child(roomCode).update({
            start: "start",
            [tmpTD]: currentUser.uid,
            [tmpEmail]: currentUser.email,
            matchmaking: publceRoom,
            [tmpName]: currentUser.displayName,
            [tmpGenrank]: playerGenrank
        });
        addUser.child(currentUser.uid).update({
            Isplay: true,
            Inroom: roomCode,
        })
    
        window.location.href = `game.html?room=${roomCode}`;
    });
}

function generateRoomCode() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const length = 6;
    let result = '';
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
}
