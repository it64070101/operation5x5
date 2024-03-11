const tutorialUser = firebase.database().ref("tutorial_table")
let startTime;
let timerInterval;
var elapsedTime = 0;
startTime = Date.now();
timerInterval = setInterval(updateTimer, 1000);

function stopTimer() {
    clearInterval(timerInterval);
    // set database time
    const currentUser = firebase.auth().currentUser;
    tutorialUser.child(currentUser.uid).update({
        email: currentUser.email,
        name: currentUser.displayName,
        tutorialTime: elapsedTime,
      })
    startTime = null;
    window.location.href = "profile.html";
}

function updateTimer() {
    elapsedTime = Math.floor((Date.now() - startTime) / 1000);
}