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
  ActivityIndicator,
  StyleSheet ,
  StatusBar,
  Alert
} from 'react-native';

class Complictionstatus extends Component{


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
  constructor(props){
    super(props)

    this.state={
      posts:[],
      Loading:true
    }
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
        axios.post(Ip+'/admin/showComplaints',dis)
      .then(response =>{
        this.state.Loading=false
        //console.log(dis)
        // this.state.posts=response.data
        respon=response.data.filter(complaint=>complaint.status=='04')
        this.setState({posts:respon})
        })
        .catch(error =>
        {
            console.log(error)
        })
  
        this.render()
  
      }

  componentDidMount(){
    this.readData()
  }

  accept1(referenceKey){
    axios.post(Ip+`/admin/verComplaints/${referenceKey}`,dis)
    .then(response =>{
      const message = {
        to: response.data.Token,
        sound: 'default',
        title: 'Grievance',
        body: 'Your Grievance has been Completed !!!',
        data: { data: 'goes here' },
      };
  
      // fetch('https://exp.host/--/api/v2/push/send', {
      //   method: 'POST',
      //   headers: {
      //     Accept: 'application/json',
      //     'Accept-encoding': 'gzip, deflate',
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify(message),
      // });
      // console.log(response)
      // this.state.posts=response.data
      Alert.alert('Completed!', 'Work has Completed', [
        {text: 'Okay'}
    ]);
      this.componentDidMount()
      this.refresh2()
  })
  .catch(error =>
      {
          console.log(error)
      })

      this.render()

  }

refresh2(){
  this.state.Loading=true
    axios.post(Ip+'/admin/showComplaints',dis)
    .then(response =>{
      this.state.Loading=false
      //console.log(dis)
      // this.state.posts=response.data
      respon=response.data.filter(complaint=>complaint.status=='04')
        this.setState({posts:respon})
      this.render()
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
        <Button color={'#000000'} onPress={() => this.refresh2()}>Refresh</Button>
         <Text style={styles.text_header}>Pending Grievances</Text>
        <Card style={styles.card}>
     <Card.Content>
         <Title style={{fontWeight:'bold',textAlign:'center'}}>No Pending Grievances</Title>
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
      <Button color={'#000000'} onPress={() => this.refresh2()}>Refresh</Button>
       <Text style={styles.text_header}>Pending Grievances</Text>
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


<Card style={styles.card}>
             <Card.Content>
                 <Title style={styles.title}>{u.Name}</Title>
                 <Divider/>
                 <Paragraph style={{fontWeight: 'bold'}}>PFNumber<Paragraph style={{color: '#34495e'}}> : {u.PFNumber}</Paragraph></Paragraph>
                 <Paragraph style={{fontWeight: 'bold'}}>Reference Key<Paragraph style={{color: '#34495e'}}> : {u.referenceKey}</Paragraph></Paragraph>
                 <Paragraph style={{fontWeight: 'bold'}}>QtrNumber<Paragraph style={{color: '#34495e'}}> : {u.QtrNumber}</Paragraph></Paragraph>
                 <Paragraph style={{fontWeight: 'bold'}}>Role<Paragraph style={{color: '#34495e'}}> : {u.Role}</Paragraph></Paragraph>
                 <Paragraph style={{fontWeight: 'bold'}}>Colony<Paragraph style={{color: '#34495e'}}> : {u.Colony}</Paragraph></Paragraph>
                 <Paragraph style={{fontWeight: 'bold'}}>Station<Paragraph style={{color: '#34495e'}}> : {u.Station}</Paragraph></Paragraph>
                 <Paragraph style={{fontWeight: 'bold'}}>Grievance category<Paragraph style={{color: '#34495e'}}> : {u.ComplaintCategory}</Paragraph></Paragraph>
                 <Paragraph style={{fontWeight: 'bold'}}>Description<Paragraph style={{color: '#34495e'}}> : {u.Description}</Paragraph></Paragraph>
                 <Paragraph style={{fontWeight: 'bold'}}>Mobile Number<Paragraph style={{color: '#34495e'}}> : {u.Mobile}</Paragraph></Paragraph>
             </Card.Content>
             <Divider/>
                 <Card.Actions >
                 <Button color={'#008000'} onPress={() => {this.accept1(u.referenceKey)}}>Completed</Button>  
                 </Card.Actions>
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
export default Complictionstatus;

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