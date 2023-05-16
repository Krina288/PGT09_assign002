
function getUserDetails() {
    var userDeatils = JSON.parse(localStorage.getItem('userDetails'))
    document.getElementById('first_name').value = userDeatils.first_name
    document.getElementById('last_name').value = userDeatils.last_name
    document.getElementById('email').value = userDeatils.email
    document.getElementById('mobile_num').value = userDeatils.mobile_num
}

function onPressSignOut() {
    window.location.href = 'login.html';
}