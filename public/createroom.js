
function createRoom() {
    // สร้างโค้ดสำหรับห้อง (สร้างโค้ดแบบสุ่มเป็นตัวอย่าง)
    // สร้างโค้ดแบบสุ่ม
    const roomCode = generateRoomCode();
    const roomURL = window.location.href + '?room=' + roomCode; // สร้าง URL ที่รวมโค้ดห้อง
    alert('ห้องของคุณถูกสร้างเรียบร้อยแล้ว! โค้ดของคุณคือ: ' + roomCode); // แสดง Alert พร้อมโค้ดห้อง
    console.log(roomURL);
    const createRoom = firebase.database().ref("Game")
    const currentUser = firebase.auth().currentUser;
    let tmpTD = `user-x-id`;
    let tmpEmail = `user-x-email`;
    createRoom.child(roomCode).update({
        start: "start",
        [tmpTD]: currentUser.uid,
        [tmpEmail]: currentUser.email,
        matchmaking: true
    });
    SHARoom(roomCode)
    console.log(roomCode)
    // เพิ่มข้อความที่ต้องการแฮช
}

function generateRoomCode() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const length = 6;
    let result = '';
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
}

function SHARoom(roomCode) {
    // สร้างค่าแฮช SHA-256
    const roomCodehash = CryptoJS.SHA256(roomCode);

    // แปลงค่าแฮชเป็นรหัสฐาน 16 (Hex)
    const roomCodehashInHex = roomCodehash.toString(CryptoJS.enc.Hex);
    window.location.href = `game.html?room=${roomCodehashInHex}`;
}