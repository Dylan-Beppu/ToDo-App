import React, {useState} from "react";
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import * as DataBase from '../dataBase.js';


const Task = (props) => {
    const [isDone = props.isCompleate, SetCompleat] = useState();
    
    // isDone = props.isCompleate;

    // SetCompleat(props.isCompleate);

    
    const MarkDone = () => {
        SetCompleat(!isDone);
    }


    function rendeDrone(){
        if(isDone == true){
            return <Text>✔️</Text>;
        }
        return ""
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
                <Text style={TextStyle()}>{props.text}</Text>
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
        marginBottom: 20,
    },
    itemLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap',
    },
    square: {
        width: 24,
        height: 24,
        backgroundColor: '#55bcf6',
        opacity: 0.4,
        borderRadius: 5,
        marginRight: 15,
    },
    itemText: {
        maxWidth: '80%',
    },
    strikeItemText: {
        textDecorationLine: 'line-through',
        maxWidth: '80%',
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