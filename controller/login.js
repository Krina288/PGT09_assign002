const login_data = {};

// create login details object
function handleInput(e) {
    login_data[e.name] = e.value;
}

function onPressSignIn() {
    console.log('login data: ', login_data);
    //navigate screen
    window.location.href = '/dashboard.html';
};

function onPressSignUp() {
    window.location.href = '/signup.html';
};

