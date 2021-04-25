import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Accueil from './vues/Accueil';
import Detail from './vues/Detail';
import Test from './vues/Test';

const darkBlue = "#003C62";
const lightBlue = "#F0FAFF";
const lightGrey = "#EDEDED";

const mesStyles = {
    headerStyle:{
        backgroundColor: lightBlue,
    },
    headerTitleStyle:{
        color: darkBlue,
        fontWeight:'bold',
        fontSize: 28,
    },
    headerTitleAlign:'center',
};

const Stack = createStackNavigator();

export default Router = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Accueil">
                <Stack.Screen
                    name="Accueil"
                    component={Accueil}
                    options={({ route }) => ({
                        title: "Recettes",
                        headerStyle:{
                            backgroundColor: lightBlue,
                        },
                        headerTitleStyle:{
                            color: darkBlue,
                            fontWeight:'bold',
                            fontSize: 28,
                        },
                        headerTitleAlign:'center',    
                    })}
                    
                />                
                <Stack.Screen
                    name="Detail"
                    component={Detail}
                    options={({ route }) => ({
                        title: route.params.uneRecette.categorie,
                        headerStyle:{
                            backgroundColor: lightBlue,
                        },
                        headerTitleStyle:{
                            color: darkBlue,
                            fontWeight:'bold',
                            fontSize: 28,
                        },
                        headerTitleAlign:'center',
                    })}
                />
                <Stack.Screen name="Test" component={Test} />
                {/* <Stack.Screen
                    name="Test"
                    component={Test}
                    //options={({ route }) => ({ title: 'le titre de test' })}
                    options={() => ({ title: 'le titre de test' })}
                /> */}
                {/* route.params.uneRecette.name */}
            </Stack.Navigator>
        </NavigationContainer>
    );
};



