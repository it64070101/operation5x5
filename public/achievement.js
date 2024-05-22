const achievementMap = {
    "win_continuously_05": { name: "Beginner Man", condition: "ชนะติดต่อกัน 5 ครั้ง" },
    "win_continuously_10": { name: "General of Conquest", condition: "ชนะติดต่อกัน 10 ครั้ง" },
    "win_continuously_15": { name: "General of Planner", condition: "ชนะติดต่อกัน 15 ครั้ง" },
    "win_continuously_20": { name: "General of Victory", condition: "ชนะติดต่อกัน 20 ครั้ง" },
    "win_continuously_25": { name: "General of 5x5", condition: "ชนะติดต่อกัน 25 ครั้ง" },
    "win_continuously_50": { name: "General of Undefeated", condition: "ชนะติดต่อกัน 50 ครั้ง" },
    "share_5time": { name: "The helpers", condition: "แชร์เป็นจำนวน 5 ครั้ง" },
    "win_in_enemy_turn": { name: "Everything is in a plan", condition: "ชนะคู่ต่อสู้ ในเทิร์นของคู่ต่อสู้" },
    "win_continuously_challeng": { name: "Challenging Man", condition: "ชนะคู่ต่อสู้ที่ rank สูงกว่า 25 ครั้ง" },
    "win_continuously_uncompromise": { name: "Uncompromise Man", condition: "ชนะคู่ต่อสู้ที่ rank ต่ำกว่า 25 ครั้ง" },
    "win_top_score": { name: "Medal of Honor", condition: "อยู่บนสุดของกระดานคะแนน" }
  };
async function checkAchirvrment(){


firebase.auth().onAuthStateChanged((user) => {
addUser.child(user.uid).once("value").then((snapshot) => {
    snapshot.forEach((data) => {
      var id = data.key;
      var id_data = data.val();
      if (id == "win_continuously") {
       unlockAchirvrment(id,id_data)
      }
      if (id == "share_time") {
        unlockAchirvrment(id,id_data)
       }
       if (id == "win_in_enemy_turn_time") {
        unlockAchirvrment(id,id_data)
       }
       if (id == "win_continuously_challeng_time") {
        unlockAchirvrment(id,id_data)
       }
       if (id == "win_continuously_uncompromise_time") {
        unlockAchirvrment(id,id_data)
       }
       if (id == "rank") {
        unlockAchirvrment(id,id_data)
       }
    });
})
achievementUser.child(user.uid).once("value").then((snapshot) => {
    snapshot.forEach((data) => {
      const id = data.key;
      const id_data = data.val();
  
      if (achievementMap[id]) {
        const { name, condition } = achievementMap[id];
        insertAchievement(name, id_data, condition);
      }
    });
  });
  function unlockAchirvrment(type, win){
    if(type == "win_continuously"){
        if (win >= 5) {
        achievementUser.child(user.uid).update({
          win_continuously_05: true,
        })
    }
    if (win >= 10) {
        achievementUser.child(user.uid).update({
          win_continuously_10: true,
        })
    }
    if (win >= 15) {
        achievementUser.child(user.uid).update({
          win_continuously_15: true,
        })
    }
    if (win >= 20) {
        achievementUser.child(user.uid).update({
          win_continuously_20: true,
        })
    }
    if (win >= 25) {
        achievementUser.child(user.uid).update({
          win_continuously_25: true,
        })
    }
    if (win >= 50) {
        achievementUser.child(user.uid).update({
          win_continuously_50: true,
        })
    }
    }
    else if(type == "share_time"){
        if (win >= 5) {
            achievementUser.child(user.uid).update({
                share_5time: true,
            })
        }
    }
    else if(type == "win_in_enemy_turn_time"){
        if (win >= 1) {
            achievementUser.child(user.uid).update({
                win_in_enemy_turn: true,
            })
        }
    }
    else if(type == "win_continuously_challeng_time"){
        if (win >= 25) {
            achievementUser.child(user.uid).update({
                win_continuously_challeng: true,
            })
        }
    }
    else if(type == "win_continuously_uncompromise_time"){
        if (win >= 25) {
            achievementUser.child(user.uid).update({
                win_continuously_uncompromise: true,
            })
        }
    }
    else if(type == "rank"){
        if (win === 1) {
            achievementUser.child(user.uid).update({
                win_top_score: true,
            })
        }
    }
}
})

}


async function insertAchievement(nameAchirvrment,data,condition) {

    const AchirvrmentTable = document.getElementById('achievement-table');
  
    const row = AchirvrmentTable.insertRow();

    const achirvrmentNameCall = row.insertCell(0);
    const achirvrmentConditionCall = row.insertCell(1);
    const achirvrmentGetCall = row.insertCell(2);

    // กำหนดข้อมูลให้กับ cell แต่ละ cell
    achirvrmentNameCall.textContent = nameAchirvrment;
    achirvrmentConditionCall.textContent = `${condition}`;
    achirvrmentGetCall.textContent = data;
  }
  
checkAchirvrment()