const popupOverlay = document.getElementById('popupOverlay');
const popup = document.getElementById('popup');
const closePopup = document.getElementById('closePopup');
const emailInput = document.getElementById('emailInput');

function joinRoom() {
    function openPopup() {
        popupOverlay.style.display = 'block';
    }
    function closePopupFunc() {
        popupOverlay.style.display = 'none';
    }
    openPopup();
    closePopup.addEventListener('click', closePopupFunc);
    popupOverlay.addEventListener('click', function (event) {
        if (event.target === popupOverlay) {
            closePopupFunc();
        }
    });
}

function submitForm() {
    const roomCode = emailInput.value;
    firebase.database().ref('Game').once('value', (snapshot) => {
        const rooms = snapshot.val();
        const selectRoom = firebase.database().ref("Game")
        const currentUser = firebase.auth().currentUser;
        const getUserData = firebase.database().ref("user_google");
        if (roomCode in rooms) {
            getUserData.child(currentUser.uid).once("value").then((snapshot) => {
                let playerGenrank = 1;
                snapshot.forEach((data) => {
                    let id = data.key;
                    let id_data = data.val();
                    if (id == "generalrank") {
                        playerGenrank = id_data;
                    }
                });
                if (rooms[roomCode]["user-x-email"] == undefined && rooms[roomCode]["user-o-email"] != currentUser.email) {
                    let tmpTD = `user-x-id`;
                    let tmpEmail = `user-x-email`;
                    let tmpName = `user-x-name`;
                    let tmpGenrank = `user-x-genrank`;
                    let tmpPicture = `user-x-picture`;
                    selectRoom.child(roomCode).update({
                        [tmpTD]: currentUser.uid,
                        [tmpEmail]: currentUser.email,
                        [tmpName]: currentUser.displayName,
                        [tmpGenrank]: playerGenrank,
                        [tmpPicture]: currentUser.photoURL
                    });
                }
                else if (rooms[roomCode]["user-o-email"] == undefined && rooms[roomCode]["user-x-email"] != currentUser.email) {
                    let tmpTD = `user-o-id`;
                    let tmpEmail = `user-o-email`;
                    let tmpName = `user-o-name`;
                    let tmpGenrank = `user-o-genrank`;
                    let tmpPicture = `user-o-picture`;
                    selectRoom.child(roomCode).update({
                        [tmpTD]: currentUser.uid,
                        [tmpEmail]: currentUser.email,
                        [tmpName]: currentUser.displayName,
                        [tmpGenrank]: playerGenrank,
                        [tmpPicture]: currentUser.photoURL
                    });
                }
                addUser.child(currentUser.uid).update({
                    Isplay: true,
                    Inroom: roomCode,
                })
                window.location.href = `game.html?room=${roomCode}`;
            });
        }
    });

    closePopupFunc();
}

function closePopupFunc() {
    popupOverlay.style.display = 'none';
}

function joinRoomButton(roomcode) {
    const roomCode = roomcode.dataset.code;
    firebase.database().ref('Game').once('value', (snapshot) => {
        const rooms = snapshot.val();
        const selectRoom = firebase.database().ref("Game")
        const currentUser = firebase.auth().currentUser;
        const getUserData = firebase.database().ref("user_google");
        if (roomCode in rooms) {
            getUserData.child(currentUser.uid).once("value").then((snapshot) => {
                let playerGenrank = 1;
                snapshot.forEach((data) => {
                    let id = data.key;
                    let id_data = data.val();
                    if (id == "generalrank") {
                        playerGenrank = id_data;
                    }
                });
                if (rooms[roomCode]["user-x-email"] == undefined && rooms[roomCode]["user-o-email"] != currentUser.email) {
                    let tmpTD = `user-x-id`;
                    let tmpEmail = `user-x-email`;
                    let tmpName = `user-x-name`;
                    let tmpGenrank = `user-x-genrank`;
                    let tmpPicture = `user-x-picture`;
                    selectRoom.child(roomCode).update({
                        [tmpTD]: currentUser.uid,
                        [tmpEmail]: currentUser.email,
                        [tmpName]: currentUser.displayName,
                        [tmpGenrank]: playerGenrank,
                        [tmpPicture]: currentUser.photoURL
                    });
                }
                else if (rooms[roomCode]["user-o-email"] == undefined && rooms[roomCode]["user-x-email"] != currentUser.email) {
                    let tmpTD = `user-o-id`;
                    let tmpEmail = `user-o-email`;
                    let tmpName = `user-o-name`;
                    let tmpGenrank = `user-o-genrank`;
                    let tmpPicture = `user-o-picture`;
                    selectRoom.child(roomCode).update({
                        [tmpTD]: currentUser.uid,
                        [tmpEmail]: currentUser.email,
                        [tmpName]: currentUser.displayName,
                        [tmpGenrank]: playerGenrank,
                        [tmpPicture]: currentUser.photoURL
                    });
                }
                addUser.child(currentUser.uid).update({
                    Isplay: true,
                    Inroom: roomCode,
                })
                window.location.href = `game.html?room=${roomCode}`;
            });
        }
    });
}