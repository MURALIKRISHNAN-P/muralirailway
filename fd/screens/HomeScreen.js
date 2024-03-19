import React , {Component} from 'react';
import axios from 'axios';
import { Avatar, Button, Card, Title, Paragraph, Divider } from 'react-native-paper';
import AsyncStorage from '@react-native-community/async-storage';
//import DialogInput from 'react-native-dialog-input';
import AdminUse from './AdminUse'
import Ip from './Ip';
import { 
  View, 
  Text, 
  ScrollView ,
  TouchableOpacity, 
  TextInput,
  Platform,
  StyleSheet ,
  StatusBar,
  Alert,
  ActivityIndicator
} from 'react-native';

class HomeScreen extends Component{
  _isMounted = false;

  readData = async() => {
      try {
        global.userName = await AsyncStorage.getItem('Name');
        global.userPFNumber = await AsyncStorage.getItem('PFNumber');
        global.userMobile = await AsyncStorage.getItem('Mobile');
        global.userRole = await AsyncStorage.getItem('Role');
        global.userColony = await AsyncStorage.getItem('Colony');
        global.userStation = await AsyncStorage.getItem('Station');
        global.userQtrNumber = await AsyncStorage.getItem('QtrNumber');
        global.userDepart = await AsyncStorage.getItem('demo');
        global.userToken = await AsyncStorage.getItem('foundUser');
      } catch(e) {
        console.log(e);
      }

      this.begin()

  }

  constructor(props){
    super(props)

    this.state={
      posts:[],
      Loading:true
    }
  }

  begin(){
    this.state.Loading=true

    global.dis ={
      PFNumber : userPFNumber,
      Name:userName,
      QtrNumber:userQtrNumber,
      Department:userDepart,  
      Colony:userColony,
      Role:userRole,
      Station:userStation,
      Mobile:userMobile,
  }


    axios.get(Ip+`/user/userComplaints/${userPFNumber}`)
    .then(response =>{
      //console.log(dis)
      // this.state.posts=response.data
      this.state.Loading=false
      console.log(response.data)
      if (this._isMounted) {
      this.setState({posts:response.data.filter(complaint=>complaint.status!=10)})
      }
      })
      .catch(error =>
      {
          console.log(error)
      })

      this.render()

  }
  componentDidMount(){

    this._isMounted = true;
    this.readData()

  }

  componentWillUnmount() {
    this._isMounted = false;
  }
  
  refresh(){
    this.state.Loading=true
    axios.get(Ip+`/user/userComplaints/${userPFNumber}`)
    .then(response =>{
      this.state.Loading=false
      //console.log(dis)
      // this.state.posts=response.data
    
      this.setState({posts:response.data})
      this.render()
      })
      .catch(error =>
          {
              console.log(error)
          })
      
  }

  render(){
   if(userRole=='Admin' ){
    return(
        <AdminUse/>
    )
   }
    else{

    
    if(this.state.posts==0){
      return(
        <View>
        <Button color={'#000000'} onPress={() => this.refresh()}>Refresh</Button>
         <Text style={styles.text_header}>Grievance Status</Text>
        <Card style={styles.card}>
     <Card.Content>
         <Title style={{fontWeight:'bold',textAlign:'center'}}>No Grievance Registered</Title>
     </Card.Content>
       </Card>
       { this.state.Loading==true && (
            <View style={[styles.container_load,styles.horizontal_load]}>
            <ActivityIndicator size ="large" color="#009387" />
            </View>
          )
          }
       </View>
      );
    }
    else{
    return(
      <View>
        <ScrollView>
        <Button color={'#000000'} onPress={() => this.refresh()}>Refresh</Button>
         <Text style={styles.text_header}>Grievance Status</Text>
         { this.state.Loading==true && (
            <View style={[styles.container_load,styles.horizontal_load]}>
            <ActivityIndicator size ="large" color="#009387" />
            </View>
          )
          }
          {
             this.state.posts.map((u,i) => {
               return(
             
                 <View key={i}>
 
            {u.status!='10' &&
            <Card style={styles.card}>
               <Card.Content>
                   <Title style={styles.title}>{u.referenceKey}</Title>
                   <Divider/>
                   <Paragraph style={{fontWeight: 'bold'}}>PFNumber<Paragraph style={{color: '#34495e'}}> : {u.PFNumber}</Paragraph></Paragraph>
                   <Paragraph style={{fontWeight: 'bold'}}>QtrNumber<Paragraph style={{color: '#34495e'}}> : {u.QtrNumber}</Paragraph></Paragraph>
                   <Paragraph style={{fontWeight: 'bold'}}>Colony<Paragraph style={{color: '#34495e'}}> : {u.Colony}</Paragraph></Paragraph>
                   <Paragraph style={{fontWeight: 'bold'}}>Station<Paragraph style={{color: '#34495e'}}> : {u.Station}</Paragraph></Paragraph>
                   <Paragraph style={{fontWeight: 'bold'}}>Grievance category<Paragraph style={{color: '#34495e'}}> : {u.ComplaintCategory}</Paragraph></Paragraph>
                   <Paragraph style={{fontWeight: 'bold'}}>Description<Paragraph style={{color: '#34495e'}}> : {u.Description}</Paragraph></Paragraph>
                   {u.Remarks[0] && (<Paragraph style={{fontWeight: 'bold'}}>Remark<Paragraph style={{color: '#FF0000'}}> : {u.Remarks}</Paragraph></Paragraph>)}
               </Card.Content>
               <Divider/>
               <Card.Content>                
               {u.status=='00' && (<Paragraph style={{fontWeight: 'bold'}}>Status<Paragraph style={{color: '#000080',fontWeight:'bold'}}> : On Progress With Senior Section Engineer</Paragraph></Paragraph>)}
               {u.status=='01' && (<Paragraph style={{fontWeight: 'bold'}}>Status<Paragraph style={{color: '#01ab9d',fontWeight:'bold'}}> : On Progress With Additional Divisional Engineer</Paragraph></Paragraph>)}
               {u.status=='02' && (<Paragraph style={{fontWeight: 'bold'}}>Status<Paragraph style={{color: '#009387',fontWeight:'bold'}}> : On Progress With Divisional Engineer</Paragraph></Paragraph>)}
               {u.status=='03' && (<Paragraph style={{fontWeight: 'bold'}}>Status<Paragraph style={{color: '#000080',fontWeight:'bold'}}> : On Progress With Senior Divisional Engineer</Paragraph></Paragraph>)}
               {u.status=='04' && (<Paragraph style={{fontWeight: 'bold'}}>Status<Paragraph style={{color: '#008000',fontWeight:'bold'}}> : Accepeted and Grievance with Junior Engineer</Paragraph></Paragraph>)}
               {u.status=='-01' && (<Paragraph style={{fontWeight: 'bold'}}>Status<Paragraph style={{color:'#FF0000',fontWeight:'bold'}}> : Grievence Rejected</Paragraph></Paragraph>)}
               </Card.Content>
                 </Card>}
                 </View>       
               );
            }
             )
           }
       </ScrollView>
      </View>
    );
}
}
}
  
}
export default HomeScreen;

const styles = StyleSheet.create({

  container_load:{
    justifyContent:'center'
  },
  horizontal_load:{
    flexDirection:"row",
    justifyContent:"space-around",
    padding:10
  },  

  title:{
    fontWeight: 'bold',
  },
  title_nodata:{
    fontWeight: 'bold',
    textAlign:'center',
  },
  text_header: {
    color: '#34495e',
    fontWeight: 'bold',
    fontSize: 20,
    textAlign:'center'
  },
  container: {
    flex: 1,
  },
  content: {
    padding: 4,
  },
  card: {
    alignContent:'center',
    margin: 16,
    marginTop:15,
    backgroundColor:'#fff',
    borderRadius:12,
    marginBottom:15,
    width:'93%',
    elevation: 6,
  },
    paragraph: {
      margin: 2,
      fontSize: 25,
      fontWeight: 'bold',
      textAlign: 'center',
     // color: '#34495e',

    },
    cardText:{
      fontSize:30,
      padding:10
    },
    button : {
       flex : 1,
       flexDirection : 'row',
       width : '40%',
       marginHorizontal : '10%'
       
    },
    newbutton : {
        fontSize : 12
    },
    ok : {
       width : '50%',
       marginHorizontal : '5%'
    },
    decline : {
       width : "50%",
       marginHorizontal : '10%'
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
  }

}); 