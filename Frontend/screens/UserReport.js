import XLSX from 'xlsx';
import React,{useState , createRef, Component , useEffect} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import * as Animatable from 'react-native-animatable';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import * as Print from 'expo-print'
import Ip from './Ip';
import { 
    View, 
    Text, 
    Button, 
    TouchableOpacity, 
    Dimensions,
    Alert,
    TextInput,
    Platform,
    ActivityIndicator,
    PermissionsAndroid,
    StyleSheet,
    ScrollView,
    StatusBar,
    Image
} from 'react-native';
import axios from 'axios';
import { DataTable } from 'react-native-paper';

import { writeFile, readFile, DocumentDirectoryPath, DownloadDirectoryPath } from 'react-native-fs';

const DDP = DownloadDirectoryPath + "/";
const output = str => str;

export default class Report extends Component {

  

  readData = async() => {
    try {
        userName = await AsyncStorage.getItem('Name');
        userPFNumber = await AsyncStorage.getItem('PFNumber');
        userMobile = await AsyncStorage.getItem('Mobile');
        userRole = await AsyncStorage.getItem('Role');
        userStation = await AsyncStorage.getItem('Station');
        userQtrNumber = await AsyncStorage.getItem('QtrNumber');
        userColony = await AsyncStorage.getItem('Colony');
        userDepartment = await AsyncStorage.getItem('demo');
    } catch(e) {
      console.log(e);
    }

    this.begin()

}

constructor(props) {
  super(props);

  this.state={
    posts:[],
    Loading:true
  }

  this.exportFile=this.exportFile.bind(this);

}


  begin(){
    this.state.Loading=true

    if(userRole=='Occupant')
    {
        global.Rol='6'
        
    }
    if(userRole=='SeniorSectionEngineer')
    {
      global.Rol='4'
  
    }
    if(userRole=='AdditionalDivisionalEngineer')
    {
      global.Rol='3'

    }
    if(userRole=='DivisionalEngineer')
    {
      global.Rol='2'
      
    }
    if(userRole=='SeniorDivisionalEngineer')
    {
      global.Rol='1'
    
    }
    if(userRole=='JuniorEngineer'){
      global.Rol='5'
    }
    console.log(userDepart)
    global.dis ={
      PFNumber : userPFNumber,
      Name:userName,
      QtrNumber:userQtrNumber,
      Department:userDepart,  
      Colony:userColony,
      Role:Rol,
      Station:userStation,
      Mobile:userMobile,
  }
      axios.post(Ip+'/user/all',dis)
    .then(response =>{
      this.state.Loading=false
      // axios.post(Ip+`/admin/getList/`,dis)
      // .then(res=>{
      //   this.state.Loading=false
      //   let slist=res.data;
      //   console.log(slist,slist.includes(res.Station))
      //   let result=dis.Role==1?response.data:response.data.filter(r=>slist.includes(r.Station))
      //   this.setState({posts:result})
        
      //   })
      this.setState({posts:response.data})
      })
      .catch(error =>
      {
          console.log(error)
      })

      this.render() 

  }

  requestRunTimePermission=()=>{
    var that=this;
    async function externalStoragePermission(){
      try{
        const granted=await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title:'External',
            message:'App needs Permission',
          }
        );
        if(granted === PermissionsAndroid.RESULTS.GRANTED){
          that.exportFile();
        }else{
          alert('Write external');
        }
      }catch(err){
        Alert.alert('Write permission err',err);
        console.warn(err);
      }
    }
    if(Platform.OS==='android'){
      externalStoragePermission();
    }else{
      this.exportFile();
    }
  }
  
  exportFile(){
    var data=
      this.state.posts.map((user) => (
        {

    "PFNumber":`${user.PFNumber}`,
    "Name":`${user.Name}`,
    "Mobile Number":`${user.Mobile}`,
    "Role":`${user.Role}`,
    "Station":`${user.Station}`,
    "Quarter Number":`${user.QtrNumber}`,
    "Colony":`${user.Colony}`,
    "Department":`${user.Department}`
        }
      ))
    const ws=XLSX.utils.json_to_sheet(data);
    const wb=XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb,ws,"SheetJS");
  
    const wbout=XLSX.write(wb,{type:'binary',bookType:"xlsx"});
    const file=DDP+"Users rReport.xlsx";
  
    writeFile(file,output(wbout),'ascii').then((res)=>{
      Alert.alert("Export success"+file);
    }).catch((err)=>{
      Alert.alert("Export error"+err.message);
    });
  };
  

  componentDidMount(){
    this.readData()
  }
  
  refresh(){
    this.state.Loading=true
    axios.post(Ip+'/user/all',dis)
    .then(response =>{
      console.log(response)
      console.log(dis)
      this.state.Loading=false
      // axios.post(Ip+`/admin/getList/`,dis)
      // .then(res=>{
      //   console.log(res)
      //   let slist=res.data;
      //   console.log(slist,slist.includes(res.Station))
      //   let result=dis.Role==1?response.data:response.data.filter(r=>slist.includes(r.Station))
      //   this.setState({posts:result})
      //   this.state.Loading=false
      //   })
      this.setState({posts:response.data})
      })
      .catch(error =>
      {
          console.log(error)
      })

      this.render() 
      
  }
  render() {
      return(
        <View style={styles.container}>
        <StatusBar backgroundColor='#009387' barStyle="light-content"/>
      <View style={styles.header}>
          <Text style={styles.text_header}>User Report!</Text>
      </View>
      <Animatable.View 
          animation="fadeInUpBig"
          style={styles.footer}
      >
        <Button color={'#009387'} title='Refersh' onPress={() => this.refresh()}></Button>
        <View style={{display:"flex",flexDirection:"row",marginTop:50}}>
         <Text style={[styles.text_footer, {
                marginTop: 35
            }]}>User Report :</Text>
            <TouchableOpacity style={{borderRadius:12,width:"45%",marginStart:180,marginTop:25}} onPress={this.requestRunTimePermission}>
          <View style={{display:"flex",flexDirection:"row"}}>
          <FontAwesome
          style={{marginTop:15,marginStart:"25%"}}
                    name="download"
                    color="#009387"
                    size={20}
                />
            {/* {/<Text style={{fontSize: 18,textAlign: 'center',color:"#FFF",marginTop:10,marginStart:15}}>Create PDF</Text>/} */}
          </View>
        </TouchableOpacity>
        </View>
            { this.state.Loading==true && (
            <View style={[styles.container_load,styles.horizontal_load]}>
            <ActivityIndicator size ="large" color="#009387" />
            </View>
          )
          }
            
           
      <ScrollView>
      <View style={{width:"50%"}}>
          </View>
          <View style={{marginTop:50}}>
          <ScrollView horizontal={true}>
        <DataTable style={{borderTopWidth:1,borderRadius:5}}>
        <DataTable.Header style={{borderLeftWidth:1,borderRightWidth:1,borderRadius:5,backgroundColor:"#009387"}}>
      <DataTable.Title style={{borderRightWidth:1,width:100,borderRadius:5}}><Text style={{fontWeight:"bold",color:"#fff",fontSize:15}}>{'\t'}PFNumber</Text></DataTable.Title>
      <DataTable.Title style={{borderRightWidth:1,width:100,borderRadius:5}}><Text style={{fontWeight:"bold",color:"#fff",fontSize:15}}>{'\t'}Name</Text></DataTable.Title>
      <DataTable.Title style={{borderRightWidth:1,width:100,borderRadius:5}}><Text style={{fontWeight:"bold",color:"#fff",fontSize:15}}>{'\t'}QtrNumber</Text></DataTable.Title>
      <DataTable.Title style={{borderRightWidth:1,width:100,borderRadius:5}}><Text style={{fontWeight:"bold",color:"#fff",fontSize:15}}>{'\t'}Colony</Text></DataTable.Title>
      <DataTable.Title style={{borderRightWidth:1,width:100,borderRadius:5}}><Text style={{fontWeight:"bold",color:"#fff",fontSize:15}}>{'\t'}Station</Text></DataTable.Title>
      <DataTable.Title style={{borderRightWidth:1,width:100,borderRadius:5}}><Text style={{fontWeight:"bold",color:"#fff",fontSize:15}}>{'\t'}Role</Text></DataTable.Title>
      <DataTable.Title style={{width:100,borderRadius:5}}><Text style={{fontWeight:"bold",color:"#fff",fontSize:15}}>{'\t'}Mobile Number</Text></DataTable.Title>
    </DataTable.Header>
          {this.state.posts.map((u,i) => {
               return(
             
                 <View key={i}>
                   <DataTable.Row style={{borderRightWidth:1,borderLeftWidth:1,borderRadius:5,borderTopWidth:1,borderBottomWidth:1}}>
          <DataTable.Cell style={{borderRightWidth:1,width:200,borderRadius:5}}>{u.PFNumber}</DataTable.Cell>
          <DataTable.Cell style={{borderRightWidth:1,width:200,borderRadius:5}}>{u.Name}</DataTable.Cell>
          <DataTable.Cell style={{borderRightWidth:1,width:200,borderRadius:5}}>{u.QtrNumber}</DataTable.Cell>
          <DataTable.Cell style={{borderRightWidth:1,width:200,borderRadius:5}}>{u.Colony}</DataTable.Cell>
          <DataTable.Cell style={{borderRightWidth:1,width:200,borderRadius:5}}>{u.Station}</DataTable.Cell>
          <DataTable.Cell style={{borderRightWidth:1,width:200,borderRadius:5}}>{u.Role}</DataTable.Cell>
          <DataTable.Cell style={{width:200,borderRadius:5}}>{u.Mobile}</DataTable.Cell>
          </DataTable.Row>
          </View>
               )
          }
          )
        }
        </DataTable>
        </ScrollView>
        </View>
        </ScrollView>
      </Animatable.View>
    </View>
      
      
        
    );
}
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
  head: { height: 40, backgroundColor: '#f1f8ff' },
  text: { margin: 6 },
  container_load:{
    justifyContent:'center'
  },
  horizontal_load:{
    flexDirection:"row",
    justifyContent:"space-around",
    padding:10
  }, 
  container: {
    flex: 1, 
    backgroundColor: '#009387'
  },
  
  header: {
      flex: 1,
      justifyContent: 'flex-end',
      paddingHorizontal: 20,
      paddingBottom: 50
  },
  container_dropdown: {
      paddingTop: 30,
      marginLeft: 0,
      marginRight:200,
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
      flex: 1,
    },
    
    buttonView: {
      display: 'flex',
      justifyContent: 'center',
      flexDirection: 'row',
      marginTop: 10,
    },
  footer: {
      flex: Platform.OS === 'ios' ? 3 : 5,
      backgroundColor: '#fff',
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
      paddingHorizontal: 20,
      paddingVertical: 30
  },
  text_header: {
      color: '#fff',
      fontWeight: 'bold',
      fontSize: 30
  },
  text_footer: {
      color: '#05375a',
      fontSize: 18
  },
  action: {
      flexDirection: 'row',
      marginTop: 10,
      borderBottomWidth: 1,
      borderBottomColor: '#f2f2f2',
      paddingBottom: 5
  },
  actionComplaint: {
      flexDirection: 'row',
      marginTop: 10,
      borderBottomWidth: 1,
      borderWidth:1,
      borderColor: '#f2f2f2',
      paddingBottom: 5
  },
  textInput: {
      flex: 1,
      marginTop: Platform.OS === 'ios' ? 0 : -12,
      paddingLeft: 10,
      color: '#05375a',
  },
  textInputComplaint: {
      flex:1,
      marginTop: Platform.OS === 'ios' ? 0 : -12,
      paddingTop:15,
      paddingLeft: 10,
      color: '#05375a',
  },
  button: {
      alignItems: 'center',
      marginTop: 50
  },
  buttonUpload: {
      alignItems: 'center',
      marginTop: 30
  },
  signInUpload: {
      width: '55%',
      height: 40,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 10
  },
  textSignUpload: {
      fontSize: 18,
      fontWeight: 'bold'
  },
  signIn: {
      width: '100%',
      height: 50,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 10
  },
  textSign: {
      fontSize: 18,
      fontWeight: 'bold'
  },
  textPrivate: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      marginTop: 20
  },
  color_textPrivate: {
      color: 'grey'
  },
  textStyle: {
    fontSize: 18,
    padding: 10,
    color: 'black',
    textAlign: 'center',
    color:"#FFF"
  },
});