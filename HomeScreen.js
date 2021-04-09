import * as React from 'react';
import {Text,View, TextInput, StyleSheet, TouchableOpacity} from 'react-native'

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      text: ''
    };
  }

  getWord=(word)=>{
    var searchKeyword = word.toLowerCase()
    var url = "https://rupinwhitehatjr.github.io/dictionary/%22+searchKeyword+%22"+searchKeyword+".json"
    return fetch(url)
    .then((data)=>{
      if(data.status===200){
        return data.json()
      }
      else{
        return null
      }
    })
    .then((response)=>{
      var responseObject = response
      if(responseObject){
        var wordData = responseObject.definitions[0]
        var definition = wordData.description
        var lexicalCategory = wordData.wordType
        this.setState({
          'word' : this.state.text,
          'definition': definition,
          'lexicalCategory': lexicalCategory
        })
      }
      else{
        this.setState({
          'word': this.state.text,
          'definition': "Not Found",
        })
      }
    })
  }
  
  render() {
    return (
    <View>
    <TextInput
    style={styles.inputBox}
    onChangeText={text => {
      this.setState({
        text: text,
        isSearchPressed: false,
        word: "Loading...",
        lexicalCategory:'',
        examples:[],
        defination: ""
      });
    }}
    value={this.state.text}
    />
    <TouchableOpacity
    style={styles.searchButton}
    onPress={() => {
      this.setState({ isSearchPressed: true });
      this.getWord(this.state.text)
    }}>
    </TouchableOpacity>
    </View>
    );
  }
}

const styles = StyleSheet.create({
  inputBox: {
    marginTop: 50,
    width: '80%',
    alignSelf: 'center',
    height: 40,
    textAlign: 'center',
    borderWidth: 4,
    outline: 'none',
  },
  searchButton: {
    width: '50%',
    height: 55,
    alignSelf: 'center',
    padding: 10,
    margin: 10,
    backgroundColor: 'red'
  },
});
