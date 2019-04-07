const initialState = [];

const PostsReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'POSTS:LOADED':
            return [
                ...action.posts
            ];

        case 'POSTS:ERROR':
            return {
                ...state,
                popupType: action.popup.popupType,
                popupProps: action.popup.popupProps
            };

        case 'POSTS:CREATED':
            return [
                ...state,
                {
                    sourceId: action.post.postID
                }
            ];

        case 'POSTS:UPDATED':
            return state.map(post => {
                return post.sourceId === action.post.postID ?
                    {
                        sourceId: action.post.postID
                    } : post;
            });


        default:
            return state;
    }
};

export default PostsReducer;