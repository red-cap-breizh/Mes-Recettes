
import React from 'react';
import { View, StyleSheet, FlatList, TouchableHighlight } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { useState, useEffect } from 'react';

//fichier json local de recettes
import * as dataRecettes from '../src/recettesFr.json';

import { BlocRecette } from '../composants/BlocRecette';
import { EditRecette } from '../vues/EditRecette'

const darkBlue = "#003C62";
const lightBlue = "#F0FAFF";
const lightGrey = "#EDEDED";

export default Accueil = ({ route, navigation }) => {
    //const [uneRecette, setUneRecette] = useState([]);
    const [desRecettes, setDesRecettes] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);

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
            //on teste s'il y a des recettes sauvegardées à charger
            if(retour[0]){
                console.log("On charge les recettes sauvegardées");
            }
            //s'il n'y a pas de recettes sauvegardées, on charge des recettes de démo
            else{
                console.log("On charge les recettes de démo");
                setDesRecettes(dataRecettes.recettes);
                //chargeDesRecettes();
            }
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

    // petite fonction de test
    const fctTest = () => {
        console.log("click btn test");
    };

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
                                    <Icon name="edit" size={35} color="#000" />
                                </TouchableHighlight>,
        });
    }, [navigation]);

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

};


const styles = StyleSheet.create({
    container: {
        backgroundColor: lightBlue,
    },
    touchable:{
        borderRadius: 10,
        margin: 10,
    },
});
