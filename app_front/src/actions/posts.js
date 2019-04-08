
import { history } from '../store';

const postsLoaded = posts => ({
    type: 'POSTS:LOADED',
    posts: posts
});

const postCreated = post => ({
    type: 'POSTS:CREATED',
    post: post
});

const postsUpdated = post => ({
    type: 'POSTS:UPDATED',
    post: post
});

// create the post
const createPost = (post) => (dispatch, getState) => {

};

const loadPosts = () => (dispatch, getState) => {
    fetch("/api/posts", {
        method: 'GET'
    })
        .then(response => response.json())
        .then(( {posts} ) => dispatch(postsLoaded(posts)))
        .catch(err => dispatch(postError(null)));
};

const deletePost = (postID) => (dispatch, getState) => {

};


export {
    loadPosts,
    createPost,
    deletePost,
    postCreated
}