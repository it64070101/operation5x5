firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      //   document.getElementById("userImage").src = user.photoURL;
      document.querySelector("#player-name").innerHTML = user.displayName;
      // read data
      document.querySelector("#player-winlose").innerHTML = 'Win/Lose: ';
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
                document.querySelector("#player-winlose").innerHTML += `${id_data}`;
                break;
              case "count_lose":
                document.querySelector("#player-winlose").innerHTML += `${id_data}/`;
            }
          }
        })
      });
      // getList(user);
    }
    //setupUI(user)
  });