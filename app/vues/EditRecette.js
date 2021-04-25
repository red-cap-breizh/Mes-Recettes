import React, { useState, useEffect } from "react";
import { Alert, Modal, StyleSheet, Text, TouchableOpacity, TouchableHighlight, Pressable, View, Button, TextInput } from "react-native";
import {ChampSaisie} from '../composants/ChampSaisie';
import * as structureRecette from '../src/structRecet.json';//fichier json local de structure recette
//pour gérer les champs sous le clavier
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Icon from 'react-native-vector-icons/FontAwesome';

const darkBlue = "#003C62";
const lightBlue = "#F0FAFF";
const lightGrey = "#EDEDED";
const radius = 10;

export const EditRecette = (parse) => {
    //const [modalVisible, setModalVisible] = useState(false);
    const [recetteEdit,setRecetteEdit] = useState([]);
    const [nomRecette,setnomRecette] = useState("");
    const [urlImage,setUrlImage] = useState("");
    const [categorie,setCategorie] = useState("");
    const [ingredients,setIngredients] = useState("");
    const [description,setDescription] = useState("");

    //console.log("modale: " , parse.visible);

    useEffect(() => {
        chargeStructureRecette();
    }, []);
    const chargeStructureRecette = () => {
        //let tableauTemp = dataRecettes.recettes[0];
        //setRecetteEdit(tableauTemp);
        setRecetteEdit(structureRecette.structureRecette[0]);
        
    };

    // génération d'un id aléatoire (l'id est un nombre de 10 chiffres retourné sous forme de chaine)
    const generateId = () => {
        return Math.random().toString(10).substr(2, 10);
    };

    const validation = () => {
        //on teste si les champs sont renseignés
        if (!nomRecette || !urlImage || !categorie || !ingredients || !description) {
            Alert.alert(
                "Attention!",
                "Au moins un champ n'est pas remplit!",
                [
                    {
                        text: "oK",
                        style: "cancel",
                    },
                ]
                );
            }
            else {
                let recetteTemp = { ...recetteEdit };
                recetteTemp.id = generateId();
                recetteTemp.name = nomRecette;
                recetteTemp.picture = urlImage;
                recetteTemp.categorie = categorie;
                recetteTemp.ingredients = ingredients;
                recetteTemp.preparation = description;
                setRecetteEdit(recetteTemp);
                console.log("trace", parse.desRecettes);
                let desRecettesTemp = [];
                //test de 'desRecettes' car peut être null (on ne peut pas copier un objet null)
                if (parse.desRecettes) {
                    desRecettesTemp = [...parse.desRecettes];
                }
                desRecettesTemp.push(recetteTemp);
                parse.setDesRecettes(desRecettesTemp);
                parse.saveRecettes(desRecettesTemp);
                
                setnomRecette("");
                setUrlImage("");
                setCategorie("");
                setIngredients("");
                setDescription("");
                parse.setVisible(!parse.visible);
            }
    };


    return (
        <View >
            <Modal
                presentationStyle="fullScreen"
                animationType="fade"
                visible={parse.visible}
                onRequestClose={() => {
                    Alert.alert("Modal has been closed.");
                    parse.setVisible(!parse.visible);
                }}
            >
                <View style={styles.body}>
                    <View style={styles.nav}>
                        <Text style={styles.navText}>Ajouter une recette</Text>
                        <TouchableHighlight
                                style={styles.touchable}
                                activeOpacity={0.9}
                                underlayColor="#DDDDDD"
                                onPress={() => {
                                    parse.setVisible(!parse.visible);}
                                }>
                                    <Icon name="times" size={35} color="#000" />
                        </TouchableHighlight>
                    </View>
                    <KeyboardAwareScrollView>
                        <ChampSaisie 
                            titre={"Nom de la recette"}
                            setRecetteEdit={setnomRecette}
                            recetteEdit={nomRecette}

                        ></ChampSaisie>
                        <ChampSaisie 
                            titre={"URL de l'image"}
                            setRecetteEdit={setUrlImage}
                            recetteEdit={urlImage}
                        ></ChampSaisie>
                        <ChampSaisie 
                            titre={"Catégorie"}
                            setRecetteEdit={setCategorie}
                            recetteEdit={categorie}
                        ></ChampSaisie>
                        <ChampSaisie 
                            
                            titre={"Ingrédients"}
                            setRecetteEdit={setIngredients}
                            recetteEdit={ingredients}
                            multiligne={true}
                            hauteur={80}
                        ></ChampSaisie>
                        <ChampSaisie 
                            titre={"Description"}
                            setRecetteEdit={setDescription}
                            recetteEdit={description}
                            multiligne={true}
                            hauteur={80}
                        ></ChampSaisie>
                    </KeyboardAwareScrollView>
                    <View style={styles.containerValidButton}>
                        <TouchableOpacity
                            style={styles.validButton}
                            onPress={validation}
                        >
                            <Text style={styles.validText}>Valider</Text>
                        </TouchableOpacity>
                    </View>
                </View>            
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    body: {
        backgroundColor: lightBlue,
        height: '100%',
    },
    nav:{
        backgroundColor: lightBlue,
        flexDirection: 'row',
        justifyContent: "space-between",
        marginVertical: 10,
    },
    navText:{
        width: '80%',
        textAlign: 'center',
        textAlignVertical: 'center',
        color: darkBlue,
        fontSize: 28,
        fontWeight: 'bold',
    },
    touchable:{
        margin: 10,
    },
    containerValidButton:{
        flex:1,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
        marginBottom: 30,
    },
    validButton:{
        width: 100,
        height: 40,
        borderRadius: radius,
        backgroundColor: darkBlue,
    },
    validText: {
        marginTop:5,
        color: lightGrey,
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});