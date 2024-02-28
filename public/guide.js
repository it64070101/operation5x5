const tutorialUser = firebase.database().ref("tutorial_table")
let startTime;
let timerInterval;
var elapsedTime = 0;
startTime = Date.now(); // บันทึกเวลา
timerInterval = setInterval(updateTimer, 1000);

function stopTimer() {
    clearInterval(timerInterval); // หยุดการเรียกฟังก์ชัน updateTimer()
    // set database time
    const currentUser = firebase.auth().currentUser;
    tutorialUser.child(currentUser.uid).update({
        email: currentUser.email,
        name: currentUser.displayName,
        tutorialTime: elapsedTime,
      })
    startTime = null; // ล้างค่าเวลาเริ่มต้น
    window.location.href = "profile.html";
}

function updateTimer() {
    elapsedTime = Math.floor((Date.now() - startTime) / 1000); // คำนวณเวลาที่ผ่านไป
}