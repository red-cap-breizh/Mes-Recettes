
import React from 'react';
import { View,Text,Button, StyleSheet, FlatList, TouchableHighlight } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome5';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState, useEffect } from 'react';

//import des couleurs et radius du projet
import localStyles from '../styles/localStyles';

//fichier json local de recettes
import * as dataRecettes from '../src/recettesFr.json';

//import composants internes
import { BlocRecette } from '../composants/BlocRecette';
import { EditRecette } from '../vues/EditRecette'


export default Accueil = ({ route, navigation }) => {
    //const [uneRecette, setUneRecette] = useState([]);
    const [desRecettes, setDesRecettes] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    //const [presenceRecettes, setPresenceRecettes] = useState(false);

    // on charge des recettes provenant du fichier json local pour test
    useEffect(() => {
        getRecettes();    
    }, []);
    const chargeDesRecettes = () => {
        setDesRecettes(dataRecettes.recettes);
    };

    const saveRecettes = async (desRecettes) =>{
        try{
            const jsonValue = JSON.stringify(desRecettes)
            await AsyncStorage.setItem("@mesRecettes", jsonValue)
        }catch(e){
            console.log("erreur fct 'saveRecettes': ",e);
        }
    };

    const getRecettes = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem("@mesRecettes");
            let retour = (jsonValue != null ? JSON.parse(jsonValue) : null);
            setDesRecettes(retour);
        } catch(e) {
           // traitement des erreurs
            console.log("erreur fct 'getRcettes': ", e);
        }
    };
    
    //cas de demande d'effacement d'une recette l'idRecette est routé en provenance de vues.Detail
    if (route.params){
        let copieDesRecettes = [...desRecettes];
        let desRecettesTemp = copieDesRecettes.filter(recette => recette.id != route.params.idSuppRecette);
        setDesRecettes(desRecettesTemp);
        saveRecettes(desRecettesTemp);
        //On efface le parametre après utilisation car il est toujours présent à chaque retour dans accueil
        route.params = "";
    }

    //fonction pour passer l'objet navigation, et le 'hooks recettes' dans les éléments de la flatlist
    const appelBlocRecette = ({ item }) => {
        return (
            <BlocRecette
                item={item}
                navigation={navigation}
            >
            </BlocRecette>
        )
    };

//Configutation de la barre de navigation
    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => <TouchableHighlight
                                    style={styles.touchable}
                                    activeOpacity={0.9}
                                    underlayColor="#DDDDDD"
                                    onPress={() => {
                                        setModalVisible(true);}
                                    }>
                                    <Icon name="plus-square" size={35} color="#000" />
                                </TouchableHighlight>,
        });
    }, [navigation]);
    
    
    //teste de présence de recettes pour gérer deux affichages différents
    if(desRecettes[0]){
        return (
            <View style={styles.container}>
    
                {/* affichage de la liste des recettes */}
                <FlatList
                    data={desRecettes}
                    renderItem={appelBlocRecette}
                    keyExtractor={item => item.id}
                />
    
                {/* Fenetre modale : elle s'affiche avec la variable bool 'visible' */}
                <EditRecette
                    visible={modalVisible}
                    setVisible={setModalVisible}
                    desRecettes={desRecettes} 
                    setDesRecettes={setDesRecettes}
                    saveRecettes={saveRecettes}
                >
                </EditRecette>
            </View>
        );
    }
    else{
        return (
            <View style={styles.container}>
                <View style={styles.blocText_1}>
                    <Text style={styles.text}>Cliquez sur “+” en haut à droite,
                    </Text>
                    <Text style={styles.text}>pour ajouter une
                            première recette.
                    </Text>
                </View>
                <View style={styles.blocText_2}>
                    <Text style={styles.text}>Ou cliquez sur le bouton en dessous,
                    </Text>
                    <Text style={styles.text}>pour charger des recettes de demo.
                    </Text>
                </View>
                <View style={styles.button}>
                    <Button
                        title="charger les recettes de demo"
                        color={localStyles.darkBlue}
                        onPress={() => {
                            setDesRecettes(dataRecettes.recettes);
                        }}
                    />
                </View>

    
                {/* Fenetre modale : elle s'affiche avec la variable bool 'visible' */}
                <EditRecette
                    visible={modalVisible}
                    setVisible={setModalVisible}
                    desRecettes={desRecettes} 
                    setDesRecettes={setDesRecettes}
                    saveRecettes={saveRecettes}
                >
                </EditRecette>
            </View>
        );
    };
    

};


const styles = StyleSheet.create({
    blocText_1:{
        marginTop: 150,
    },
    blocText_2:{
        marginTop: 100,
        marginBottom: 20,
    },
    text:{
        color: localStyles.darkBlue,
        fontSize: 18,
        textAlign: 'center',
    },
    button:{
        margin:20,
    },
    container: {
        backgroundColor: localStyles.lightBlue,
        height: '100%',
    },
    touchable:{
        borderRadius: localStyles.radius_s,
        margin: 10,
    },
});
