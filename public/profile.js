firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    console.dir(user);
    document.querySelector("#player-name").innerHTML = user.displayName;
    document.querySelector("#player-photo").src = user.photoURL;
    // read data
    document.querySelector("#player-winlose").innerHTML = 'Win/Lose: ';
    var thisUserWin = 0;
    var thisUserLose = 0;
    addUser.child(user.uid).once("value").then((snapshot) => {
      snapshot.forEach((data) => {
        var id = data.key;
        var id_data = data.val();
        if (id == "count_round") {
          document.querySelector("#player-matchs").innerHTML = `Matchs: ${id_data}`;
        }
        if (id == "count_win" || id == "count_lose") {
          switch (id) {
            case "count_win":
              thisUserWin = `${id_data}/`;
              break;
            case "count_lose":
              thisUserLose = `${id_data}`;
          }
        }

      })
      //add user win lose
      document.querySelector("#player-winlose").innerHTML += thisUserWin + thisUserLose
    });
  }
});
// read data
addUser.once("value").then((snapshot) => {
  snapshot.forEach((data) => {
    var user_lose = 0;
    var user_round = 0;
    var user_win = 0;
    var user_name = "";
    data.forEach((userdata) => {
      var userdata_id = userdata.key;
      var userdata_data = userdata.val();
      if (userdata_id == "count_lose") {
        user_lose = userdata_data;
      }
      else if (userdata_id == "count_round") {
        user_round = userdata_data;
      }
      else if (userdata_id == "count_win") {
        user_win = userdata_data;
      }
      else if (userdata_id == "name") {
        user_name = userdata_data;
      }
    });
    players.push({
      name: user_name,
      roundsPlayed: user_round,
      wins: user_win,
      losses: user_lose
    });
  });

});
// ข้อมูลเก็บ rank
//คำนวณ rank
const players = [];
// read data
addUser.once("value").then((snapshot) => {
  snapshot.forEach((data) => {
    var user_lose = 0;
    var user_round = 0;
    var user_win = 0;
    var user_name = "";
    var user_id = "";
    data.forEach((userdata) => {
      var userdata_id = userdata.key;
      var userdata_data = userdata.val();
      if (userdata_id == "count_lose") {
        user_lose = userdata_data;
      }
      else if (userdata_id == "count_round") {
        user_round = userdata_data;
      }
      else if (userdata_id == "count_win") {
        user_win = userdata_data;
      }
      else if (userdata_id == "name") {
        user_name = userdata_data;
      }
      else if (userdata_id == "google_id") {
        user_id = userdata_data;
      }
    });
    players.push({
      name: user_name,
      roundsPlayed: user_round,
      wins: user_win,
      losses: user_lose,
      user_id: user_id
    });
  });
  sortPlayer()
  insertPlayer()
});

function sortPlayer() {
  players.sort((a, b) => {
    const winRateA = a.wins / a.roundsPlayed;
    const winRateB = b.wins / b.roundsPlayed;
    if (a.roundsPlayed !== b.roundsPlayed) {
      return b.roundsPlayed - a.roundsPlayed;
    } else {
      return winRateB - winRateA;
    }
  });
}

function insertPlayer() {

  const leaderboardTable = document.getElementById('leaderboard');


  players.forEach((player, index) => {
    const row = leaderboardTable.insertRow();
    const currentUser = firebase.auth().currentUser;
    if (currentUser.uid == player.user_id) {
      //document.querySelector("#player-rank").innerHTML += " " + (index + 1)
      addUser.child(currentUser.uid).update({
        rank: index + 1,
      })
    }
    var playerw_l = (player.wins / player.roundsPlayed * 100).toFixed(2) + "%";
    if (player.roundsPlayed == 0) {
      playerw_l = "0.00%"
    }
    const rankCell = row.insertCell(0);
    const nameCell = row.insertCell(1);
    const roundCell = row.insertCell(2);
    const w_lCell = row.insertCell(3);

    // กำหนดข้อมูลให้กับ cell แต่ละ cell
    rankCell.textContent = index + 1;
    nameCell.textContent = player.name;
    roundCell.textContent = player.roundsPlayed;
    w_lCell.textContent = playerw_l;
  });
}