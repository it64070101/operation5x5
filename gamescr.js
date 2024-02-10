var tttdata = [
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0]
];
var turn = 1;
var select = 0;
var selectrow = 0;
var selectcol = 0;

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
            if (((cellCount >= 6 && cellCount <= 8) || (cellCount >= 11 && cellCount <= 13) || (cellCount >= 16 && cellCount <= 18)) || ((turn == tttdata[i][j]) && (tttdata[i][j] != 0))) {
                allcell[cellCount].disabled = true;
            }
            else {
                allcell[cellCount].disabled = false;
            }
            cellCount++;
        }
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
            document.getElementById("top-but").disabled= true;
        }
        if (col == 0) {
            document.getElementById("lef-but").disabled= true;
        }
        if (col == 4) {
            document.getElementById("rig-but").disabled= true;
        }
        if (row == 4) {
            document.getElementById("bot-but").disabled= true;
        }
    }
    else {
        select = 0;
        enableAll();
        document.getElementById("top-but").disabled= false;
        document.getElementById("lef-but").disabled= false;
        document.getElementById("rig-but").disabled= false;
        document.getElementById("bot-but").disabled= false;
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
            for (let i = selectrow; i >= 0; i--){
                if (i == 0) {
                    tttdata[i][selectcol] = save;
                }
                else {
                    tttdata[i][selectcol] = tttdata[i-1][selectcol];
                }
            }
        }
        else if (from == 2) {
            let save = tttdata[selectrow][selectcol];
            for (let i = selectcol; i >= 0; i--){
                if (i == 0) {
                    tttdata[selectrow][i] = save;
                }
                else {
                    tttdata[selectrow][i] = tttdata[selectrow][i-1];
                }
            }
        }
        else if (from == 3) {
            let save = tttdata[selectrow][selectcol];
            for (let i = selectcol; i < 5; i++){
                if (i == 4) {
                    tttdata[selectrow][i] = save;
                }
                else {
                    tttdata[selectrow][i] = tttdata[selectrow][i+1];
                }
            }
        }
        else if (from == 4) {
            let save = tttdata[selectrow][selectcol];
            for (let i = selectrow; i < 5; i++){
                if (i == 4) {
                    tttdata[i][selectcol] = save;
                }
                else {
                    tttdata[i][selectcol] = tttdata[i+1][selectcol];
                }
            }
        }

        select = 0;
        enableAll();
        document.getElementById("top-but").disabled= false;
        document.getElementById("lef-but").disabled= false;
        document.getElementById("rig-but").disabled= false;
        document.getElementById("bot-but").disabled= false;
        render()

        if (turn == 1) {
            turn = 2;
            document.getElementById("player-turn").innerHTML = "Player O Turn";
            checkY();
            checkX();
        }
        else if (turn == 2) {
            turn = 1;
            document.getElementById("player-turn").innerHTML = "Player X Turn";
            checkX();
            checkY();
        }
    }
}
