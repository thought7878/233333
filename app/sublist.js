/**
 * 鬼畜表情
 * https://github.com/hakns-zyh
 */
'use strict';

var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  Text,
  Image,
  View,
  TouchableOpacity,
  ScrollView,
  ListView,
  BackAndroid,
} = React;

var _item ;
var _navigator ;

BackAndroid.addEventListener('hardwareBackPress', function() {
  if(_navigator == null){
    return false;
  }
  if(_navigator.getCurrentRoutes().length === 1){
    return false;
  }
  _navigator.pop();
  return true;
});

module.exports = React.createClass({
  getInitialState: function(){
     _navigator = this.props.navigator;
    _item = this.props.route.row;
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    return {
      dataSource: ds.cloneWithRows(this._getData()),
    };
  },
  _getData:function(){
    var datas = [];
    fetch('https://face.ersansan.cn/collection/'+_item.tid)
    .then((response) => response.text())
    .then((responseText) => {
      var  jsonObject = eval("(" + responseText + ")");
      var array = jsonObject.subcollection;
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
  render: function() {
    return (
          <View>
            <View style={{ justifyContent:'center', alignItems:'center',
             backgroundColor:'#FFFF00' , height:56, }}>
              <Text style={{    color:'#212121', fontSize:20,}}>{ _item.title }</Text>
            </View>
            <ListView dataSource={this.state.dataSource}
              renderRow={(rowData) =>
                <TouchableOpacity>
                  <View style={{ flexDirection:'row', alignItems:'center', justifyContent:'space-between' }}>
                    <Image source={{ uri: rowData.thumlink }} style={{height:80,width:80, margin:12,}} />
                    <Text style={{ marginTop:12, color:'#234',backgroundColor:'#234234',fontSize:16,}}>{rowData.title}</Text>
                    <Text style={{ margin:12, color:'#aaaa00', fontSize:24, }}>></Text>
                  </View>
                </TouchableOpacity>
              }/>
            </View>
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