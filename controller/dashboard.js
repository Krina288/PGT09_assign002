const create_post_data = {};
var arrPosts = []
var arrFilteredPost = []

function handleInput(e) {
    create_post_data[e.name] = e.value;
}

function onPressPost(index) {
    alert('testing' + index)
}

function onPressAddPost() {
    validation()
}

function onPressViewProfile() {
    window.location.href = '/userProfile.html'
}

function onPressSignOut() {
    // window.location.href = '/login.html';
    localStorage.clear();
    window.location.replace("/");
}

function onPressSearchPost() {
    var searchKeyword = document.getElementById('txt_search').value.trim();
    if (searchKeyword == '') {
        alert('Please enter search keyword')
    } else {
        localStorage.setItem('searchKeyword', searchKeyword)
        document.getElementById('txt_search').value = "";
        window.location.href = '/searchPost.html';
    }
}

function onPressPostDetail(index) {
    localStorage.setItem('currentPost', JSON.stringify(arrPosts[index]))
    window.location.href = '/viewPost.html';
}

function onPressEditPost(index) {
    localStorage.setItem('currentPost', JSON.stringify(arrPosts[index]))
    window.location.href = '/editPost.html';
}

function onPressDeletePost(index) {
    localStorage.setItem('currentPost', JSON.stringify(arrPosts[index]))
    setTimeout(() => {
        deletePost()
    }, 1000)
}

//Validation of input
function validation() {
    var title = document.getElementById('txt_post_title').value.trim();
    var message = document.getElementById('txt_post_msg').value.trim();
    var public = document.getElementById("btn_public");
    var private = document.getElementById("btn_private");

    if (title === '') {
        alert('Please enter post title')
    } else if (message === '') {
        alert('Please enter post message')
    } else {
        if (public.checked == true) {
            create_post_data['post_type'] = 'public'
        } else {
            create_post_data['post_type'] = 'private'
        }
        createPost()
    }
}

function setupPostList() {
    var userDeatils = JSON.parse(localStorage.getItem('userDetails'))
    var arrPrivatePost = []
    var arrPublicPost = []
    const container = document.getElementById('div_post_list');
    const list = document.createElement('post_list');
    list.style.listStyle = 'none'
    list.style.padding = '0px'

    arrPrivatePost = arrPosts.filter((item) => item.created_user_id == userDeatils.id && item.post_type == 'private')
    arrPublicPost = arrPosts.filter((item) => item.post_type == 'public')
    arrFilteredPost = arrPrivatePost.concat(arrPublicPost);

    console.log('Final array ==>', arrFilteredPost, arrPosts);
    arrPosts.forEach((item, index) => {
        // Create a list item element for each item
        const listItem = document.createElement('li');
        listItem.style.marginTop = '10px';
        listItem.style.borderWidth = '1px';
        listItem.style.borderColor = 'black';
        listItem.style.borderStyle = 'groove';
        listItem.style.padding = '5px';
        listItem.style.display = 'flex-direction: column';

        const button = document.createElement('button');
        button.style.backgroundColor = 'transparent';
        button.style.borderStyle = 'none';
        button.style.textAlign = 'left';
        button.style.display = 'flex-direction: column';
        button.addEventListener('click', function () {
            onPressPostDetail(index);
        });

        const txt_title = document.createElement('label')
        txt_title.style.fontWeight = '600';
        txt_title.textContent = item.txt_post_title;

        var mybr = document.createElement('br');
        
        const txt_description = document.createElement('label')
        txt_description.textContent = item.txt_post_msg;

        button.appendChild(txt_title);
        button.appendChild(mybr);
        button.appendChild(txt_description);

        const divButtonContainer = document.createElement('div')
        divButtonContainer.style.display = 'flex-direction: row';
        divButtonContainer.style.justifyItems = 'center';
        divButtonContainer.style.justifyContent = 'flex-end';
        divButtonContainer.style.marginTop = '10px';
        divButtonContainer.style.marginBottom = '10px';
    
        const buttonEdit = document.createElement('button');
        // button.onclick = onPressEditPost()
        buttonEdit.style.width = '60px';
        buttonEdit.style.height = '30px';
        buttonEdit.style.marginRight = '10px';
        buttonEdit.textContent = 'Edit';
        buttonEdit.addEventListener('click', function () {
            onPressEditPost(index);
        });

        const buttonDelete = document.createElement('button');
        // button.onclick = onPressEditPost()
        buttonDelete.style.width = '60px';
        buttonDelete.style.height = '30px';
        buttonDelete.textContent = 'Delete';
        buttonDelete.addEventListener('click', function () {
            console.log('delete button index: ', index);
            onPressDeletePost(index);
        });

        if (userDeatils.id == item.created_user_id) {
            divButtonContainer.appendChild(buttonEdit);
            divButtonContainer.appendChild(buttonDelete);
        }

        listItem.appendChild(button);
        listItem.appendChild(divButtonContainer);
    
        // Append the list item to the unordered list
        list.appendChild(listItem);
    });
    container.appendChild(list);
}

function createPost() {
    var userDeatils = JSON.parse(localStorage.getItem('userDetails'))
    create_post_data['created_user_id'] = userDeatils.id
    fetch('/createPost', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-Token': userDeatils.token,
        },
        body: JSON.stringify(create_post_data)
    })
        .then(response => response.text())
        .then(data => {
            console.log("create post data ==>", data);
            alert('Post is created successfully.');
            document.getElementById('txt_post_title').value = "";
            document.getElementById('txt_post_msg').value = "";
            location.reload()
        })
        .catch(error => {
            console.log('Error creating post', error);
        })
}

function getPostList() {
    var userDeatils = JSON.parse(localStorage.getItem('userDetails'))
    arrPosts = []
    if (userDeatils == null || !userDeatils.token == null) {
        const errorMessage = document.createElement('p');
        errorMessage.innerText = 'Page not found';
        document.getElementById('parent').innerHTML = '';
        document.getElementById('parent').appendChild(errorMessage);
        document.body.appendChild(errorMessage);
        return;
    }

    fetch('/getPosts', {
        headers: {
            'X-Token': userDeatils.token,
        },
    })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            arrPosts = data
            setupPostList()
        })
        .catch(error => {
            console.log('Error fetching posts', error);
        });
}

function deletePost() {
    var userDeatils = JSON.parse(localStorage.getItem('userDetails'))
    var postDetail = JSON.parse(localStorage.getItem('currentPost'));
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
            location.reload()
        })
        .catch(error => {
            console.log('Error deleting post', error);
        })
}