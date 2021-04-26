import React from 'react';
import { View, Text, StyleSheet, TextInput } from "react-native";
//import des couleurs et radius du projet
import localStyles from '../styles/localStyles';

const darkBlue = "#003C62";
const lightBlue = "#F0FAFF";
const lightGrey = "#EDEDED";
const radius = 10;

export const ChampSaisie = (props) => {
    let hTxtInput = props.hauteur;
    return (
        <View style={styles.container}>
            <Text style={styles.titre}>{props.titre}</Text>
            <TextInput
                style={{height: hTxtInput,
                        backgroundColor: lightGrey,
                        color: darkBlue,
                        borderRadius: radius,
                    }}
                onChangeText={valeur => {props.setRecetteEdit(valeur)}}
                value = {props.recetteEdit}
                multiline={props.multiligne}
            />    
        </View>
    );
};

const styles = StyleSheet.create({
    container:{
        margin: 10,
    },
    titre: {
        color: darkBlue,
        fontSize: 18,
        fontWeight: 'bold',
    },
});