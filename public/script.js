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

function rankCalculate(rank) {
    if (rank >= 5) {
        return "General of the Army";
    } else if (rank >= 4) {
        return "General";
    } else if (rank >= 3) {
        return "Lieutenant General";
    } else if (rank >= 2) {
        return "Major General";
    } else if (rank >= 1) {
        return "Brigadier General";
    } else {
        return "error";
    }
}

function showRankImage(rank) {
    let rankName = rankCalculate(rank);
    if (rankName == "General of the Army") {
        return "star5.png"
    } else if (rankName == "General") {
        return "star4.png"
    } else if (rankName == "Lieutenant General") {
        return "star3.png"
    } else if (rankName == "Major General") {
        return "star2.png"
    } else if (rankName == "Brigadier General") {
        return "star.png"
    } else {
        return "error"
    }
}