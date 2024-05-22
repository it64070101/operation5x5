addUser.once("value").then((snapshot) => {
    snapshot.forEach((data) => {
      console.log(data.key)
  //addUser.child(currentUser.uid).update({
  //  win_continuously: 0,
 // })
 addUser.child(data.key).update({
    win_continuously: 0,
    share_time: 0,
    win_in_enemy_turn_time: 0,
    win_continuously_challeng_time: 0,
    win_continuously_uncompromise_time: 0,
  });
})
});