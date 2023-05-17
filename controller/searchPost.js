var arrPosts = []

function onPressSignOut() {
    // window.location.href = '/login.html';
    localStorage.clear();
    window.location.replace("/");
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

function getPostList() {
    var userDeatils = JSON.parse(localStorage.getItem('userDetails'));
    console.log('userDeatils ===', userDeatils);
    if (userDeatils == null || !userDeatils.token == null) {
        const errorMessage = document.createElement('p');
        errorMessage.innerText = 'Page not found';
        document.getElementById('parent').innerHTML = '';
        document.getElementById('parent').appendChild(errorMessage);
        document.body.appendChild(errorMessage);
        return;
    }

    var search = localStorage.getItem('searchKeyword')
    console.log('search keyword ==', search);
    arrPosts = []
    fetch(`/getSearchPosts?search=${search}`, {
        headers: {
            'X-Token': userDeatils.token,
        }
    })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            arrPosts = data
            if (arrPosts.length == 0) {
                alert('Oops! post not found.')
                history.back();
            } else {
                setupPostList()
            }
        })
        .catch(error => {
            console.log('Error fetching search posts', error);
        });
}

function setupPostList() {
    var userDeatils = JSON.parse(localStorage.getItem('userDetails'))
    const container = document.getElementById('div_post_list');
    const list = document.createElement('post_list');
    var arrPrivatePost = []
    var arrPublicPost = []
    var arrFilteredPost = []
    list.style.listStyle = 'none'
    list.style.padding = '0px'

    arrPrivatePost = arrPosts.filter((item) => item.created_user_id == userDeatils.id && item.post_type == 'private')
    arrPublicPost = arrPosts.filter((item) => item.post_type == 'public')
    arrFilteredPost = arrPrivatePost.concat(arrPublicPost);

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