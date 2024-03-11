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
        if (roomCode in rooms) {
            if (rooms[roomCode]["user-x-email"] == undefined && rooms[roomCode]["user-o-email"] != currentUser.email) {
                let tmpTD = `user-x-id`;
                let tmpEmail = `user-x-email`;
                selectRoom.child(roomCode).update({
                    [tmpTD]: currentUser.uid,
                    [tmpEmail]: currentUser.email,
                });
            }
            else if (rooms[roomCode]["user-o-email"] == undefined && rooms[roomCode]["user-x-email"] != currentUser.email) {
                let tmpTD = `user-o-id`;
                let tmpEmail = `user-o-email`;
                selectRoom.child(roomCode).update({
                    [tmpTD]: currentUser.uid,
                    [tmpEmail]: currentUser.email,
                });
            }
                addUser.child(currentUser.uid).update({
                    Isplay: true,
                    Inroom: roomCode,
                })
            window.location.href = `game.html?room=${roomCode}`;
        }
    });

    closePopupFunc();
}

function closePopupFunc() {
    popupOverlay.style.display = 'none';
}