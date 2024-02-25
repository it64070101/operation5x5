const firebaseConfigGame = {
    apiKey: "AIzaSyDRDsD1Ea0eXl9CQLGW0uqmebhqP3Mmiuw",
    authDomain: "operation-5x5.firebaseapp.com",
    databaseURL: "https://operation-5x5-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "operation-5x5",
    storageBucket: "operation-5x5.appspot.com",
    messagingSenderId: "870363256350",
    appId: "1:870363256350:web:572187379ae84b0ccd000f",
    measurementId: "G-1KSH1NP49Z"
};

firebase.initializeApp(firebaseConfigGame);
const gameDataRef = firebase.database().ref("Game");
// get room code
const urlParams = new URLSearchParams(window.location.search);
let roomCode = urlParams.get('room');
let wrongRoom = true;
//set new code room

checkwrongRoom(roomCode)

console.log("Room Code:", roomCode);
// const btnJoins = document.querySelectorAll(".btn-join");
// btnJoins.forEach((btnJoin) => btnJoin.addEventListener("click", joinGame));

const btnTerminate = document.getElementById("btnTerminateGame");
const btnStart = document.getElementById("btnStartGame");
const btnAfter = document.getElementById("btnAfterGame");
const btnExit = document.getElementById("btnExitGame");
const btnSwitch = document.getElementById("btnSwitchPlayer");
btnStart.addEventListener("click", startGame);
btnTerminate.addEventListener("click", endGame);
btnAfter.addEventListener("click", afterGame);
btnExit.addEventListener("click", exitRoom);
btnSwitch.addEventListener("click", switchPlayer);

let tttdata = [
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0]
];
let turn = 1;
let select = 0;
let selectrow = 0;
let selectcol = 0;
let theWinner;

function reset() {
    for (let i = 0; i < 5; i++) {
        for (let j = 0; j < 5; j++) {
            tttdata[i][j] = 0;
        }
    }
    let allcell = document.getElementsByClassName("cell");
    let celllen = allcell.length;
    for (let i = 0; i < celllen; i++) {
        if ((i >= 0 && i <= 5) || (i >= 9 && i <= 10) || (i >= 14 && i <= 15) || (i >= 19 && i <= 24)) {
            allcell[i].disabled = false;
        }
        else {
            allcell[i].disabled = true;
        }
        allcell[i].value = null;
    }
    turn = 1;
    select = 0;
    selectrow = 0;
    selectcol = 0;
    document.getElementById("player-turn").innerHTML = "Player X Turn";
}

function enableAll() {
    let allcell = document.getElementsByClassName("cell");
    let cellCount = 0;
    for (let i = 0; i < 5; i++) {
        for (let j = 0; j < 5; j++) {
            if (((cellCount >= 6 && cellCount <= 8) || (cellCount >= 11 && cellCount <= 13) || (cellCount >= 16 && cellCount <= 18)) || ((turn != tttdata[i][j]) && (tttdata[i][j] != 0))) {
                allcell[cellCount].disabled = true;
            }
            else {
                allcell[cellCount].disabled = false;
            }
            cellCount++;
        }
    }
}

function disabledAll() {
    let allcell = document.getElementsByClassName("cell");
    let celllen = allcell.length;
    for (let i = 0; i < celllen; i++) {
        allcell[i].disabled = true;
    }
}

function disabledNotSelect(cellNum) {
    let allcell = document.getElementsByClassName("cell");
    let celllen = allcell.length;
    for (let i = 0; i < celllen; i++) {
        if (i != cellNum) {
            allcell[i].disabled = true;
        }
    }
}

function render(table) {
    let allcell = document.getElementsByClassName("cell");
    let cellCount = 0;
    for (let i = 0; i < 5; i++) {
        for (let j = 0; j < 5; j++) {
            if (table[i][j] == 0) {
                allcell[cellCount].value = null;
            }
            else if (table[i][j] == 1) {
                allcell[cellCount].value = "X";
            }
            else if (table[i][j] == 2) {
                allcell[cellCount].value = "O";
            }
            cellCount++;
        }
    }
}

function checkX() {
    let countwinX = 0;
    for (let i = 0; i < 5; i++) {
        for (let j = 0; j < 5; j++) {
            if (tttdata[i][j] == 1) {
                countwinX++;
                if (countwinX == 5) {
                    theWinner = "x";
                }
            }
            else {
                break;
            }
        }
        countwinX = 0;
    }
    for (let j = 0; j < 5; j++) {
        for (let i = 0; i < 5; i++) {
            if (tttdata[i][j] == 1) {
                countwinX++;
                if (countwinX == 5) {
                    theWinner = "x";
                }
            }
            else {
                break;
            }
        }
        countwinX = 0;
    }
    for (let i = 0, j = 0; i < 5; i++, j++) {
        if (tttdata[i][j] == 1) {
            countwinX++;
            if (countwinX == 5) {
                theWinner = "x";
            }
        }
        else {
            break;
        }
    }
    countwinX = 0;
    for (let i = 0, j = 4; i < 5; i++, j--) {
        if (tttdata[i][j] == 1) {
            countwinX++;
            if (countwinX == 5) {
                theWinner = "x";
            }
        }
        else {
            break;
        }
    }
}

function checkY() {
    let countwinY = 0;
    for (let i = 0; i < 5; i++) {
        for (let j = 0; j < 5; j++) {
            if (tttdata[i][j] == 2) {
                countwinY++;
                if (countwinY == 5) {
                    theWinner = "o";
                }
            }
            else {
                break;
            }
        }
        countwinY = 0;
    }
    for (let j = 0; j < 5; j++) {
        for (let i = 0; i < 5; i++) {
            if (tttdata[i][j] == 2) {
                countwinY++;
                if (countwinY == 5) {
                    theWinner = "o";
                }
            }
            else {
                break;
            }
        }
        countwinY = 0;
    }
    for (let i = 0, j = 0; i < 5; i++, j++) {
        if (tttdata[i][j] == 2) {
            countwinY++;
            if (countwinY == 5) {
                theWinner = "o";
            }
        }
        else {
            break;
        }
    }
    countwinY = 0;
    for (let i = 0, j = 4; i < 5; i++, j--) {
        if (tttdata[i][j] == 2) {
            countwinY++;
            if (countwinY == 5) {
                theWinner = "o";
            }
        }
        else {
            break;
        }
    }
}

// function joinGame(event) {
//     const currentUser = firebase.auth().currentUser;
//     console.log("[Join] Current user", currentUser);
//     if (currentUser) {
//         const btnJoinID = event.currentTarget.getAttribute("id");
//         const player = btnJoinID[btnJoinID.length - 1];

//         const playerForm = document.getElementById(`inputPlayer-${player}`);
//         if (playerForm.value == "") {
//             let tmpTD = `user-${player}-id`;
//             let tmpEmail = `user-${player}-email`;
//             gameDataRef.child(roomCode).update({
//                 [tmpTD]: currentUser.uid,
//                 [tmpEmail]: currentUser.email
//             });
//             console.log(currentUser.email + " added.");
//             event.currentTarget.disabled = true;
//         }
//     }
// }
function selected(cellNum, row, col) {
    selectrow = row;
    selectcol = col;
    if (select == 0) {
        select = 1;
        disabledNotSelect(cellNum);
        if (row == 0) {
            document.getElementById("top-but").disabled = true;
        }
        if (col == 0) {
            document.getElementById("lef-but").disabled = true;
        }
        if (col == 4) {
            document.getElementById("rig-but").disabled = true;
        }
        if (row == 4) {
            document.getElementById("bot-but").disabled = true;
        }
    }
    else {
        select = 0;
        enableAll();
        document.getElementById("top-but").disabled = false;
        document.getElementById("lef-but").disabled = false;
        document.getElementById("rig-but").disabled = false;
        document.getElementById("bot-but").disabled = false;
    }
}

function run(from) {
    if (select == 1) {
        if (tttdata[selectrow][selectcol] == 0) {
            if (turn == 1) {
                tttdata[selectrow][selectcol] = 1;
            }
            else if (turn == 2) {
                tttdata[selectrow][selectcol] = 2;
            }
        }

        if (from == 1) {
            let save = tttdata[selectrow][selectcol];
            for (let i = selectrow; i >= 0; i--) {
                if (i == 0) {
                    tttdata[i][selectcol] = save;
                }
                else {
                    tttdata[i][selectcol] = tttdata[i - 1][selectcol];
                }
            }
        }
        else if (from == 2) {
            let save = tttdata[selectrow][selectcol];
            for (let i = selectcol; i >= 0; i--) {
                if (i == 0) {
                    tttdata[selectrow][i] = save;
                }
                else {
                    tttdata[selectrow][i] = tttdata[selectrow][i - 1];
                }
            }
        }
        else if (from == 3) {
            let save = tttdata[selectrow][selectcol];
            for (let i = selectcol; i < 5; i++) {
                if (i == 4) {
                    tttdata[selectrow][i] = save;
                }
                else {
                    tttdata[selectrow][i] = tttdata[selectrow][i + 1];
                }
            }
        }
        else if (from == 4) {
            let save = tttdata[selectrow][selectcol];
            for (let i = selectrow; i < 5; i++) {
                if (i == 4) {
                    tttdata[i][selectcol] = save;
                }
                else {
                    tttdata[i][selectcol] = tttdata[i + 1][selectcol];
                }
            }
        }

        select = 0;

        document.getElementById("top-but").disabled = false;
        document.getElementById("lef-but").disabled = false;
        document.getElementById("rig-but").disabled = false;
        document.getElementById("bot-but").disabled = false;

        if (turn == 1) {
            let state = "play";
            theWinner = "";
            checkX();
            checkY();
            if (theWinner != "") {
                //function add user Score
                addUserScore(theWinner)
                state = "end";
            }
            gameDataRef.child(roomCode).update({
                turn: "o",
                table: tttdata,
                winner: theWinner,
                start: state
            });
        }
        else if (turn == 2) {
            let state = "play";
            theWinner = "";
            checkY();
            checkX();
            if (theWinner != "") {
                //function add user Score
                addUserScore(theWinner)
                state = "end";
            }
            gameDataRef.child(roomCode).update({
                turn: "x",
                table: tttdata,
                winner: theWinner,
                start: state
            });
        }
    }
}

function startGame() {
    reset();
    gameDataRef.child(roomCode).update({
        start: "play",
        turn: "x",
        table: [
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0]
        ],
        winner: ""
    });
}

function endGame() {
    gameDataRef.child(roomCode).update({
        start: "end"
    });
}

function afterGame() {
    gameDataRef.child(roomCode).update({
        start: "start",
        table: [
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0]
        ],
        winner: ""
    });
}

let playerCount;

gameDataRef.on("value", (snapshot) => {
    //console.log(snapshot)
    updateGame(snapshot);
})

let total = 0;

function updateGame(snapshot) {
    document.getElementById("inputPlayer-x").value = "";
    document.getElementById("inputPlayer-o").value = "";
    // btnJoins.forEach((btnJoin) => btnJoin.disabled = false);
    // document.querySelectorAll(".btn-cancel-join-game").forEach((btnCancel) => btnCancel.disabled = false);
    btnStart.disabled = true;
    btnTerminate.disabled = true;
    playerCount = 0;
    let playerTurn;
    let isPlay

    document.getElementById("showRoomCode").innerText = "Room code : " + roomCode;

    snapshot.forEach((data) => {
        // chack room
        if (data.key == roomCode) {
            const gameInfo = data.val();
            Object.keys(gameInfo).forEach((key) => {
                if (key == "start") {
                    isPlay = gameInfo[key]
                }
            })
        }
    })

    if (isPlay == "start") {
        document.getElementById("join-game").style.display = "block";
        document.getElementById("play-game").style.display = "none";
        document.getElementById("end-game").style.display = "none";
    }
    else if (isPlay == "play") {
        document.getElementById("join-game").style.display = "none";
        document.getElementById("play-game").style.display = "block";
        document.getElementById("end-game").style.display = "none";
    }
    else if (isPlay == "end") {
        document.getElementById("join-game").style.display = "none";
        document.getElementById("play-game").style.display = "none";
        document.getElementById("end-game").style.display = "block";
    }

    snapshot.forEach((data) => {
        // chack room
        if (data.key == roomCode) {
            const gameInfo = data.val();
            Object.keys(gameInfo).forEach((key) => {
                if (key == "turn" && isPlay == "play") {
                    playerTurn = gameInfo[key];
                    if (playerTurn == "x") {
                        turn = 1;
                    }
                    else if (playerTurn == "o") {
                        turn = 2;
                    }
                }
            })
        }
    })

    if (isPlay == "play") {
        document.getElementById("player-turn").innerHTML = "Player " + playerTurn.toUpperCase() + " Turn";
    }

    snapshot.forEach((data) => {
        // chack room
        if (data.key == roomCode) {
            const gameInfo = data.val();
            Object.keys(gameInfo).forEach((key) => {
                if (key == "table") {
                    tttdata = gameInfo[key];
                    render(gameInfo[key]);
                }
            })
        }
    })

    disabledAll();

    snapshot.forEach((data) => {
        // chack room
        if (data.key == roomCode) {
            const gameInfo = data.val();
            Object.keys(gameInfo).forEach((key) => {
                switch (key) {
                    case "user-x-email":
                        document.getElementById("inputPlayer-x").value = gameInfo[key];
                        // document.querySelector("#btnJoin-x").disabled = true;
                        if (firebase.auth().currentUser.email == gameInfo[key]) {
                            // btnJoins.forEach((btnJoin) => btnJoin.disabled = true);
                            if (playerTurn == "x" && isPlay == "play") {
                                enableAll();
                            }
                        }
                        playerCount++;
                        break;
                    case "user-o-email":
                        document.getElementById("inputPlayer-o").value = gameInfo[key];
                        // document.querySelector("#btnJoin-o").disabled = true;
                        if (firebase.auth().currentUser.email == gameInfo[key]) {
                            // btnJoins.forEach((btnJoin) => btnJoin.disabled = true);
                            if (playerTurn == "o" && isPlay == "play") {
                                enableAll();
                            }
                        }
                        playerCount++;
                        break;
                    case "winner":
                        if (gameInfo[key] == "x" || gameInfo[key] == "o") {
                            document.getElementById("winnerText").innerText = "Player " + gameInfo[key].toUpperCase() + " is the winner.";
                        }
                        else {
                            document.getElementById("winnerText").innerText = "No winner.";
                        }
                        break;
                }
            })
        }
    })

    if (isPlay == "play") {
        btnTerminate.disabled = false;
        // document.querySelectorAll(".btn-cancel-join-game").forEach((btnCancel) => btnCancel.disabled = true);
    }
    else if (playerCount == 2 && isPlay == "start") {
        btnStart.disabled = false;
    }

    if (playerCount == 0) {
        gameDataRef.child(roomCode).remove();
    }
}

function exitRoom(event) {
    const currentUser = firebase.auth().currentUser;
    if (currentUser) {
        firebase.database().ref('Game/' + roomCode).once('value', (snapshot) => {
            snapshot.forEach((data) => {
                let id = data.key;
                let id_data = data.val();
                if (id == "user-x-email" && id_data == currentUser.email) {
                    gameDataRef.child(roomCode).child("user-x-email").remove();
                    gameDataRef.child(roomCode).child("user-x-id").remove();
                }
                else if (id == "user-o-email" && id_data == currentUser.email) {
                    gameDataRef.child(roomCode).child("user-o-email").remove();
                    gameDataRef.child(roomCode).child("user-o-id").remove();
                }
            });
        });
        window.location.href = "playmode.html";
    }
}

function switchPlayer(event) {
    let saveEmailX;
    let saveIDX;
    let saveEmailO;
    let saveIDO;
    let keyIDX = `user-x-id`;
    let keyEmailX = `user-x-email`;
    let keyIDO = `user-o-id`;
    let keyEmailO = `user-o-email`;
    firebase.database().ref('Game/' + roomCode).once('value', (snapshot) => {
        snapshot.forEach((data) => {
            let id = data.key;
            let id_data = data.val();
            if (id == "user-x-email") {
                saveEmailX = id_data;
            }
            else if (id == "user-o-email") {
                saveEmailO = id_data;
            }
            else if (id == "user-x-id") {
                saveIDX = id_data;
            }
            else if (id == "user-o-id") {
                saveIDO = id_data;
            }
        });
    });
    if (saveEmailX != undefined && saveEmailO != undefined) {
        gameDataRef.child(roomCode).update({
            [keyIDX]: saveIDO,
            [keyEmailX]: saveEmailO,
            [keyIDO]: saveIDX,
            [keyEmailO]: saveEmailX
        });
    }
    else if (saveEmailX == undefined) {
        gameDataRef.child(roomCode).update({
            [keyIDX]: saveIDO,
            [keyEmailX]: saveEmailO
        });
        gameDataRef.child(roomCode).child("user-o-email").remove();
        gameDataRef.child(roomCode).child("user-o-id").remove();
    }
    else if (saveEmailO == undefined) {
        gameDataRef.child(roomCode).update({
            [keyIDO]: saveIDX,
            [keyEmailO]: saveEmailX
        });
        gameDataRef.child(roomCode).child("user-x-email").remove();
        gameDataRef.child(roomCode).child("user-x-id").remove();
    }
}

// const btnCancelsJoins = document.querySelectorAll(".btn-cancel-join-game");
// btnCancelsJoins.forEach((btnCancel) => btnCancel.addEventListener("click", cancelJoin));

// function cancelJoin(event) {
//     const currentUser = firebase.auth().currentUser;
//     console.log("[Cancel] Current user:", currentUser);
//     if (currentUser) {
//         const btnCancelID = event.currentTarget.getAttribute("id");
//         const player = btnCancelID[btnCancelID.length - 1];

//         const playerForm = document.getElementById(`inputPlayer-${player}`);
//         if (playerForm.value && playerForm.value === currentUser.email) {
//             let tmpTD = `user-${player}-id`;
//             let tmpEmail = `user-${player}-email`;
//             gameDataRef.child(roomCode).child(tmpTD).remove();
//             gameDataRef.child(roomCode).child(tmpEmail).remove();
//             console.log(`delete on id: ${currentUser.uid}`);
//             document.querySelector(`#btnJoin-${player}`).disabled = false;
//         }
//     }
// }
