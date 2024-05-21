let roomListRef = firebase.database().ref("Game");
roomListRef.on('value', (snapshot) => {
    document.querySelector('#room-list').innerHTML = `<h1>สมรภูมิ</h1>`
    snapshot.forEach((data) => {
        let roomID = data.key;
        let roomData = data.val();
        if (roomData["matchmaking"] && (roomData["user-x-name"] == null || roomData["user-o-name"] == null)) {
            if (roomData["user-o-name"] == null) {
                addNewRoom(roomID, roomData["user-x-name"], roomData["user-x-genrank"]);
            }
            else {
                addNewRoom(roomID, roomData["user-o-name"], roomData["user-o-genrank"]);
            }
        }
    });
});

function addNewRoom(roomName, playerName, playerRank) {
    let room = document.createElement('button')
    room.classList.add('room');

    let divRoomName = document.createElement('div')
    divRoomName.appendChild(document.createTextNode(roomName))
    divRoomName.classList.add('room-name')

    let divPlayerName = document.createElement('div')
    divPlayerName.appendChild(document.createTextNode(playerName))
    divPlayerName.classList.add('player-name')

    let divPlayerRank = document.createElement('div')
    divPlayerRank.appendChild(document.createTextNode(playerRank))
    divPlayerRank.classList.add('player-rank')

    room.appendChild(divRoomName)
    room.appendChild(divPlayerName)
    room.appendChild(divPlayerRank)

    let roomList = document.querySelector('#room-list')
    roomList.appendChild(room);
}