function findMatchmakingRooms() {

    const currentUser = firebase.auth().currentUser;
    userRank = checkRank(currentUser.uid)
    var roomlist = []
    firebase.database().ref('Game').once('value', (snapshot) => {
        snapshot.forEach((data) => {
            var id = data.key;
            var id_data = data.val();
            if (id_data.matchmaking === true && (id_data['user-x-id'] || id_data['user-o-id'])){
                nameId = id_data['user-x-id'] ? id_data['user-x-id'] : (id_data['user-o-id'] ? id_data['user-o-id'] : '');
                
                var roomRank = checkRank(nameId)
                // console.log("Matchmaking room found for id:", id);
                // console.log(nameId);
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
        let length =  (roomlist.length)-1;
        randomRoom = getRandomInt(0,length)
        window.location.href = `game.html?room=${(roomlist[randomRoom])}`;
        }
        else {
            //if can't find room let createroom
            createRoom();
        }
    });
}
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
function checkRank(nameId){
    firebase.database().ref('user_google/' + nameId + '/rank').once('value', (snapshot) => {
        userRank = snapshot.val();
        console.log(userRank);
        return userRank;
    });
}