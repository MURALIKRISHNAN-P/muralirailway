import React , {Component} from 'react';
import axios from 'axios';
import { Avatar, Button, Card, Title, Paragraph, Divider } from 'react-native-paper';
import AsyncStorage from '@react-native-community/async-storage';
import Ip from './Ip';
import { 
  View, 
  Text, 
  ScrollView ,
  TouchableOpacity, 
  TextInput,
  Platform,
  StyleSheet ,
  ActivityIndicator,
  StatusBar,
  Alert
} from 'react-native';

class CompletedGrievence extends Component{


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

  }

  constructor(props){
    super(props)

    this.state={
      posts:[],
      compl:[],
      Loading:true
    }
  }

  componentDidMount(){
    this.state.Loading=true
    this.readData()
      axios.get(Ip+`/user/userComplaints/${userPFNumber}`)
      .then(response =>{
      
        //console.log(dis)
        // this.state.posts=response.data
        
        respon=response.data.filter(complaint=>complaint.status=='10')
        console.log(respon)
        this.setState({compl:respon})
        this.state.Loading=false
        })
        .catch(error =>
        {
            console.log(error)
        })
  }
  
  

  refresh1(){
    this.state.Loading=true
    axios.get(Ip+`/user/userComplaints/${userPFNumber}`)
    .then(response =>{
        respon=response.data.filter(complaint=>complaint.status=='10')
        console.log(respon)
        this.setState({compl:respon})
        this.state.Loading=false
        })
        .catch(error =>
        {
            console.log(error)
        })  
  }


  render(){
    if(this.state.posts==0){
        return(
          <View>
          <Button color={'#000000'} onPress={() => this.refresh()}>Refresh</Button>
           <Text style={styles.text_header}>Grievance Status</Text>
          <Card style={styles.card}>
       <Card.Content>
           <Title style={{fontWeight:'bold',textAlign:'center'}}>No Data</Title>
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
      <Button color={'#000000'} onPress={() => this.refresh1()}>Refresh</Button>
       <Text style={styles.text_header}>Completed Grievance</Text>
       { this.state.Loading==true && (
            <View style={[styles.container_load,styles.horizontal_load]}>
            <ActivityIndicator size ="large" color="#009387" />
            </View>
          )
          }
       <ScrollView>
        
          
          {
             this.state.compl.map((u,i) => {
               return(
             
                 <View key={i}>
 
 
 <Card style={styles.card}>
               <Card.Content>
                   <Title style={styles.title}>{u.referenceKey}</Title>
                   <Divider/>
                   <Paragraph style={{fontWeight: 'bold'}}>PFNumber<Paragraph style={{color: '#34495e'}}> : {u.PFNumber}</Paragraph></Paragraph>
                   <Paragraph style={{fontWeight: 'bold'}}>QtrNumber<Paragraph style={{color: '#34495e'}}> : {u.QtrNumber}</Paragraph></Paragraph>
                   <Paragraph style={{fontWeight: 'bold'}}>Colony<Paragraph style={{color: '#34495e'}}> : {u.Colony}</Paragraph></Paragraph>
                   <Paragraph style={{fontWeight: 'bold'}}>Station<Paragraph style={{color: '#34495e'}}> : {u.Station}</Paragraph></Paragraph>
                   <Paragraph style={{fontWeight: 'bold'}}>Complaint category<Paragraph style={{color: '#34495e'}}> : {u.ComplaintCategory}</Paragraph></Paragraph>
                   <Paragraph style={{fontWeight: 'bold'}}>Description<Paragraph style={{color: '#34495e'}}> : {u.Description}</Paragraph></Paragraph>
               </Card.Content>
               <Divider/>
               <Card.Content>
               <Paragraph style={{fontWeight: 'bold'}}>Status<Paragraph style={{color: '#008000',fontWeight:'bold'}}> : Registered Grievance is Completed Successfully.</Paragraph></Paragraph>
               </Card.Content>
                 </Card>                
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
export default CompletedGrievence;

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