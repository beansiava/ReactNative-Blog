import React, {useContext} from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

import { Context as BlogContext } from '../context/BlogContext';
import { TouchableOpacity } from 'react-native-gesture-handler';

const BlogScreen = ( {navigation } ) => { 
    const {state} = useContext(BlogContext);

    //grab blog post that matches ID passed by navigation from BlogContext
    const blogPost = state.find((blogPost) => blogPost.id === navigation.getParam('id'));
    return <View>
        <Text>{blogPost.title}</Text>
    </View> 
};

BlogScreen.navigationOptions = ( {navigation } ) => {
    return {
        headerRight: () => (
            <TouchableOpacity onPress={() => navigation.navigate('Edit', { id: navigation.getParam('id')})}>
                <FontAwesome5 name="edit" size={24}/>
            </TouchableOpacity>     
        )
    }
}

const styles = StyleSheet.create({

});

export default BlogScreen;

// return {
//     headerRight: () => (
//       <TouchableOpacity onPress={() => navigation.navigate('Edit')}>
//         <EvilIcons name="pencil" size={35} />
//       </TouchableOpacity>
//     ),
//   };