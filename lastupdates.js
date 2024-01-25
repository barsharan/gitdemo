const posts = [];
let lastActivityTime = null;

function createPost(post) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            posts.push(post);
            resolve('Post created successfully');
        }, 1000);
    });
}

function updateLastUserActivityTime() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            lastActivityTime = new Date().toLocaleString();
            resolve(lastActivityTime);
        }, 1000);
    });
}

function deletePost() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (posts.length > 0) {
                const deletedPost = posts.pop();
                resolve(`Post deleted: ${deletedPost.title}`);
            } else {
                reject("No posts to delete");
            }
        }, 1000);
    });
}

// Example usage
createPost({ title: 'Post One', content: 'This is the first post' })
    .then(() => updateLastUserActivityTime())
    .then((updatedTime) => {
        console.log(posts);
        console.log(`Last activity time: ${updatedTime}`);
        return createPost({ title: 'Post Two', content: 'This is the second post' });
    })
    .then(() => updateLastUserActivityTime())
    .then((updatedTime) => {
        console.log(posts);
        console.log(`Last activity time: ${updatedTime}`);
        return deletePost();
    })
    .then((deletedPost) => {
        console.log(deletedPost);
        console.log(posts);
    })
    .catch((error) => console.error(error));
