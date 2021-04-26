import React from 'react';
import { View, Text, Image, StyleSheet, TouchableHighlight, Alert, SafeAreaView, ScrollView } from "react-native";
import { color } from 'react-native-reanimated';
//import Icon from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/FontAwesome5';
//import des couleurs et radius du projet
import localStyles from '../styles/localStyles';





export default Detail = ({route,navigation,desRecettes,setDesRecettes}) => {
    //configuration de la barre de navigation
    React.useLayoutEffect(() => {
    navigation.setOptions({
        headerRight: () => <TouchableHighlight
                            style={styles.touchable}
                            activeOpacity={0.9}
                            underlayColor="#DDDDDD"
                            onPress={() => {
                                suppRecette();}
                            }>
                            <Icon name="trash-alt" size={35} color="#000" />
                            </TouchableHighlight>,
    });
    }, [navigation]);

    // ajout de puces dans la liste des ingrédients séparés par retour chariot (\u2022 est le code d'une puce)
    let lesIngredients = '\u2022 ' + route.params.uneRecette.ingredients;
                            //le split + join permet de remplacer toutes les occurences
    lesIngredients = lesIngredients.split('\n').join('\n\u2022 ');

    const suppRecette = ()=>{
        //message alerte utilisateur pour confirmation suppression recette
        Alert.alert(
            "Effacer cette recette?",
            "",
            [
                {
                    text: "Annuler",
                    style: "cancel"
                },
                //retour accueil avec envoie de l'id de la recette à supprimer
                { 
                    text: "Effacer",
                    onPress: () => navigation.navigate('Accueil', {idSuppRecette: route.params.uneRecette.id})
                }
            ]
        );        
    };
    return(
        <ScrollView >
        <View>
            <View style={styles.header}>
                <View style={styles.containerImage}>
                    <Image
                        style={styles.image}
                        source={{
                            uri: route.params.uneRecette.picture,                    
                        }}
                    />            
                </View>
                <Text style={styles.nomRecette}>{route.params.uneRecette.name}</Text>
            </View>
            <View style={styles.body}>
                <View style={styles.titreSection}>
                    <Icon name="shopping-basket" size={35} color="#000" />
                    <Text style={styles.textSection}>Ingrédients</Text>
                </View>
                <Text style={styles.textIngredients}>{lesIngredients}</Text>
                <View style={styles.titreSection}>
                    <Icon name="star" size={35} color="#000" />
                    <Text style={styles.textSection}>Description</Text>
                </View>
                        <Text style={styles.textPreparation}>{route.params.uneRecette.preparation}</Text>
            </View>
        </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    touchable:{
        borderRadius: 10,
        margin: 10,
    },
    header:{
        height: 300,
    },
    body:{
        paddingHorizontal: 20,
    },
    titreSection:{
        flexDirection: 'row',
        marginVertical: 15,
    },
    textSection:{
        textAlignVertical: 'bottom',
        color: localStyles.darkBlue,
        fontSize: 20,
        marginLeft: 20,
        fontWeight: 'bold',
    },
    textIngredients: {
        color: localStyles.darkBlue,
        fontSize: 18,
        fontWeight: 'bold',
    },
    textPreparation: {
        color: localStyles.darkBlue,
        fontSize: 12,
        fontWeight: 'bold',
        marginBottom:30,
        
    },
    containerImage:{
        height:235,
    },
    image: {
        width: '100%',
        height: 250,
    },
    nomRecette: {
        backgroundColor: localStyles.darkBlue,
        borderTopRightRadius: localStyles.radius_m,
        borderBottomRightRadius : localStyles.radius_m,
        width: '80%',
        height: 70,
        color: localStyles.lightGrey,
        textAlign: 'center',
        textAlignVertical: 'center',
        fontSize: 25,
    },
    icon: {
        marginRight: 5,
        marginTop: 'auto',
        marginBottom: 'auto',
    }
});