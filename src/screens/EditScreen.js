import React, {useState, useContext} from 'react';
import { View, Text, StyleSheet, TextInput, Button } from 'react-native';
import { Context as BlogContext } from '../context/BlogContext';

import BlogPostForm from '../components/BlogPostForm';

const EditScreen = ( { navigation } ) => {
    //deconstructs both these objects/functions from BlogContext
    const {state, editBlogPost } = useContext(BlogContext);
    const id = navigation.getParam('id')

    const blogPost = state.find(
        (blogPost) => blogPost.id === id
    );

    return ( 
        <View> 
            <BlogPostForm 
            initialValues = {{ title: blogPost.title, author: blogPost.author, content: blogPost.content}}
            onSubmit={(title, content, author) => {
                editBlogPost(id, title, content, author, () => navigation.pop());
            }} />
        </View>
    )
};

 
export default EditScreen;