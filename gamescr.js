var tttdata = [
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0]
];
var turn = 0;
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
    turn = 0;
    for (let i = 0; i < 5; i++) {
        for (let j = 0; j < 5; j++) {
            console.log(tttdata[i][j])
        }
    }
    document.getElementById("print").innerHTML = ""
}

function lock() {
    let allcell = document.getElementsByClassName("cell");
    let celllen = allcell.length;
    for (let i = 0; i < celllen; i++) {
        allcell[i].disabled = true;
    }
    if (turn == 0) {
        document.getElementById("print").innerHTML = "Player O win."
    }
    else {
        document.getElementById("print").innerHTML = "Player X win."
    }
}

function enableAll() {
    let allcell = document.getElementsByClassName("cell");
    let celllen = allcell.length;
    for (let i = 0; i < celllen; i++) {
        if ((i >= 0 && i <= 5) || (i >= 9 && i <= 10) || (i >= 14 && i <= 15) || (i >= 19 && i <= 24)) {
            allcell[i].disabled = false;
        }
        else {
            allcell[i].disabled = true;
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
                    lock();
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
                    lock();
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
                lock();
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
                lock();
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
                    lock();
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
                    lock();
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
                lock();
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
                lock();
            }
        }
        else {
            break;
        }
    }
}

function selected(cellNum, row, col) {
    selectrow = row;
    selectcol = col;
    if (select == 0) {
        select = 1;
        disabledNotSelect(cellNum);
    }
    else {
        select = 0;
        enableAll();
    }
}

function run(from) {
    if (select == 1) {
        if (tttdata[selectrow][selectcol] == 0) {
            if (turn == 0) {
                tttdata[selectrow][selectcol] = 1;
            }
            else if (turn == 1) {
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

        if (turn == 0) {
            turn = 1;
        }
        else if (turn == 1) {
            turn = 0;
        }
        select = 0;
        enableAll();
        render()
    }
}
