import React, {useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import { Keyboard, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableOpacity, FlatList, View } from 'react-native';
import * as DataBase from './dataBase.js';
// import "react-native-gesture-handler";

import Task from './components/Task'
import Ttest from './components/ClassTest';





// let TestData = [
//   {}
// ]



// function addElements(n) {
//   const startKey = testData2.length + 1;
//   for (let i = 0; i < n; i++) {
//     // console.log(`Task ${startKey + i}`)
//     testData2.push({
//       Key: startKey + i,
//       Task: `Task ${startKey + i}`,
//       Done: false,
//       date: null,
//     });
//   }
// }

// addElements(40);



// async function LoadTodos(){
//   try{

//   }
// }




export  default function App() {
  const [task, setTask] = useState();
  const [taskItems, setTaskItems] = useState([]);
  const [testData, setTestData] = useState([]);

  const [todoTab, setTodos] = useState([]);
  
  React.useEffect(() => {
    DataBase.dbLoader();
  }, []);
  
 

  const  handleAddTask = () => {
    Keyboard.dismiss();
    setTaskItems([...taskItems, task]);

    setTask(null);

  }

  const completeTask = (index) => {
    let itemsCopy = [...taskItems];
    itemsCopy.splice(index,1);
    setTaskItems(itemsCopy);
  }
  
  async function AddItem() {
    Keyboard.dismiss();
    await DataBase.addTodo(task);
    InitList();
    setTask(null);
  }

  async function InitList() {
    const tab = await DataBase.GetTodos();
    setTodos(tab);
  }

  async function ReloadList() {
    console.log("I Shuld be reloading")
    await InitList();
  }


  // const RemoveLastItem = () => {
  //   setTestData(testData2.pop())
  // }



  React.useEffect(() => {
    InitList();
  }, []);




  return (
    <View style={styles.container}>
     <View style={styles.tasksWrapper}>
      <Text style={styles.sectionTitle}>Today's tasks</Text>


      {/* Changed to flat list as to be way more efficent with the loading */}
      <FlatList
        data={todoTab}
        renderItem={({item}) => <Task text={item.Task} id={item.Key} isCompleate={item.Done} ReloadList={() => ReloadList()} fun/>}
        keyExtractor={item => item.Key}
      />
     </View>

     {/* Write a task view */}
     <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.writeTaskWrapper}
      >
        <TextInput style={styles.input} placeholder={'write a task'} value={task} onChangeText={text => setTask(text)}/>
        
        <TouchableOpacity onPress={() => AddItem()}>
          <View style={styles.addWrapper}>
            <Text style={styles.addText}>+</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => DataBase.logDat()}>
          <View style={styles.addWrapper}>
            <Text style={styles.addText}>T</Text>
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>

      <StatusBar style="auto" />
    </View>
  );
}

// TODO: Move to its own file
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8EAED',
    // paddingTop: 0,
    // marginTop: 40,
  },
  tasksWrapper: {
    
    // backgroundColor: '#444444',
    paddingTop: 30,
    paddingHorizontal: 20,
    paddingBottom: 110,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold'
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
    backgroundColor: '#FFF',
    borderRadius: 60,
    borderColor: '#C0C0C0',
    borderWidth: 1,
    width: 250,
  },
  addWrapper: {
    width: 60,
    height: 60,
    backgroundColor: '#FFF',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#C0C0C0',
    borderWidth: 1,
  },
  addText: {},
});