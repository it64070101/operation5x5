function addUserScore(winner){
    gameDataRef.child(roomCode).once("value").then((snapshot) => {
        var idWinner ="";
        var loser ="";
        var idLoser ="";
        if (winner === "x"){
            loser = "o"
        }
        else if (winner === "o"){
            loser = "x"
        }
        snapshot.forEach((data) => {
          var id = data.key;
          var id_data = data.val();
          if (id == `user-${winner}-id`) {
            idWinner = id_data;
          }
          if (id == `user-${loser}-id`) {
            idLoser = id_data;
          }
        });
        addWin(idWinner);
        addLose(idLoser);
      });
      
}
function addWin(userid){
    addUser.child(userid).once("value").then((snapshot) => {
        var userRound = 0;
        var uesrWin = 0;
        snapshot.forEach((data) => {
          var id = data.key;
          var id_data = data.val();
          if (id == "count_round") {
            userRound = id_data;
          }
          if (id == "count_win") {
            uesrWin = id_data;
          }
        });
        addUser.child(userid).update({
            count_round: userRound+1,
            count_win: uesrWin+1,
          })
      });
}
function addLose(userid){
    addUser.child(userid).once("value").then((snapshot) => {
        var userRound = 0;
        var uesrLose = 0;
        snapshot.forEach((data) => {
          var id = data.key;
          var id_data = data.val();
          if (id == "count_round") {
            userRound = id_data;
          }
          if (id == "count_lose") {
            uesrLose = id_data;
          }
        });
        addUser.child(userid).update({
            count_round: userRound+1,
            count_lose: uesrLose+1,
          })
      });
}