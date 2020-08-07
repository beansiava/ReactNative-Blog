import React, {useContext, } from 'react';
import { View, Text, TextInput, StyleSheet, Button } from 'react-native';
import {Context as BlogContext} from '../context/BlogContext';

import BlogPostForm from '../components/BlogPostForm';

const CreateScreen = ({navigation}) => {
    
    const {addBlogPost} = useContext(BlogContext);

    return (
        <View>
            <BlogPostForm  onSubmit={(title, content, author) => {
                addBlogPost(title, content, author, () => navigation.navigate('Index'));
            }}/>
        </View>
    )

   
}


export default CreateScreen;


