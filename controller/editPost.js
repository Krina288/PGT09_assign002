var edit_post_data = {}

function handleInput(e) {
    edit_post_data[e.name] = e.value;
}

function onPressSignOut() {
    // window.location.href = '/login.html';
    localStorage.clear();
    window.location.replace("/");
}

function onPressSave() {
    editPost()
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
    document.getElementById('txt_post_title').value = post_data.txt_post_title
    document.getElementById('txt_post_msg').textContent = post_data.txt_post_msg
    if (post_data.post_type === 'public') {
        document.getElementById('btn_public').checked = true
    } else {
        document.getElementById('btn_private').checked = true
    }
}

function editPost() {
    var public = document.getElementById("btn_public");
    var private = document.getElementById("btn_private");
    var userDeatils = JSON.parse(localStorage.getItem('userDetails'))

    edit_post_data = {
        txt_post_title: document.getElementById('txt_post_title').value,
        txt_post_msg: document.getElementById('txt_post_msg').value,
        post_type: public.checked == true ? 'public' : 'private',
        id: post_data.id,
        created_user_id: userDeatils.id
    }
    console.log('edit_post_data ==>', edit_post_data);
    fetch('/editPost', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'X-Token': userDeatils.token,
        },
        body: JSON.stringify(edit_post_data)
    })
        .then(response => response.text())
        .then(data => {
            console.log("edit post data ==>", data);
            alert('Post is updated successfully.');
            document.getElementById('txt_post_title').value = "";
            document.getElementById('txt_post_msg').value = "";
            window.location.href = '/dashboard.html';
        })
        .catch(error => {
            console.log('Error creating post', error);
        })
}
