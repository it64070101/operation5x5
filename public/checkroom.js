function checkwrongRoom() {
    return new Promise((resolve, reject) => {
        let roomHexList = []
        let roomList = []

        firebase.database().ref('Game').once('value', (snapshot) => {
            snapshot.forEach((data) => {
                var id = data.key;
                const hash = CryptoJS.SHA256(id);
                const roomHex = hash.toString(CryptoJS.enc.Hex);
                roomList.push(id);
                roomHexList.push(roomHex)
            });

            // console.log(roomList, roomHexList); // ตรวจสอบค่าหลังจากที่รับค่ามาจาก Firebase
            // console.log(roomCodeHex)
            // ส่วนที่เกี่ยวข้องกับการใช้งานข้อมูลที่ได้รับ
            if (roomHexList.includes(roomCodeHex)) {
                wrongRoom = false;
            }
            if (wrongRoom) {
                alert("you are in the wrong room");
                window.location.href = `playmode.html`;
            } else {
                resolve(roomList[roomHexList.indexOf(roomCodeHex)]);
            }
        });
    });
}
