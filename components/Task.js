import React, {useState} from "react";
import {View, Text, StyleSheet, TouchableOpacity, Image, Animated, Easing} from 'react-native';
// import * as Svg from 'react-native-svg';
// import { SvgXml } from 'react-native-svg';

//https://docs.expo.dev/versions/latest/sdk/svg/
import * as DataBase from '../dataBase.js';



const Task = (props) => {
    const [isDone = props.isCompleate, SetCompleat] = useState();
    const [strikeThroughWidth] = useState(new Animated.Value(isDone == true && 100 || 0));

    
    const MarkDone = () => {
        SetCompleat(!isDone);
        DataBase.SetDone(props.id, !isDone);

        Animated.timing(strikeThroughWidth, {
            toValue: isDone ? 0 : 100,
            duration: 250,
            useNativeDriver: false,
            easing: Easing.in(Easing.exp),
          }).start();
    }


    function rendeDrone(){
        
        if(isDone == true){
            
            // return <Text>✔️</Text>;
            return <Image style={styles.checkMark} source={require('../assets/icons/icons8-checkmark.png')}/>

        }
        return "";
    }

    function TextStyle(){
        if(isDone == true){
            return styles.strikeItemText;
        }
        return styles.itemText;
    }

    async function Remove(){
        console.log(props.text);
        await DataBase.RemoveKey(props.id);

        props.ReloadList();
    }


    // console.log(isDone)
    return (
        <View style={styles.item}>
            <View style={styles.itemLeft}>
                <TouchableOpacity style={styles.square} onPress={() => MarkDone()}>{rendeDrone()}</TouchableOpacity>
                <View style={styles.itemLeft}>
                <Text style={TextStyle()}>{props.text}</Text>
                <Animated.View style={{
                    position: 'absolute',
                    height: 1,
                    backgroundColor: 'black',
                    width: strikeThroughWidth.interpolate({
                        inputRange: [0, 100],
                        outputRange: ['0%', '100%'],
                      }),
                }} />
                </View>           
            </View>
            <TouchableOpacity onPress={() => Remove()}>
                <View style={styles.circular}></View>
            </TouchableOpacity>
        </View>
    )
}




const styles = StyleSheet.create({
    item: {
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 15,
        marginHorizontal: 20,
    },
    itemLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap',
    },
    square: {
        width: 24,
        height: 24,
        // backgroundColor: '#55bcf6',
        borderColor: '#55bcf6',
        borderWidth: 2,
        opacity: 0.4,
        borderRadius: 5,
        marginRight: 15,
    },
    itemText: {
        maxWidth: '100%',
        fontStyle: 'normal',

    },
    strikeItemText: {
        fontStyle: 'italic',
        maxWidth: '100%',
    },
    checkMark: {
        maxHeight: '100%',
        maxWidth: '100%',
    }, 
    circular: {
        width: 12,
        height: 12,
        borderColor: '#55bcf6',
        borderWidth: 2,
        borderRadius: 5,

    },
});

export default Task;