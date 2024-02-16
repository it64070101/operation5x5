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

const btnJoins = document.querySelectorAll(".btn-join");
btnJoins.forEach((btnJoin) => btnJoin.addEventListener("click", joinGame));

const btnTerminate = document.getElementById("btnTerminateGame");
const btnStart = document.getElementById("btnStartGame");
btnStart.addEventListener("click", startGame);
btnTerminate.addEventListener("click", endGame);

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

function lock(win) {
    let allcell = document.getElementsByClassName("cell");
    let celllen = allcell.length;
    for (let i = 0; i < celllen; i++) {
        allcell[i].disabled = true;
    }
    if (win == 1) {
        document.getElementById("player-turn").innerHTML = "Player X win."
    }
    else {
        document.getElementById("player-turn").innerHTML = "Player O win."
    }
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

function render() {
    let allcell = document.getElementsByClassName("cell");
    let cellCount = 0;
    for (let i = 0; i < 5; i++) {
        for (let j = 0; j < 5; j++) {
            if (tttdata[i][j] == 0) {
                allcell[cellCount].value = null;
            }
            else if (tttdata[i][j] == 1) {
                allcell[cellCount].value = "X";
            }
            else if (tttdata[i][j] == 2) {
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
                    lock(1);
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
                    lock(1);
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
                lock(1);
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
                lock(1);
            }
        }
        else {
            break;
        }
    }
    console.log("checkX")
}

function checkY() {
    let countwinY = 0;
    for (let i = 0; i < 5; i++) {
        for (let j = 0; j < 5; j++) {
            if (tttdata[i][j] == 2) {
                countwinY++;
                if (countwinY == 5) {
                    lock(2);
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
                    lock(2);
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
                lock(2);
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
                lock(2);
            }
        }
        else {
            break;
        }
    }
    console.log("checkY")
}

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
        render();

        if (turn == 1) {
            turn = 2;
            document.getElementById("player-turn").innerHTML = "Player O Turn";
            gameDataRef.child("game-1").update({
                turn: "o",
            });
            checkY();
            checkX();
        }
        else if (turn == 2) {
            turn = 1;
            document.getElementById("player-turn").innerHTML = "Player X Turn";
            gameDataRef.child("game-1").update({
                turn: "x",
            });
            checkX();
            checkY();
        }

        // enableAll();
    }
}

function joinGame(event) {
    const currentUser = firebase.auth().currentUser;
    console.log("[Join] Current user", currentUser);
    if (currentUser) {
        const btnJoinID = event.currentTarget.getAttribute("id");
        const player = btnJoinID[btnJoinID.length - 1];

        const playerForm = document.getElementById(`inputPlayer-${player}`);
        if (playerForm.value == "") {
            let tmpTD = `user-${player}-id`;
            let tmpEmail = `user-${player}-email`;
            gameDataRef.child("game-1").update({
                [tmpTD]: currentUser.uid,
                [tmpEmail]: currentUser.email
            });
            console.log(currentUser.email + " added.");
            event.currentTarget.disabled = true;
        }
    }
}

function startGame() {
    gameDataRef.child("game-1").update({
        start: true,
        turn: "x",
        table: [
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0],
            [0, 0, 5, 0, 0],
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0]
        ]
    });
}

function endGame() {
    gameDataRef.child("game-1").update({
        start: false,
    });
}

let playerCount;

gameDataRef.on("value", (snapshot) => {
    updateGame(snapshot);
})

function updateGame(snapshot) {
    document.getElementById("inputPlayer-x").value = "";
    document.getElementById("inputPlayer-o").value = "";
    btnJoins.forEach((btnJoin) => btnJoin.disabled = false);
    document.querySelectorAll(".btn-cancel-join-game").forEach((btnCancel) => btnCancel.disabled = false);
    btnStart.disabled = true;
    btnTerminate.disabled = true;
    playerCount = 0;
    let playerTurn;
    enableAll();

    snapshot.forEach((data) => {
        const gameInfo = data.val();
        Object.keys(gameInfo).forEach((key) => {
            if (key == "turn") {
                playerTurn = gameInfo[key];
            }
        })
    })

    // console.log(playerTurn);

    snapshot.forEach((data) => {
        const gameInfo = data.val();
        Object.keys(gameInfo).forEach((key) => {
            switch (key) {
                case "user-x-email":
                    document.getElementById("inputPlayer-x").value = gameInfo[key];
                    document.querySelector("#btnJoin-x").disabled = true;
                    if (firebase.auth().currentUser.email == gameInfo[key]) {
                        btnJoins.forEach((btnJoin) => btnJoin.disabled = true);
                        if (playerTurn == "o") {
                            disabledAll();
                            console.log("yes")
                        }
                    }
                    playerCount++;
                    break;
                case "user-o-email":
                    document.getElementById("inputPlayer-o").value = gameInfo[key];
                    document.querySelector("#btnJoin-o").disabled = true;
                    if (firebase.auth().currentUser.email == gameInfo[key]) {
                        btnJoins.forEach((btnJoin) => btnJoin.disabled = true);
                        if (playerTurn == "x") {
                            disabledAll();
                        }
                    }
                    playerCount++;
                    break;
                case "table":
                    console.log(gameInfo[key][2][2]);
                    break;
            }
        })
    })

    snapshot.forEach((data) => {
        const gameInfo = data.val();
        Object.keys(gameInfo).forEach((key) => {
            if (key == "start") {
                if (gameInfo[key]) {
                    btnTerminate.disabled = false;
                    document.querySelectorAll(".btn-cancel-join-game").forEach((btnCancel) => btnCancel.disabled = true);
                }
                else if (playerCount == 2 && !gameInfo[key]) {
                    btnStart.disabled = false;
                }
            }
        })
    })
}

const btnCancelsJoins = document.querySelectorAll(".btn-cancel-join-game");
btnCancelsJoins.forEach((btnCancel) => btnCancel.addEventListener("click", cancelJoin));

function cancelJoin(event) {
    const currentUser = firebase.auth().currentUser;
    console.log("[Cancel] Current user:", currentUser);
    if (currentUser) {
        const btnCancelID = event.currentTarget.getAttribute("id");
        const player = btnCancelID[btnCancelID.length - 1];

        const playerForm = document.getElementById(`inputPlayer-${player}`);
        if (playerForm.value && playerForm.value === currentUser.email) {
            let tmpTD = `user-${player}-id`;
            let tmpEmail = `user-${player}-email`;
            gameDataRef.child("game-1").child(tmpTD).remove();
            gameDataRef.child("game-1").child(tmpEmail).remove();
            console.log(`delete on id: ${currentUser.uid}`);
            document.querySelector(`#btnJoin-${player}`).disabled = false;
        }
    }
}
