import React, { useReducer} from 'react';
import { State } from 'react-native-gesture-handler';

import createDataContext from './createDataContext';
import jsonServer from '../api/jsonServer';





const blogReducer = ( state, action ) => {
    switch (action.type) {
        case 'get_blogposts': 
            return action.payload;//bc we are storing state as 'truth' in db.json
        
        case 'edit_blogpost':
            return state.map((blogPost) =>{
                if(blogPost.id === action.payload.id) {
                    return action.payload;
                } else {
                    return blogPost;
                }
            });
        case 'remove_blogpost': 
            //basically says "keep only the state that doesn't have this id"
            return state.filter( (blogPost) =>  blogPost.id !== action.payload );

        default:
            return state;
    };
};

const getBlogPosts = (dispatch) => {
    return async () => {
        const response = await jsonServer.get('/blogposts'); //gets blogpost array from db.json
        // response.data === []
        dispatch({type: 'get_blogposts', payload: response.data});
    };
};

const addBlogPost = (dispatch) => {
    return async (title, content, author, callback) => {
        await jsonServer.post('/blogposts', {title, content, author});
        
        // //If there was an api we wanted to prevent error, use async/await for API  and Try/catch for error
       
        if(callback){
            callback();
        }
    };
};

const removeBlogPost = (dispatch) => {
    return async (id) => { 
        await jsonServer.delete(`/blogposts/${id}`)
        dispatch({ type: 'remove_blogpost', payload: id })
    };
};

const editBlogPost = (dispatch) => {
    return async (id, title, content, author, callback) => {
        await jsonServer.put(`/blogposts/${id}`, {title, content, author})
        dispatch({ type: 'edit_blogpost', payload: {id, title, content, author}})
        if(callback){
            callback();
        }
    };
};

//Creates context and provider for this specific blog reducer
//to be used by rest of app
export const { Context, Provider} = createDataContext(
    blogReducer, //reducer
    { addBlogPost, removeBlogPost, editBlogPost, getBlogPosts }, //actions 
    [] //state
);

