const login_data = {};

// create login details object
function handleInput(e) {
    login_data[e.name] = e.value;
}

function onPressSignIn() {
    validation()
};

function onPressSignUp() {
    window.location.href = '/signup.html';
};

//Validation of input
function validation() {
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    var email = document.getElementById('email').value.trim();
    var password = document.getElementById('password').value.trim();

    if (email === '') {
        alert('Please enter email')
    } else if (!email.match(mailformat)) {
        alert('Please enter valid email address')
    } else if (password === '') {
        alert('Please enter password')
    } else {
        loginUser()
    }
}

function loginUser() {
    fetch('/loginUser', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(login_data)
    })
        .then(response => response.text())
        .then(data => {
            console.log("login user data ==>", data);
            // if (data !== 'false') {
                window.location.href = '/dashboard.html';
            // } else {
            //     console.log('Invalid email/password');
            // }
        })
        .catch(error => {
            console.log('Error creating user', error);
        })
}
