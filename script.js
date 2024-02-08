
function login() {

}

function setLinkButton(buttonID, linkTo) {
    if (document.getElementById(buttonID)) {
        document.getElementById(buttonID).onclick = function () {
            location.href = linkTo;
        };
    }
}

setLinkButton("login-button", "profile.html");
setLinkButton("tutorial-button", "guide.html");
setLinkButton("play-button", "playmode.html");
setLinkButton("to-profile-button", "profile.html");