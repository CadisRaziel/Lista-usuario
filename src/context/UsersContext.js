import React, { createContext, useReducer } from 'react'
import users from '../data/users'


const initialState = { users }
const UsersContext = createContext({})

export const UsersProvider = props => {

    function reducer(state, action){
        if(action.type === 'deleteUser'){
            const user = action.payload
            return {
                ...state,
                users: state.users.filter(u => u.id !== user.id)
            }
        }
        return state
    }

    const [state, dispatch] = useReducer(reducer, initialState)

    return(
        <UsersContext.Provider value={{state, dispatch}}>        
            {props.children} 
        </UsersContext.Provider>
    )
}


export default UsersContext
// vamos conseguir acessar a lista de usuarios a partir desse modulo aqui
//vamos compartilha os usuarios, representa o state inteiro da minha aplicação


//TUDO QUE FOI COLOCADO AQUI DENTRO DESSE COMPONENTE ABAIXO SERA RENDERIZADO AQUI DIRETAMENTE DENTRO DE USERSCONTEXT.PROVIDER
//ISSO POR CAUSA DO PROPS.CHILDREN
// <UsersContext.Provider value={{
//     state: {
//         users
//     }
// }}>
//     {props.children} 
// </UsersContext.Provider>


//fazendo isso eu nao preciso importar o modulo para dentro do UserList por exemplo