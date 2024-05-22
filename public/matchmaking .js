function findMatchmakingRooms() {
    const currentUser = firebase.auth().currentUser;
    let userRank = checkRank(currentUser.uid)
    let roomlist = []
    firebase.database().ref('Game').once('value', (snapshot) => {
        snapshot.forEach((data) => {
            let id = data.key;
            let id_data = data.val();
            if (id_data.matchmaking === true && (id_data['user-x-id'] || id_data['user-o-id']) && !(id_data['user-x-id'] && id_data['user-o-id'])) {
                let nameId = id_data['user-x-id'] ? id_data['user-x-id'] : (id_data['user-o-id'] ? id_data['user-o-id'] : '');
                let roomRank = checkRank(nameId)
                roomlist.push(id)
                if (Math.abs(userRank - roomRank) <= 10) {
                    // Set criteria for rank
                    roomlist.push(id);
                }
            } else {
                // console.log("No matchmaking room found for id:", id);
            }
        });
        if (roomlist.length > 0) {
            let length = (roomlist.length) - 1;
            let randomRoom = getRandomInt(0, length);
            const selectRoom = firebase.database().ref("Game")
            const currentUser = firebase.auth().currentUser;
            const getUserData = firebase.database().ref("user_google");
            getUserData.child(currentUser.uid).once("value").then((subsnapshot) => {
                let playerGenrank = 1;
                subsnapshot.forEach((data) => {
                    let id = data.key;
                    let id_data = data.val();
                    if (id == "generalrank") {
                        playerGenrank = id_data;
                    }
                });
                if (snapshot.val()[roomlist[randomRoom]]["user-x-email"] == undefined) {
                    let tmpTD = `user-x-id`;
                    let tmpEmail = `user-x-email`;
                    let tmpName = `user-x-name`;
                    let tmpGenrank = `user-x-genrank`;
                    let tmpPicture = `user-x-picture`;
                    selectRoom.child(roomlist[randomRoom]).update({
                        [tmpTD]: currentUser.uid,
                        [tmpEmail]: currentUser.email,
                        [tmpName]: currentUser.displayName,
                        [tmpGenrank]: playerGenrank,
                        [tmpPicture]: currentUser.photoURL
                    });
                }
                else if (snapshot.val()[roomlist[randomRoom]]["user-o-email"] == undefined) {
                    let tmpTD = `user-o-id`;
                    let tmpEmail = `user-o-email`;
                    let tmpName = `user-o-name`;
                    let tmpGenrank = `user-o-genrank`;
                    let tmpPicture = `user-o-picture`;
                    selectRoom.child(roomlist[randomRoom]).update({
                        [tmpTD]: currentUser.uid,
                        [tmpEmail]: currentUser.email,
                        [tmpName]: currentUser.displayName,
                        [tmpGenrank]: playerGenrank,
                        [tmpPicture]: currentUser.photoURL
                    });
                }
                addUser.child(currentUser.uid).update({
                    Isplay: true,
                    Inroom: roomlist[randomRoom],
                })
                window.location.href = `game.html?room=${(roomlist[randomRoom])}`;
            });
        }
        else {
            //if can't find room let createroom
            createRoom(true);
        }
    });
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function checkRank(nameId) {
    firebase.database().ref('user_google/' + nameId + '/rank').once('value', (snapshot) => {
        let userRank = snapshot.val();
        console.log(userRank);
        return userRank;
    });
}