import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import UserList from './views/UserList'
import UserForm from './views/UserForm'
import { Button, Icon, Avatar } from 'react-native-elements'
import { UsersProvider } from './context/UsersContext'

//Projeto muito bom para criar uma loja virtual por exemplo !!


const Stack = createStackNavigator()

export default props => {
    return (
        <UsersProvider>
            <NavigationContainer>
                <Stack.Navigator
                    initialRouteName="UserList"
                    screenOptions={screenOptions}>
                    <Stack.Screen
                        name="UserList"
                        component={UserList}
                        options={({ navigation }) => {
                            return {
                                title: "Lista de Usuários",
                                headerRight: () => (
                                    <Button
                                        onPress={() => navigation.navigate('UserForm')}
                                        type="clear"
                                        icon={<Icon name="add" size={30} color="white" />}
                                    />
                                )
                            }
                        }}
                    />
                    <Stack.Screen
                        name="UserForm"
                        component={UserForm}
                        options={{ title: "Formulário de Usuários" }}
                    />
                </Stack.Navigator>
            </NavigationContainer>
        </UsersProvider>
    )
}

const screenOptions = {
    headerStyle: {
        backgroundColor: '#9B30FF'
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
        fontWeight: 'bold'
    }
}




