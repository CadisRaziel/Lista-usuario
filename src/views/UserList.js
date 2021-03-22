import React, { useContext } from 'react'
import { View, Text, FlatList, Alert } from 'react-native'
import { ListItem, Avatar, Button, Icon } from 'react-native-elements'

// import users from '../data/users' //com o const { state } eu nao preciso importar o modulo users diretamente
import UsersContext from '../context/UsersContext'


export default props => {
    //console.warn(Object.keys(props)) //para saber o que foi passado para o props

    const { state, dispatch } = useContext(UsersContext)   

    function confirmUserDeletion(user) {
        Alert.alert('Excluir Usuário', 'Deseja realmente excluir o usuário?', [
            {
                text: 'Sim',
                onPress() {
                    dispatch({ //esse objeto abaixo representa a "action"
                        type: 'deleteUser',
                        payload: user
                    })
                }
            },
            {
                text: 'Não'
            }
        ])
    }

    //função para renderizar os usuarios
    function getUserItem({ item: user }) {
        return (

            <ListItem key={user.id}
                bottomDivider
                onPress={() => props.navigation.navigate('UserForm', user)}>
                <Avatar source={{ uri: user.avatar_url }} />
                <ListItem.Content>
                    <ListItem.Title>{user.name}</ListItem.Title>
                    <ListItem.Subtitle>{user.email}</ListItem.Subtitle>
                </ListItem.Content>
                <ListItem.Content right style={{flexDirection: 'row'}}>
                    <Button type="clear"
                        icon={<Icon name="edit" size={25} color="orange" />}
                        onPress={() => props.navigation.navigate('UserForm', user)} />
                    <Button type="clear"
                        icon={<Icon name="delete" size={25} color="red" />}
                        onPress={() => confirmUserDeletion(user)} />
                </ListItem.Content>
            </ListItem>
        )
    }


    return (
        <View>
            <FlatList
                keyExtractor={user => user.id.toString()}
                data={state.users}
                renderItem={getUserItem}// vai renderizar uma lista com os nomesou email como eu colocar na que  eu criei la em users.js
            />
        </View>
    )
}

//return <Text>{user.name}- {user.email}</Text> //esse name esta no modulo users dentro da pasta data