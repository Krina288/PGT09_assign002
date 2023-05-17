const signup_data = {};

// create signup details object
function handleInput(e) {
    signup_data[e.name] = e.value;
}

function onPressSignUp() {
    validation()
};

function onPressSignIn() {
    history.back();
}

//Validation of input
function validation() {
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    var passwordFormat = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    var first_name = document.getElementById('first_name').value.trim();
    var last_name = document.getElementById('last_name').value.trim();
    var mobile_num = document.getElementById('mobile_num').value.trim();
    var email = document.getElementById('email').value.trim();
    var password = document.getElementById('password').value.trim();

    if (first_name === '') {
        alert('Please enter first name')
    } else if (last_name === '') {
        alert('Please enter last name')
    } else if (mobile_num === '') {
        alert('Please enter mobile number')
    } else if (email === '') {
        alert('Please enter email')
    } else if (!email.match(mailformat)) {
        alert('Please enter valid email address')
    } else if (password === '') {
        alert('Please enter password')
    } else {
        createUser()
    }

    // else if (!password.match(passwordFormat)) {
    //     alert('Please enter valid password')
    // }
}

function createUser() {
    fetch('/registerUser', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(signup_data)
    })
        .then(response => response.text())
        .then(data => {
            console.log("create user data ==>", data);

            var user_data = JSON.parse(data)
            if (user_data.error == 'Email is already registered.') {
                alert(user_data.error)
                document.getElementById('email').value = ""
            } else {
                alert(data)
                // localStorage.setItem('userDetails', data)
                // const token = user_data.token;
                // console.log('registered token', token);

                // if (!token) {
                //     const errorMessage = document.createElement('p');
                //     errorMessage.innerText = 'Page not found';
                //     document.body.appendChild(errorMessage);
                //     return;
                // }
                window.location.href = `/login.html`;
            }
        })
        .catch(error => {
            console.log('Error creating user response', error);
        })
}