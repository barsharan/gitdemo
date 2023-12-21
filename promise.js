// promises.js

const posts = [];

function getPosts() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            let output = '';
            posts.forEach((post, index) => {
                output += `<li>${post.title}</li>`;
            });
            document.body.innerHTML = output;
            resolve('Posts retrieved successfully');
        }, 1000);
    });
}

function createPost(post) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            posts.push(post);
            resolve('Post created successfully');
        }, 2000);
    });
}

// Usage example
getPosts()
    .then((message) => {
        console.log(message);
        return createPost({ title: 'Post Three', body: 'This is post three' });
    })
    .then((message) => {
        console.log(message);
        return getPosts();
    })
    .then((message) => {
        console.log(message);
    })
    .catch((error) => {
        console.error('Error:', error);
    });
