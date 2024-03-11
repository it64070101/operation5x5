var urlToShare = 'https://operation-5x5.web.app';
const usershare = firebase.database().ref("share")
function shareOnFacebook() {
    addDataShare(1,0)
    const facebookShareURL = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(urlToShare)}`;
    window.open(facebookShareURL, '_blank');
  }
  
  function shareOnTwitter() {
    addDataShare(0,1)
    const twitterURL = `https://twitter.com/intent/tweet?url=${encodeURIComponent(urlToShare)}`;
    window.open(twitterURL, '_blank');
  }
  function addDataShare(facebook_share, twitter_share){
    const currentUser = firebase.auth().currentUser;
    var allShareTime = 0;
    var allFacebook_share = 0;
    var allTwitter_share = 0;
    usershare.child(currentUser.uid).once("value").then((snapshot) => {
        snapshot.forEach((data) => {
          var id = data.key;
          var id_data = data.val();
          if (id == "all_share_time") {
            allShareTime = id_data;
            console.log(id_data)
          }
          else if (id == "facebook_share_time") {
            allFacebook_share = id_data;
            console.log(id_data)
          }
          else if (id == "twitter_share_time") {
            allTwitter_share = id_data;
            console.log(id_data)
          }
        });
        // add score win round losr to user
        allShareTime =  (allFacebook_share + facebook_share) + allTwitter_share+twitter_share;
      usershare.child(currentUser.uid).update({
        email: currentUser.email,
        google_id: currentUser.uid,
        all_share_time: allShareTime,
        facebook_share_time: allFacebook_share + facebook_share,
        twitter_share_time: allTwitter_share+twitter_share,
      })
    });
    
  }