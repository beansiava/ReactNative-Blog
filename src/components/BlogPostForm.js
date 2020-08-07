import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button } from 'react-native';



//Will handle both create and edit blogposts
//onSubmit
//initial form values (create === null, edit === blogPost)
//Labels
const BlogPostForm = ( { onSubmit, initialValues} ) => {
    const [title, setTitle] = useState(initialValues.title);
    const [content, setContent] = useState(initialValues.content);
    const [author, setAuthor] = useState(initialValues.author);

    return ( 
        <View> 
            <Text style={styles.label}>Blog Title: </Text>
            <TextInput style={styles.input} value={title} onChangeText={(text) => setTitle(text)}/>
            <Text style={styles.label}>Blog content: </Text>
            <TextInput style={styles.input} value={content} onChangeText={(text) => setContent(text)}/>
            <View style={styles.authorRow}>
                <Text style={styles.author}>Author Signature: </Text>
                <TextInput style={styles.authorinput} value={author} onChangeText={(text) => setAuthor(text)}/>
            </View>
            <Button 
                title="Save Blog Post" 
                //we navigate in the callback. For instance, if API call fails, there would be error that gets navigated away from
                //actually runs context in BlogContext.js
                onPress={() => {
                    onSubmit(title, content, author);
                }}
            /> 
        </View>
     );
};

BlogPostForm.defaultProps = {
    initialValues: {
        title: '',
        content: '',
        author: '',
    }
}

const styles = StyleSheet.create({
    input: {
        fontSize: 18, 
        borderWidth: 1, 
        borderColor: 'black',
        marginBottom: 10,
        padding: 3,
        margin: 3,
    },
    label: {
        fontSize: 20,
        marginBottom: 3,
        marginLeft: 3,
    },
    authorRow:{
        flexDirection: 'row',
        justifyContent: 'flex-start',
        margin: 3,
    },
    author: {
        fontSize: 12, 
        flex: 1,
    },
    authorinput: {
        height: 18,
        fontSize: 12,
        flex: 2,
        borderColor: 'grey',
        borderWidth: 1,
    }
});
 
export default BlogPostForm;