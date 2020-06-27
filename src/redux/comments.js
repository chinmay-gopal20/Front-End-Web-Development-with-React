import * as ActionTypes from './ActionTypes';

export const Comments = (state = {
        err: null,
        comments: []
    }, action) => {
    switch(action.type){
        case ActionTypes.ADD_COMMENT:
            var comment = action.payload;
            comment.id = state.length;
            comment.date = new Date().toISOString();
            return state.comments.concat(comment);
        case ActionTypes.COMMENTS_FAILED:
            return {...state, err:action.payload}
        case ActionTypes.ADD_COMMENTS:
            return {...state, err:null, comments:action.payload}
        default:
            return state;
    }
}