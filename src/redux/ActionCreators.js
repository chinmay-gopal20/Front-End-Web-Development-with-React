import * as ActionTypes from './ActionTypes';
import { baseUrl } from "../shared/baseUrl";

export const addComment = (dishId, rating, author, comment) => ({
    type: ActionTypes.ADD_COMMENT,
    payload: {
        dishId: dishId,
        rating: rating,
        author: author,
        comment: comment,
    }
})

export const fetchDishes = () => (dispatch) => {
    dispatch(dishesLoading(true));

    return fetch(baseUrl + 'dishes')
        .then(response => {
            if(response.ok){
                return response
            }else{
                var error = new Error('Error ' + response.status + ': ' + response.statusText)
                error.response = response;
                throw error
            }
        }, error => {
            var error = new Error(error.message);
            throw error;
        })
        .then(response => response.json())
        .then(dishes => dispatch(addDishes(dishes)))
        .catch(err => dispatch(dishesFailed(err)))
}

export const dishesLoading = () => ({
    type: ActionTypes.DISHES_LOADING
})

export const dishesFailed = (err) => ({
    type: ActionTypes.DISHES_FAILED,
    payload: err.toString()
})

export const addDishes = (dishes) => ({
    type: ActionTypes.ADD_DISHES,
    payload: dishes
})

export const fetchPromos = () => (dispatch) => {
    dispatch(promosLoading(true));

    return fetch(baseUrl + 'promotions')
        .then(response => {
            if(response.ok){
                return response
            }else{
                var error = new Error('Error ' + response.status + ': ' + response.statusText)
                error.response = response;
                throw error
            }
        }, error => {
            var error = new Error(error.message);
            throw error;
        })
        .then(response => response.json())
        .then(promos => dispatch(addPromos(promos)))
        .catch(err => dispatch(promosFailed(err)));
}

export const promosLoading = () => ({
    type: ActionTypes.PROMOS_LOADING
})

export const promosFailed = (err) => ({
    type: ActionTypes.PROMOS_FAILED,
    payload: err.toString()
})

export const addPromos = (promos) => ({
    type: ActionTypes.ADD_PROMOS,
    payload: promos
})

export const fetchComments = () => (dispatch) => {

    return fetch(baseUrl + 'comments')
        .then(response => {
            if(response.ok){
                return response
            }else{
                var error = new Error('Error ' + response.status + ': ' + response.statusText)
                error.response = response;
                throw error
            }
        }, error => {
            var error = new Error(error.message);
            throw error;
        })
        .then(response => response.json())
        .then(comments => dispatch(addComments(comments)))
        .catch(err => dispatch(commentsFailed(err)));
}

export const commentsFailed = (err) => ({
    type: ActionTypes.COMMENTS_FAILED,
    payload: err.toString()
})

export const addComments = (comments) => ({
    type: ActionTypes.ADD_COMMENTS,
    payload: comments
})