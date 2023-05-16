var edit_post_data = {}

function handleInput(e) {
    edit_post_data[e.name] = e.value;
}

function onPressSignOut() {
    window.location.href = '/login.html';
}

function onPressSave() {
    editPost()
}

post_data = JSON.parse(localStorage.getItem('currentPost'));
console.log('post_data ===>', post_data);

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
            'Content-Type': 'application/json'
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
