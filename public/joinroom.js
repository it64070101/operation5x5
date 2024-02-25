const popupOverlay = document.getElementById('popupOverlay');

    const popup = document.getElementById('popup');

    const closePopup = document.getElementById('closePopup');

    const emailInput = document.getElementById('emailInput');
function joinRoom(){
    

    // Function to open the popup

    function openPopup() {

        popupOverlay.style.display = 'block';

    }

    // Function to close the popup

    function closePopupFunc() {

        popupOverlay.style.display = 'none';

    }

    // Function to submit the signup form


    // Event listeners

    // Trigger the popup to open (you can call this function on a button click or any other event)

    openPopup();

    // Close the popup when the close button is clicked

    closePopup.addEventListener('click', closePopupFunc);

    // Close the popup when clicking outside the popup content

    popupOverlay.addEventListener('click', function (event) {

        if (event.target === popupOverlay) {

            closePopupFunc();

        }

    });

    // You can customize and expand these functions based on your specific requirements.

}

function submitForm() {

    const roomCode = emailInput.value;

    // Add your form submission logic here
        firebase.database().ref('Game').once('value', (snapshot) => {
            const rooms = snapshot.val();
            
            if (roomCode in rooms){
                
                SHARoom(roomCode)
            }
            // ทำสิ่งที่คุณต้องการกับข้อมูลห้องที่ได้รับ
        });

    closePopupFunc(); // Close the popup after form submission

}

function closePopupFunc() {

    popupOverlay.style.display = 'none';

}