//import React, { useState, useEffect } from 'react';
import React from 'react';
import { View, Text, StyleSheet } from "react-native";
import localStyles from '../styles/localStyles';
//import Icon from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/FontAwesome5';




export default Test = ({route, navigation}) => {
    let listeIcones = Icon.getFontFamily();
    console.log(listeIcones);
    return(
        <View style={{backgroundColor : 'yellow',}}>
            <Text style={styles.text1}>fenetre de test</Text>
            <Text style={styles.text2}>fenetre de test</Text>
            <Text style={styles.text3}>fenetre de test</Text>
            <View>
                <Icon name="rocket" size={30} color="#900" />
            </View>
            <Icon.Button
                name="facebook"
                backgroundColor="#3b5998"
                onPress={() => {console.log("click");}}
            >
                Login with Facebook
            </Icon.Button>
            <Icon name="comments" size={30} color="#900" />
            <Icon name="comments" size={30} color="#900" solid />
            <Icon name="comments" size={30} color="#900" light />
            <View style={{width:60}}>
            <Icon.Button
                name="pencil-alt"
                backgroundColor= {localStyles.lightBlue}
                color='black'
                onPress={() => {console.log("click");}}
                size={30}
                
            >
            </Icon.Button>
            <Icon name="trash-alt" size={30} color="black" />
            <Icon name="plus-square" size={30} color="black" solid/>
            <Icon name="plus-square" size={30} color="black" light/>
            <Icon name="plus-circle" size={30} color="black"/>
            <Icon name="times" size={30} color="black"/>
            <Icon name="shopping-basket" size={35} color="#000"/>
            <Icon name="star" size={35} color="#000" />

            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    text1: {
        height: 60,
        textAlign: 'center',
        textAlignVertical: 'center',
        backgroundColor: localStyles.darkBlue,
        borderRadius : localStyles.radius_s,
    },
    text2: {
        height: 60,
        textAlign: 'center',
        textAlignVertical: 'center',
        backgroundColor: localStyles.lightBlue,
        borderRadius : localStyles.radius_m,
    },
    text3: {
        height: 60,
        textAlign: 'center',
        textAlignVertical: 'center',
        backgroundColor: localStyles.lightGrey,
        borderRadius : localStyles.radius_l,
    },
});