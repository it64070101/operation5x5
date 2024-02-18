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
setLinkButton("to-profile-button", "profile.html");
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
