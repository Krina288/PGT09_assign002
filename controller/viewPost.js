var post_data = {}
function onPressSignOut() {
    window.location.href = 'login.html';
}

function onPressEditPost() {
    window.location.href = '/editPost.html';
}

function onPressDeletePost() {
    //add confirmation pop up
    window.location.href = '/dashboard.html';
}

// function getPostDetails() {
post_data = JSON.parse(localStorage.getItem('currentPost'));
console.log('post_data ===', post_data);

    // let url = '/getPostsDetails/' + post_data.id
    // console.log('post detailsssss: ', post_data, url);
    // fetch(url)
    //     .then(response => {
    //         response.json()
    //         console.log('response ====', response);
    //     })
    //     .then(data => {
    //         console.log(data);
    //     })
    //     .catch(error => {
    //         console.error('Error fetching post details', error);
    //     });
// }