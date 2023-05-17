
function getUserDetails() {
    var userDeatils = JSON.parse(localStorage.getItem('userDetails'))
    if (userDeatils == null || !userDeatils.token == null) {
        const errorMessage = document.createElement('p');
        errorMessage.innerText = 'Page not found';
        document.getElementById('parent').innerHTML = '';
        document.getElementById('parent').appendChild(errorMessage);
        document.body.appendChild(errorMessage);
        return;
    }

    document.getElementById('first_name').value = userDeatils.first_name
    document.getElementById('last_name').value = userDeatils.last_name
    document.getElementById('email').value = userDeatils.email
    document.getElementById('mobile_num').value = userDeatils.mobile_num
}

function onPressSignOut() {
    // window.location.href = 'login.html';
    localStorage.clear();
    window.location.replace("/");
}