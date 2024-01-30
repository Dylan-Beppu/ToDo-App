import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

// class Ttest  extends Component (
class Ttest extends Component {
    constructor(props){
        super(props);
        this.state = {color: 'Green'}
    }


    render() {
        return(
        <Text>lorem   </Text>
        );
    }
}

const styles = StyleSheet.create({
    square: {
        width: 24,
        height: 24,
        backgroundColor: '#55bcf6',
        opacity: 0.4,
        borderRadius: 5,
        marginRight: 15,
    }
});


export  default Ttest;