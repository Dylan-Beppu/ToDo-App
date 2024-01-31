import React, {useState, useRef, useEffect} from 'react';

import { StatusBar, TouchableWithoutFeedback } from 'react-native';
import { Keyboard, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, Modal,Pressable, SafeAreaView, TouchableOpacity, FlatList, View, Alert } from 'react-native';
// import AndroidSystemBars from 'react-native-system-bars';
import * as DataBase from './dataBase.js';
// import "react-native-gesture-handler";
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Task from './components/Task'


// AndroidSystemBars.hideNavigationBar();

export  default function App() {
  const [task, setTask] = useState();
  const [todoTab, setTodo] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  React.useEffect(() => {
    DataBase.dbLoader();
  }, []);
  
 
 
  async function AddItem() {
    Keyboard.dismiss();
    setModalVisible(false);
    try {
      await DataBase.addTodo(task);
      InitList();
      setTask(null);
    } catch (e) {
      Alert.alert('ToDoApp', 'Unable to add blank todo', [
        {text: 'OK'},
      ]);
    }
    
  }

  async function InitList() {
    const tab = await DataBase.GetTodo();
    setTodo(tab);
  }

  async function ReloadList() {
    await InitList();
  }

  async function  openAndFocus(){
    setModalVisible(true);
  }



  React.useEffect(() => {
    InitList();
  }, []);



  return (    
    // using safe area to not collide with everything
    <SafeAreaView style={styles.container}>


<Modal
  animationType="slide"
  transparent={true}
  visible={modalVisible}
  onRequestClose={() => {
    Keyboard.dismiss();

    setModalVisible(!modalVisible);
  }}
>
  <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{flex: 1, justifyContent: 'flex-end'}}>
    <View style={styles.modalView}>
      <TouchableWithoutFeedback>
      <TextInput style={styles.input}  autoFocus={true} placeholder={'write a task'} value={task} onChangeText={text => setTask(text)}/>
      </TouchableWithoutFeedback>
      <TouchableOpacity onPress={() => AddItem()}>
        <View style={styles.addWrapper}>
          <Text style={styles.addText}>+</Text>
        </View>
      </TouchableOpacity>
    </View>
  </KeyboardAvoidingView>
</Modal>


     <View style={styles.tasksWrapper}>
      <View style={styles.CenterTop}>
      <Text style={styles.sectionTitle}>Today's tasks</Text>
      <TouchableOpacity onPress={() => openAndFocus()}>
          {/* <View style={styles.addWrapper}> */}
            <Text style={{color: '#548aa3'}}>New Task</Text>
          {/* </View> */}
        </TouchableOpacity>
      </View>
    

      {/* Changed to flat list as to be way more efficent with the loading */}
      <FlatList
        data={todoTab}
        renderItem={({item}) => <Task text={item.Task} id={item.Key} isCompleate={item.IsDone} ReloadList={() => ReloadList()} fun/>}
        keyExtractor={item => item.Key}
      />
     </View>
      <StatusBar backgroundColor="#E8EAED" barStyle="dark-content" />
    </SafeAreaView>
  );
}

// TODO: Move to its own file
const styles = StyleSheet.create({

  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#E8EAED',
  },
  tasksWrapper: {
    flex:1,
  },
  sectionTitle: {
    fontSize: 30,
    fontWeight: 'bold',
    // paddingBottom: 15,
    // paddingLeft: 20,
  },
  CenterTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 10,
  },
  items: {
    marginTop: 30,
  },
  writeTaskWrapper: {
    position: 'absolute',
    bottom: 20,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  input: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    width: '85%'
  },
  addWrapper: {
    padding: 10,
    width: 50,
    height: 50,
    backgroundColor: '#FFF',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#C0C0C0',
    borderWidth: 1,
    fontSize: 50,
  },
  modalView: {
    marginBottom: 0,
    borderBottomEndRadius: 0,
    borderBottomStartRadius: 0,

    backgroundColor: '#fff',
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingRight: 5,
    borderWidth: 1,
    borderColor: '#C0C0C0',
    height: 60,
    shadowColor: '#212b35',
    shadowOpacity: 0.5,
    shadowRadius: 50,
    elevation: 5,
  },
});