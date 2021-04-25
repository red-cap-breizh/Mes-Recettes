import React from 'react';
import { View, Text, Image, StyleSheet, TouchableHighlight } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';

const darkBlue = "#003C62";
const lightBlue = "#F0FAFF";
const lightGrey = "#EDEDED";
const radius = 10;

export const BlocRecette = ({item , navigation}) => {

    return (
        <TouchableHighlight style={styles.touchable} onPress={() => {
                navigation.navigate('Detail', {uneRecette : item});
            }
        }>
        <View style={styles.container}>
                <Image
                    style={styles.image}
                    source={{   
                        uri: item.picture,    
                        
                    }}
                />
                <View style={styles.blocText}>
                    <Text style={styles.categorie}>{item.categorie}</Text>
                    <Text style={styles.nomRecette}>{item.name}</Text>
                </View>
                <View>
                    <Icon style={styles.icon} name="eye" size={24} color={lightGrey} />
                </View>
                
        </View>
        </TouchableHighlight>
    );
};



const styles = StyleSheet.create({
    container: {
        height:90,
        flexDirection: "row",
        backgroundColor: darkBlue,
        borderRadius: radius,
    },
    touchable:{
        borderRadius: radius,
        margin:5,
    },
    image: {
        borderBottomLeftRadius: radius,
        borderTopLeftRadius: radius,width: 90,
        height: 'auto',
    },
    blocText: {
        width: "65%",
        height: "auto",
    },

    categorie: {
        fontSize: 10,
        width: "30%",
        height: "15%",
        textAlign: "center",
        backgroundColor: lightGrey,
    },
    nomRecette: {
        height:"85%",
        textAlign: 'center',
        textAlignVertical: 'center',
        fontSize: 25,
        fontWeight: 'bold',
        paddingHorizontal: 18,
        paddingBottom: 10,
        color: lightGrey,
    },
    icon: {
        marginRight: 5,
        marginTop: 'auto',
        marginBottom: 'auto',
    }
});