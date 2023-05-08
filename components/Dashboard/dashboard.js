let arrPostList = [
    { 'id': 1, 'title': 'Test Event1', 'message': 'Reference site about Lorem Ipsum, giving information on its origins, as well as a random Lipsum generator.' },
    { 'id': 2, 'title': 'Test Event2', 'message': 'Reference site about Lorem Ipsum, giving information on its origins, as well as a random Lipsum generator.' },
    { 'id': 3, 'title': 'Test Event3', 'message': 'Reference site about Lorem Ipsum, giving information on its origins, as well as a random Lipsum generator.' },
    { 'id': 4, 'title': 'Test Event4', 'message': 'Reference site about Lorem Ipsum, giving information on its origins, as well as a random Lipsum generator.' },
    { 'id': 5, 'title': 'Test Event5', 'message': 'Reference site about Lorem Ipsum, giving information on its origins, as well as a random Lipsum generator.' }]

function onPressPost(index) {
    alert('testing' + index)
}

function onPressSignOut() {
    window.location.href = '../Login/login.html';
}

function onPressAddPost() {
    alert('Post is created successfully.')
}

function onPressPostDetail() {
    window.location.href = '../ViewPost/viewPost.html';
}

function onPressEditPost() {
    window.location.href = '../EditPost/editPost.html';
}

function onPressDeletePost() {
    //add alert
    alert('Post is deleted successfully.')
}