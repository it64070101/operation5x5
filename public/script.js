function setLinkButton(buttonID, linkTo) {
    if (document.getElementById(buttonID)) {
        document.getElementById(buttonID).onclick = function () {
            location.href = linkTo;
        };
    }
}

// bind for test login
//setLinkButton("login-button", "profile.html");
setLinkButton("tutorial-button", "guide.html");
setLinkButton("play-button", "playmode.html");
// bind for save tutorial time
//setLinkButton("to-profile-button", "profile.html");
setLinkButton("roomto-profile-button", "profile.html");
setLinkButton("quit-button", "profile.html");


function setPlayerProfile() {
    const currentUser = firebase.auth().currentUser;
    let playername = document.querySelector('#player-name');
    console.dir(currentUser);
    if (playername && currentUser) {
        console.log('set name');
        // console.log(currentUser.displayName);
    }
}

function addNewRoom() {
    let roomName = "function: addNewRoom()"
    let playerName = "ใน script.js"
    let playerRank = "rank"
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

addNewRoom()
addNewRoom()
addNewRoom()
addNewRoom()
addNewRoom()
addNewRoom()
addNewRoom()
addNewRoom()
