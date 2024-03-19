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

class Validation extends Component{


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
      compl:[],
      WorkD:['Work Done'],
      WorkN:['Work Not Done'],
      Loading:true
    }
  }


  begin(){
    this.state.Loading=true
    if(userRole!='Occupant' && userRole!='JuniorEngineer'){

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
          if(userRole=='Admin'){
            global.Rol='0'
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
      if(userRole=='SeniorDivisionalEngineer' || userRole=='Admin'){
        axios.post(Ip+'/user/waiting',dis)
        .then(response =>{
          this.state.Loading=false
          this.setState({posts:response.data})
        })
        .catch(error =>
        {
            console.log(error)
        })
  
        this.render()
      }
      else{

        axios.post(Ip+'/user/waiting',dis)
      .then(response =>{
        this.state.Loading=false
      //   axios.post(Ip+`/admin/getList/`,dis)
      // .then(res=>{
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
      }
      if(userRole=='Occupant'){
        this.state.Loading=true
        axios.get(Ip+`/user/userComplaints/${userPFNumber}`)
        .then(response =>{
          this.state.Loading=false
          respon=response.data.filter(complaint=>complaint.status=='10')
          console.log(respon)
          this.setState({compl:respon})
          
          })
          .catch(error =>
          {
              console.log(error)
          })
        
  
      }
      if(userRole=='JuniorEngineer'){
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
          if(userRole=='Admin'){
            global.Rol='0'
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
        //console.log(dis)
        // this.state.posts=response.data
        this.setState({posts:response.data})
        this.state.Loading=false
        })
        .catch(error =>
        {
            console.log(error)
        })
  
        this.render()
  
      }
    }

  componentDidMount(){
    this.readData()
  }

  refresh1(){
    this.state.Loading=true
    axios.get(Ip+`/user/userComplaints/${userPFNumber}`)
    .then(response =>{
        respon=response.data.filter(complaint=>complaint.status=='10')
        console.log(respon)
        this.setState({compl:respon})
        this.state.Loading=false
        this.render()
        })
        .catch(error =>
        {
            console.log(error)
        })  
  }

  accept1(referenceKey){
    axios.post(Ip+`/admin/verifyComplaints/${referenceKey}`,dis)
    .then(response =>{
      const message = {
        to: response.data.Token,
        sound: 'default',
        title: 'Grievance',
        body: 'Your Registration Has Been Verified !!!',
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
      console.log('done')
      this.componentDidMount()
      Alert.alert(' Completed!', 'Work Has Completed', [
        {text: 'Okay'}
    ]);
      this.refresh()
  })
  .catch(error =>
      {
          console.log(error)
      })

      this.render()

  }

  
  accept(PFNumber){
    console.log(PFNumber)
    

    axios.get(Ip+`/user/validate/${PFNumber}`)
    .then(response =>{
      console.log(response)
      const message = {
        to: response.data.Token,
        sound: 'default',
        title: 'Grievance',
        body: 'Your Registration has been Verified !!!',
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
      this.componentDidMount()
      Alert.alert('Accepted!', 'User Approved', [
        {text: 'Okay'}
    ]);
  })
  .catch(error =>
      {
          console.log(error)
      })

  }

  reject(PFNumber){
    console.log(PFNumber)
    axios.get(Ip+`/user/reject/${PFNumber}`)
    .then(response =>{
      console.log(response)
      const message = {
        to: response.data.Token,
        sound: 'default',
        title: 'Grievance',
        body: 'Your Registration has been Rejected !!!',
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
      this.componentDidMount()
      Alert.alert('Rejected!', 'User Rejected', [
        {text: 'Okay'}
    ]);
  })
  .catch(error =>
      {
          console.log(error)
      })

  }
  refresh2(){
    this.state.Loading=true
    axios.post(Ip+'/admin/showComplaints',dis)
    .then(response =>{
      //console.log(dis)
      // this.state.posts=response.data
      console.log(response.data)
      this.setState({posts:response.data})
      this.state.Loading=false
      this.render()
      })
      .catch(error =>
          {
              console.log(error)
          })
      
  }

  refresh(){
    this.state.Loading=true
    if(userRole=='SeniorDivisionalEngineer' || userRole=='Admin'){
      axios.post(Ip+'/user/waiting',dis)
      .then(response =>{
        this.state.Loading=false
        this.setState({posts:response.data})
      })
      .catch(error =>
      {
          console.log(error)
      })

      this.render()
    }
    else{

      axios.post(Ip+'/user/waiting',dis)
    .then(response =>{
      this.state.Loading=false
    //   axios.post(Ip+`/admin/getList/`,dis)
    // .then(res=>{
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
  }

  WorkDone(referenceKey){
      global.lst={
          Remarks:["Work Done"]
      }
    console.log(this.state.WorkD)
    axios.post(Ip+`/user/grievance/add-remark/${referenceKey}`,lst)
    .then(response =>{
      console.log(response)
      // this.state.posts=response.data
      this.componentDidMount()
      alert('Done')
      this.render()
      
  })
  .catch(error =>
      {
          console.log(error)
      })   
    
  }
  WorkNotDone(referenceKey){
    global.lst={
      Remarks:["Work Not Done"]
  }
console.log(this.state.WorkD)
axios.post(Ip+`/user/grievance/add-remark/${referenceKey}`,lst)
.then(response =>{
  console.log(response)
  // this.state.posts=response.data
  this.componentDidMount()
  alert('Done')
  this.render()
  
})
.catch(error =>
  {
      console.log(error)
  })   
  }

  
  


  render(){
    if(userRole!='Occupant' && userRole!='JuniorEngineer'){
      if(this.state.posts==0){
        return(
          <View>
          <Button color={'#000000'} onPress={() => this.refresh()}>Refresh</Button>
           <Text style={styles.text_header}>New Registration Approval</Text>
          <Card style={styles.card}>
       <Card.Content>
           <Title style={{fontWeight:'bold',textAlign:'center'}}>No New Registration Approval</Title>
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
         <Text style={styles.text_header}>New Registration Approval</Text> 
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
                   <Paragraph style={{fontWeight: 'bold'}}>QtrNumber<Paragraph style={{color: '#34495e'}}> : {u.QtrNumber}</Paragraph></Paragraph>
                   <Paragraph style={{fontWeight: 'bold'}}>Role<Paragraph style={{color: '#34495e'}}> : {u.Role}</Paragraph></Paragraph>
                   <Paragraph style={{fontWeight: 'bold'}}>Colony<Paragraph style={{color: '#34495e'}}> : {u.Colony}</Paragraph></Paragraph>
                   <Paragraph style={{fontWeight: 'bold'}}>Station<Paragraph style={{color: '#34495e'}}> : {u.Station}</Paragraph></Paragraph>
                   <Paragraph style={{fontWeight: 'bold'}}>Mobile Number<Paragraph style={{color: '#34495e'}}> : {u.Mobile}</Paragraph></Paragraph>
               </Card.Content>
               <Divider/>
                   <Card.Actions >
                     <Button color={'#FF0000'} onPress={() => {this.reject(u.PFNumber)}}>Reject</Button>
                     <Button color={'#008000'} onPress={() => {this.accept(u.PFNumber)}}>Accept</Button>
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
  if(userRole=='JuniorEngineer'){

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
      <Button color={'#000000'} onPress={() => this.refresh2()}>Refresh</Button>
       <Text style={styles.text_header}>Pending Grievances</Text>
       { this.state.Loading==true && (
            <View style={[styles.container_load,styles.horizontal_load]}>
            <ActivityIndicator size ="large" color="#009387" />
            </View>
          )
          }
       <ScrollView>
        
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
  if(userRole=='Occupant'){
    if(this.state.compl==0){
      return(
        <View>
        <Button color={'#000000'} onPress={() => this.refresh1()}>Refresh</Button>
         <Text style={styles.text_header}>Completed Grievance</Text>
        <Card style={styles.card}>
     <Card.Content>
         <Title style={{fontWeight:'bold',textAlign:'center'}}>No Completed Grievance</Title>
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
      <Button color={'#000000'} onPress={() => this.refresh1()}>Refresh</Button>
       <Text style={styles.text_header}>Completed Grievance</Text>
       { this.state.Loading==true && (
            <View style={[styles.container_load,styles.horizontal_load]}>
            <ActivityIndicator size ="large" color="#009387" />
            </View>
          )
          }
       
          
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
               <Divider/>
               {/* { !u.Remarks[0] &&(
                   <Card.Actions >
                     <Button color={'#FF0000'} onPress={() => {this.WorkNotDone(u.referenceKey)}}>No</Button>
                     <Button color={'#008000'} onPress={() => {this.WorkDone(u.referenceKey)}}>Yes</Button>
                   </Card.Actions>)} */}
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
  
}
export default Validation;

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