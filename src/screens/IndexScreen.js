import React, { useContext, useEffect } from 'react';
import { View, Text, Button, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import { Context as BlogContext} from '../context/BlogContext';
import {Feather} from  '@expo/vector-icons'
import { State } from 'react-native-gesture-handler';

const IndexScreen = ({navigation}) => {
    //useContext gives us acces to the props of a Context Object
    //we must DECONSTRUCT the object passed by the provider
    const {state, addBlogPost, removeBlogPost, getBlogPosts }= useContext(BlogContext);

    //
    useEffect(() => {
        getBlogPosts();

        //listeners need to be managed to prevent memory leak, so we can't just call them.
        const listener = navigation.addListener ('didFocus', () => {
            getBlogPosts();
        });

        //runs if the index screen is removed from navigation object
        return () => {
            listener.remove();
        };
    }, []); 

    return ( 
        <View>
                {/* addBlogPost is the same as () => {addBlogPost()} */}
                <FlatList 
                data={state}
                keyExtractor={(blogPost) => {blogPost.title}}
                renderItem={({item}) => {
                    return (
                        // Open the specific blog by id
                    <TouchableOpacity 
                        onPress={ () => navigation.navigate("Blog", {id: item.id})}
                    >
                        <View style={styles.row} > 
                            <Text style={{flex:1,}}>{item.title} - {item.id} </Text>
                            <Text style= {styles.authorStyle}>By: {item.author} </Text>
                            <TouchableOpacity
                                onPress ={() => {removeBlogPost(item.id)}} 
                            >
                                <Feather style={styles.icon} name="trash-2" />
                            </TouchableOpacity>
                        </View> 
                    </TouchableOpacity>
                    )
                }}
        />
        </View>
     );
};

IndexScreen.navigationOptions = ( {navigation} ) => {
    return {
        headerRight: () => (
            <TouchableOpacity onPress={() => navigation.navigate('Create')}>
                <View style={{justifyContent: 'flex-end', flexDirection: 'row'}}>
                    <Text style={styles.headerText}>Add Blog</Text>
                    <Feather name="plus-circle" size={24} color="grey" />
                </View>
            </TouchableOpacity>
        )
    };
};

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between', //
        paddingVertical: 15,
        paddingHorizontal: 10,
        borderTopWidth: 1,
 
        borderColor: 'black',
    },
    icon: {
        fontSize: 24,
    },
    headerText:{
        fontSize: 16,
        color: 'grey',
        marginRight: 5,
    },
    plusIcon: {

    },
    authorStyle: {
        paddingTop: 3,
        fontSize: 10,
        flex: 1,
    
        // fontFamily: 'Montserrat, sans-serif',
        fontWeight: '300',
    }
});

export default IndexScreen;