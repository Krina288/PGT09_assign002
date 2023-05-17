var post_data = {}
var userDeatils = {}

function onPressSignOut() {
    // window.location.href = 'login.html';
    localStorage.clear();
    window.location.replace("/");
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

function checkToken() {
    post_data = JSON.parse(localStorage.getItem('currentPost'));
    userDeatils = JSON.parse(localStorage.getItem('userDetails'));
    console.log('post_data ===', post_data, userDeatils);
    if (post_data == null || post_data == undefined || userDeatils == null || !userDeatils.token == null) {
        const errorMessage = document.createElement('p');
        errorMessage.innerText = 'Page not found';
        document.getElementById('parent').innerHTML = '';
        document.getElementById('parent').appendChild(errorMessage);
        document.body.appendChild(errorMessage);
        return;
    }

    document.getElementById('post_title').textContent = post_data.txt_post_title
    document.getElementById('post_msg').textContent = post_data.txt_post_msg
    if (userDeatils.id == post_data.created_user_id) {
        document.getElementById('btn_edit').style.visibility = 'visible'
        document.getElementById('btn_delete').style.visibility = 'visible'
    } else {
        document.getElementById('btn_edit').style.visibility = 'hidden'
        document.getElementById('btn_delete').style.visibility = 'hidden'
    }
}

function deletePost() {
    var postDetail = JSON.parse(localStorage.getItem('currentPost'));
    userDeatils = JSON.parse(localStorage.getItem('userDetails'));
    fetch(`/deletePost`, {
        method: 'DELETE',
        headers: {
            'X-Token': userDeatils.token,
            'id': postDetail.id
        }
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