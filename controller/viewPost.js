var post_data = {}
var userDeatils = {}

function onPressSignOut() {
    window.location.href = 'login.html';
}

function onPressViewProfile() {
    window.location.href = '/userProfile.html'
}

function onPressEditPost() {
    window.location.href = '/editPost.html';
}

function onPressDeletePost() {
    deletePost()
}

post_data = JSON.parse(localStorage.getItem('currentPost'));
userDeatils = JSON.parse(localStorage.getItem('userDetails'));
console.log('post_data ===', post_data, userDeatils);

function deletePost() {
    var postDetail = JSON.parse(localStorage.getItem('currentPost'));
    fetch(`/deletePost?id=${postDetail.id}`, {
        method: 'DELETE',
    })
        .then(response => response.text())
        .then(data => {
            alert(`${data}`)
            window.location.href = '/dashboard.html';
        })
        .catch(error => {
            console.log('Error deleting post', error);
        })
}