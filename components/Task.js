import React, {useState} from "react";
import {View, Text, StyleSheet, TouchableOpacity, Image, Animated, Easing} from 'react-native';
// import * as Svg from 'react-native-svg';
// import { SvgXml } from 'react-native-svg';
// import CustomCheckBox from './CustomCheckBox';
//https://docs.expo.dev/versions/latest/sdk/svg/
import * as DataBase from '../dataBase.js';
import {GlobalStyle, GlobalColors} from '../assets/GlobalStyles/GlobalStyle.js'


const Task = (props) => {
    // let failsafe = (props.isCompleate == true || props.isCompleate == 1)  && true || false;
    const [isDone = (props.isCompleate === 'true'), SetCompleat] = useState();
    const [strikeThroughWidth] = useState(new Animated.Value(isDone == true && 100 || 0));
    const [checkMarkFill] = useState(new Animated.Value(isDone == false && 12 || 0));
    // console.log(`Done: ${isDone} : val: ${isDone == false && 12 || 0}`)
    // console.log(typeof isDone)
    // console.log(isDone == 'true' && 100 || 0)
    // console.log(isDone == 'true')
    // console.log(`${isDone} = ${isDone=='true'}`)
    
    const MarkDone = () => {
        SetCompleat(!isDone);
        DataBase.SetDone(props.id, !isDone);

        Animated.timing(strikeThroughWidth, {
            toValue: isDone ? 0 : 100,
            duration: 250,
            useNativeDriver: false,
            easing: Easing.in(Easing.exp),
        }).start();

        Animated.timing(checkMarkFill, {
            toValue: isDone ? 12 : 0,
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
        // console.log(props.text);
        await DataBase.RemoveKey(props.id);


        //Play the animation




        props.ReloadList();
    }


    // console.log(isDone)
    return (
        <View style={styles.item}>
            <View style={styles.itemLeft}>
                <TouchableOpacity style={styles.square} onPress={() => MarkDone()}>
                    {/* {rendeDrone()} */}
                    <Animated.View style={{
                    position: 'absolute',
                    // height: 1,
                    height: 20,
                    // paddingLeft: 10,
                    // marginLeft: 10,
                    // margin: 1,
                    // padding: 10,
                    // backgroundColor: 'black',
                    width: strikeThroughWidth.interpolate({
                        inputRange: [0, 100],
                        outputRange: ['0%', '100%'],
                      }),
                      height: strikeThroughWidth.interpolate({
                        inputRange: [0, 100],
                        outputRange: ['0%', '100%'],
                      }),
                      transform: [
                        {translateX: checkMarkFill},
                        // {translateY: checkMarkFill}
                    ],
                    // translateY: 12,
                    // transform: [{
                    //     translateY: checkMarkFill.interpolate({
                    //         inputRange: [0, 12],
                    //         outputRange: [0, 12],
                    //     }),
                    // }],
                }}>
                    <Image style={styles.checkMark} source={require('../assets/icons/icons8-checkmark.png')}/>
                </Animated.View>
                </TouchableOpacity>
                
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
            <TouchableOpacity onLongPress={() => Remove()}>
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
        // width: 100,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 15,
        marginHorizontal: 20,
        // marginLeft: margLeft,
    },
    itemLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap',
    },
    square: {
        alignContent: 'center',
        justifyContent: 'center',
        // flex: 1,
        marginLeft: 'auto',
        marginRight: 'auto',
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