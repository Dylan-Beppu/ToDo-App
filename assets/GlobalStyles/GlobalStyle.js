import { StyleSheet } from "react-native";


//Using xx2 for dark mode (if it happens (follow system theam))
export const GlobalColors = {
    Background: '#E8EAED',
    Background2: '#Hex',
    Foreground: '#Hex',
    Foreground2: '#Hex',
    Accent: '#Hex',
    Accent2: '#Hex',
}





export const GlobalStyle = StyleSheet.create({
    Title: {
        fontSize: 30,
        fontWeight: 'bold',
        // fontFamily: ''
    },
    textBtn: {
        color: GlobalColors.Accent,
        fontFamily: ''
    },



});
