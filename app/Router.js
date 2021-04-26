import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// import des composants internes
import Accueil from './vues/Accueil';
import Detail from './vues/Detail';
import Test from './vues/Test';

//import des couleurs et radius du projet
import localStyles from './styles/localStyles';


const mesStyles = {
    headerStyle:{
        backgroundColor: localStyles.lightBlue,
    },
    headerTitleStyle:{
        color: localStyles.darkBlue,
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
                            backgroundColor: localStyles.lightBlue,
                        },
                        headerTitleStyle:{
                            color: localStyles.darkBlue,
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
                            backgroundColor: localStyles.lightBlue,
                        },
                        headerTitleStyle:{
                            color: localStyles.darkBlue,
                            fontWeight:'bold',
                            fontSize: 28,
                        },
                        headerTitleAlign:'center',
                    })}
                />
                <Stack.Screen name="Test" component={Test} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};



