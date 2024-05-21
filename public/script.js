// function setLinkButton(buttonID, linkTo) {
//     if (document.getElementById(buttonID)) {
//         document.getElementById(buttonID).onclick = function () {
//             location.href = linkTo;
//         };
//     }
// }
function setLinkButton(buttonClass, linkTo) {
    let buttonSet = document.getElementsByClassName(buttonClass);
    if (buttonSet) {
        for (let index = 0; index < buttonSet.length; index++) {
            buttonSet[index].onclick = function () {
                location.href = linkTo;
            };
        }
    }
}
// console.log(document.getElementsByClassName("profile-button")[0])
// bind for test login
//setLinkButton("login-button", "profile.html");
setLinkButton("tutorial-button", "guide.html");
setLinkButton("play-button", "room.html");
// bind for save tutorial time
//setLinkButton("to-profile-button", "profile.html");
setLinkButton("profile-button", "profile.html");
setLinkButton("quit-button", "profile.html");
setLinkButton("to-room-button", "room.html");
setLinkButton("achievement-button", "achievement.html");


function setPlayerProfile() {
    const currentUser = firebase.auth().currentUser;
    let playername = document.querySelector('#player-name');
    console.dir(currentUser);
    if (playername && currentUser) {
        console.log('set name');
        // console.log(currentUser.displayName);
    }
}

function showOverlay() {
    const sidebar = document.querySelector("#mobile-sidebar")
    sidebar.style.left = "0px"
}

function hideOverlay() {
    const sidebar = document.querySelector("#mobile-sidebar")
    sidebar.style.left = "-100%"
}
