/**
 * 鬼畜表情
 * https://github.com/hakns-zyh
 */
'use strict';

var React = require('react-native');
var SubListView = require('./sublist.js')
var {
  AppRegistry,
  StyleSheet,
  Text,
  Image,
  View,
  TouchableOpacity,
  ScrollView,
  ListView,
  Navigator,
} = React;
var  _navigator ;
module.exports = React.createClass({
  getInitialState: function(){
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    return {
      dataSource: ds.cloneWithRows(this._getData()),
    };
  },

  _getData:function(){
    var datas = [];
    fetch('https://face.ersansan.cn/mainpage')
    .then((response) => response.text())
    .then((responseText) => {
      var  jsonObject = eval("(" + responseText + ")");
      var array = jsonObject.List;
      for(var i=0; i<array.length; i++ ){
        datas.push(array[i]);
      }
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(datas),
        isLoading: false
      });
    })
    .catch((error) => {
      console.warn(error);
    }).done;
    return datas;
  },

  configureScenceAndroid: function(){
    return Navigator.SceneConfigs.FadeAndroid;
  },

  renderSceneAndroid: function(route, navigator){
    _navigator = navigator;
    if(route.id === 'main'){
      return (
        <ScrollView>
          <View>
            <View style={{ justifyContent:'center', alignItems:'center',
             backgroundColor:'#FFFF00' , height:56, }}>
              <Text style={{    color:'#212121', fontSize:20,}}>鬼畜表情</Text>
            </View>
            <View style={{ height:150, alignSelf:'stretch' }}>
              <Image source={{ uri: 'http://face.ersansan.cn/Public/pic/banner/hongbao.jpg' }} style={styles.topImage}/>
            </View>
            <ListView dataSource={this.state.dataSource}
              renderRow={(rowData) =>
                  <View>
                  <TouchableOpacity onPress={() => _navigator.push({ row:rowData,id:'subList'})}  >
                    <View  style={{ flexDirection:'row' , alignItems:'center', height:56,}}>
                      <View  style={{ width:4, margin:4,  backgroundColor:'#FFFF00' }} />
                      <Text style={{ color:'#FF0000', fontSize:20,  margin: 8}}>{ rowData.title }</Text>
                      <Text style={{ color:'#000000', fontSize:14,  margin: 8}}>更多></Text>
                    </View>
                  </TouchableOpacity>
                    <View style={{ flexDirection:'row', justifyContent:'space-between', marginLeft:8,marginRight:8 }}>
                      <TouchableOpacity sytle={styles.item}>
                        <Image source={{ uri: rowData.subList[0].thumlink }} style={styles.itemImage} />
                        <Text style={styles.itemText}>{ rowData.subList[0].title }</Text>
                      </TouchableOpacity>
                      <TouchableOpacity sytle={styles.item}>
                        <Image source={{ uri: rowData.subList[1].thumlink }} style={styles.itemImage} />
                        <Text style={styles.itemText}>{ rowData.subList[1].title }</Text>
                      </TouchableOpacity>
                      <TouchableOpacity sytle={styles.item}>
                        <Image source={{ uri: rowData.subList[2].thumlink }} style={styles.itemImage} />
                        <Text style={styles.itemText}>{ rowData.subList[2].title }</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
              }/>
            </View>
        </ScrollView>
      );
    }

    if(route.id === 'subList'){
      return (
        <SubListView navigator={navigator} route={route}/>
       );
    }

  },
  render: function() {
    var renderScene = this.renderSceneAndroid;
    var configureScence = this.configureScenceAndroid;
    return (
      <Navigator
       debugOverlay={false}
       initialRoute={{ id:'main'}}
       configureScence={{ configureScence }}
       renderScene={renderScene}
      />
    );
  }
});

var styles = StyleSheet.create({
  topImage:{
     flex:1,
     alignSelf:'stretch',
  },
  item:{
  },
  itemText:{
      alignSelf:'center',
  },
  itemImage:{height:90,width:90, margin:12,},
});
