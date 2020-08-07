import React, {useReducer} from 'react';


//allows us to generate resources for both Context and Providers
export default (reducer, actions, initialState) => {
    const Context = React.createContext();

    const Provider = ({ children}) =>  {
        const [state, dispatch] = useReducer (reducer, initialState);

        //actions === { functionBlogPost: (dispatch) => { return () => {} } }
        const boundActions = {};
        for (let key in actions) {
            boundActions[key] = actions[key](dispatch);
        }

        //identical key:value pairs can just be listed
        return <Context.Provider value={{ state, ...boundActions }}>
            {children}
        </Context.Provider>
    }

    return {Context, Provider };
};
