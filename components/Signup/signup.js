const signup_data = {};

// create signup details object
function handleInput(e) {
    signup_data[e.name] = e.value;
}

function onPressSignUp() {
    alert('Successfully register user!');
    console.log('Signup data: ', signup_data);
    window.location.href = '../Dashboard/dashboard.html';
};

function onPressSignIn() {
    history.back();
}