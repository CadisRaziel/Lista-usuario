import React, { createContext, useReducer } from 'react'
import users from '../data/users'


const initialState = { users }
const UsersContext = createContext({})


//criando essa função com o mesmo nome do action.type que é (type: 'deleteUser',) nós podemos dificir as funções assim
const actions = {
    createUser(state, action){
        const user = action.payload
        user.id = Math.random()
        return{
            ...state, 
            users: [...state.users, user]
        }
    },  
    updateUser(state, action){
        const updated = action.payload
        return {
            ...state,
            users: state.users.map(u => u.id === updated.id ? updated : u)
        }
    },
    deleteUser(state, action) {
        const user = action.payload
        return {
            ...state, //se tiver mais elementos no estado precisa ter essa opção ativa (nos comentamos ela pois só tem 1 atributo no estado)
            users: state.users.filter(u => u.id !== user.id) //filter vai sempre retornar um array novo !! e nao mexer no estado anterior
        }    
    }
}

export const UsersProvider = props => {

    function reducer(state, action){
        const fn = actions[action.type]
        return fn ? fn(state, action ) : state
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