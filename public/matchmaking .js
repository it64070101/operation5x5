function findMatchmakingRooms() {
    var roomlist = []
    firebase.database().ref('Game').once('value', (snapshot) => {
        snapshot.forEach((data) => {
            var id = data.key;
            var id_data = data.val();
            if (id_data.matchmaking === true) {
                console.log("Matchmaking room found for id:", id);
                console.log(id_data);
                roomlist.push(id)
                // ทำสิ่งที่คุณต้องการกับข้อมูลห้องที่มี matchmaking เป็น true
            } else {
                console.log("No matchmaking room found for id:", id);
            }
        });
        let length =  (roomlist.length)-1;
        randomRoom = getRandomInt(0,length)
        window.location.href = `game.html?room=${roomlist[randomRoom]}`;
    });
}
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}