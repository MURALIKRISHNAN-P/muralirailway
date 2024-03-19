import React , {Component} from 'react';
import axios from 'axios';
import { Avatar, Button, Card, Title, Paragraph, Divider } from 'react-native-paper';
import AsyncStorage from '@react-native-community/async-storage';
//imort DialogInput from 'react-native-dialog-input';
import {FontAwesome,AntDesign} from 'react-native-vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { ImageViewer } from 'react-native-image-zoom-viewer';
//import {imf} from '../assets/dealer2.jpg'
//import { base64StringToBlob } from 'blob-util';
import Ip from './Ip';
import { 
  View, 
  Text, 
  ScrollView ,
  TouchableOpacity, 
  TouchableHighlight,
  TextInput,
  Image,
  Platform,
  StyleSheet ,
  StatusBar,
  Modal,
  ActivityIndicator,
  ImageBackground,
  Alert,
  Dimensions
} from 'react-native';
import Profile from './ProfileScreen'
//import Icon from '@ant-design/icons';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
global.hi=windowHeight/2
global.wi=windowWidth/2


// const images = [{
//   url: 'https://avatars2.githubusercontent.com/u/7970947?v=3&s=460',
//   props: {}
//   },{
//   url: 'https://th.bing.com/th/id/OIP.6AdpKYgmk1g0xXug2M_A1QHaEK?w=275&h=180&c=7&o=5&dpr=1.25&pid=1.7',
//   props: { }
//   },{
//   url: 'https://pilbox.themuse.com/image.png?url=https:%2F%2Fassets.themuse.com%2Fuploaded%2Fattachments%2F18610.png%3Fv%3Dd68d7066702c9108235059162f9d1be69919cc9348c3acfb10f169a07639b035&w=780',
//   props: { }
//   },{
//   url: 'https://nation.com.pk/digital_images/large/2017-10-01/is-america-really-free-1506882564-8943.jpg',
//   props: { }
//   },


// ]

class ComplaintCard extends Component{
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
        global.userToken = await AsyncStorage.getItem('Token');
      } catch(e) {
        console.log(e);
      }
      if(userRole!=='Occupant'){
      this.begin()
      }

  }

  showDialog(isShow){
    this.setState({isDialogVisible: isShow});
  }
  sendInput(inputText){
    console.log("sendInput (DialogInput#1): "+inputText);
  }

  constructor(props){
    super(props)

    this.state={
      posts:[],
      isDialogVisible: false,
      imageUrl:'',
      iconmodalVisible:false,
      modals: false,
      modalVisible: false,
      newtext : '',
      imgUrl:'',
      count : 0,
      Loading:true,
      imgArray:[{}]
    }
  }

  seticonModalVisible = (visible) => {
    this.setState({ iconmodalVisible: visible });
  }
  Reasontext = (text) => {
    this.setState({ newtext : text })  
 }
 setModalVisible = (visible,refkey) => {
  this.setState({ modalVisible: visible });
  global.ref= refkey;
}

  begin(){
    this.state.Loading=true
    console.log('CARD:',userDepart)

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


  if(userRole=='SeniorDivisionalEngineer' || userRole=='Admin' ){
    this.state.Loading=true
    axios.post(Ip+'/admin/showComplaints',dis)
    .then(response =>{
      console.log(response)
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
    this.state.Loading=true
  axios.post(Ip+'/admin/showComplaints',dis)
  .then(response =>{
    this.state.Loading=false
    // axios.post(Ip+`/admin/getList/`,dis)
    // .then(res=>{
    //   this.state.Loading=false
    //   let slist=res.data;
    //   let result=dis.Role==1?response.data:response.data.filter(r=>slist.includes(r.Station))
    //   let resul = result.filter(complaint=>complaint.status!='04')
    //   this.setState({posts:resul})
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
  componentDidMount(){
    this.readData()
  }
  preview(pat,image,imgArr){

    console.log(imgArr)

    const images = [{
      url: imgArr[0],
      props: {}
      },{
      url: imgArr[1],
      props: {}
      },{
      url: imgArr[2],
      props: {}
      }
    ]
    this.setState({imgArray:images})

    this.setState({imgUrl:image})

    console.log("Hi")
    console.log(pat)
    console.log("jhgjhg",image)
    const d={
      path:pat
    }
    this.seticonModalVisible(true)
    // axios.post(Ip+'/user/download/',d,{responseType:'blob'})
    // .then(res => {
    //   var file = new File(res.data, { type: 'image/jpg' });
    
    //   var ImageURL = URL.createObjectURL(file);
    //   this.setState({ imageURL:ImageURL });
      
      
    // })
    // .catch(error=>{
    //   console.log(error)
    // })
    // axios.post(Ip+'/user/download/',d)
    // .then(res =>{
    //   // console.log('iN DSF')
    //   // console.log(JSON.stringify(response.data))
    //   var file = new File(res.data, { type: 'image/jpg' });
    //   var imageURL = URL.createObjectURL(file);
    //   this.setState({ imageURL });
    // })
    // .catch(error =>
    //   {
    //       console.log(error)
    //   })    
//const contentType = 'image/png';
// const b64Data = 'iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==';

// const blob = base64StringToBlob(b64Data, contentType);
// console.log(blob)
// unsafeImageUrl=URL.createObjectURL(b64Data);
// console.log(unsafeImageUrl)

    // console.log("hgsfhgs",pat)
    // const d={
    //   path:pat
    // }
    // var Blob = require('Blob')
    // var b = new Blob(['../assets/dealer2.jpg'])
    // console.log("b1")
    // axios.post(Ip+'/user/download/',d)
    // .then(response =>{
    //   console.log("asgjhgd",response.data)
    //   unsafeImageUrl=URL.createObjectURL("  ");
    //   console.log(unsafeImageUrl)
    //   this.setState({imageUrl:unsafeImageUrl})
    //   var reader = new FileReader();
    //   reader.readAsDataURL(response.data)
    //   console.log(reader)
    //   reader.onloadend=function(){
    //     var base64data = reader.result;
    //     console.log(base64data)
    //   }
    //   global.images={
    //     url:base64data
    //   }
    //   // this.seticonModalVisible(true)
    // })
   
  }
  accept(referenceKey){
    axios.post(Ip+`/admin/verifyComplaints/${referenceKey}`,dis)
    .then(response =>{
      console.log(response)
      const message = {
        to: response.data.Token,
        sound: 'default',
        title: 'Grievance',
        body: 'Your Grievance Has Been Accepted !!!',
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
      Alert.alert('Grievance!', 'Grievance Accepted', [
        {text: 'Okay'}
    ]);
  })
  .catch(error =>
      {
          console.log(error)
      })

      this.render()

  }
  refresh(){
    
    if(userRole=='SeniorDivisionalEngineer' || userRole=='Admin'){
      this.state.Loading=true
      axios.post(Ip+'/admin/showComplaints',dis)
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
      this.state.Loading=true
    axios.post(Ip+'/admin/showComplaints',dis)
    .then(response =>{
      this.state.Loading=false
      axios.post(Ip+`/admin/getList/`,dis)
      .then(res=>{
        this.state.Loading=false
        let slist=res.data;
        // console.log("add",slist,slist.includes(res.Station))
        let result=dis.Role==1?response.data:response.data.filter(r=>slist.includes(r.Station))
        let resul = result.filter(complaint=>complaint.status!='04')
        this.setState({posts:resul})
        })
      })
      .catch(error =>
      {
          console.log(error)
      })

      this.render()
    }
    

  }

  forward(referenceKey){
    axios.post(Ip+`/admin/forwardComplaints/${referenceKey}`,dis)
    .then(response =>{
      console.log(response)
      const message = {
        to: response.data.Token,
        sound: 'default',
        title: 'Grievance',
        body: 'Your Grievance Has Been Forwarded !!!',
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
      Alert.alert('Grievance!', 'Grievance Forward ed', [
        {text: 'Okay'}
    ]); 
    this.componentDidMount()
  })
  .catch(error =>
      {
          console.log(error)
      })

  }

  
  reject(referenceKey){
    axios.post(Ip+`/admin/rejectComplaint/${referenceKey}`,dis)
    .then(response =>{
      const message = {
        to: response.data.Token,
        sound: 'default',
        title: 'Grievance',
        body: 'Your Grievance Has Been Rejected !!!',
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
      if(!this.state.newtext){
      global.lst={
        Remarks:["Please Check Your Grievance Properly and Submit Again"]
    }
  }
  else{
    global.lst={
      Remarks:[this.state.newtext]
  }

  }
      axios.post(Ip+`/user/grievance/add-remark/${referenceKey}`,lst)
      // console.log(response)
      // this.state.posts=response.data
      Alert.alert('Grievance!', 'Grievance Rejected', [
        {text: 'Okay'}
    ]);
    this.componentDidMount()
  })
  .catch(error =>
    {
        console.log(error)
    })
  }

  render(){
    const { modalVisible } = this.state;
    const {iconmodalVisible}=this.state;
    
    if(userRole!='Occupant' && userRole!='JuniorEngineer'){
      if(this.state.posts==0){
        return(
          <View>
          <Button color={'#000000'} onPress={() => this.refresh()}>Refresh</Button>
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
        <Modal
            animationType="slide"
            transparent={true}
            visible={iconmodalVisible}
            
            onRequestClose={() => {
              // Alert.alert("Modal has been closed.");
              this.seticonModalVisible(false);

            }}

            >
              {/* <View style={{paddingBottom:150}}> */}
            <View style={styles.centeredView1}>
            <ImageViewer imageUrls={this.state.imgArray} backgroundColor = 'rgba(100,100,100, 0.5)' enablePreload = 'true'    />
            {/* renderFooter = {(currentImage) => (<View style={{justifyContent:'center',paddingLeft:170 ,paddingBottom : 70}}><Text>{currentImage+1}/{this.state.imgArray.length}</Text></View>) } */}
            {/* <ImageViewer imageUrls={this.state.imgUrl} backgroundColor = 'white' enablePreload = 'true' renderFooter = {(currentImage) => (<View style={{justifyContent:'center',paddingLeft:170 ,paddingBottom : 70}}><Text>{currentImage+1}/{images.length}</Text></View>) }   /> */}
            <View style={{alignItems:'center',paddingBottom:30,backgroundColor:'rgba(100,100,100, 0.5)'}}>
            <TouchableHighlight
                style={{ ...styles.openButton, backgroundColor: "#006400" }}
                onPress={() => {
                  this.seticonModalVisible(false);
                }}
            >
              <LinearGradient
                    colors={['#08d4c4', '#01ab9d']}
                    style={styles.signIn}
                >
                    <Text style={[styles.textSign, {
                        color:'#fff',
                        padding:10
                    }]}>Close</Text>
                </LinearGradient>
            </TouchableHighlight>
            {/* <Button
              title="Close"
              color="red"
              onPress={() => {
                this.seticonModalVisible(false);
              }}
            /> */}
            </View>
            </View>
            </Modal>
        <Button color={'#000000'} onPress={() => this.refresh()}>Refresh</Button>
         <Text style={styles.text_header}>Pending Grievances</Text>
         <View style={styles.centeredView}>
                   <Modal
                      animationType="fade"
                      transparent={true}
                      visible={modalVisible}
                      onRequestClose={() => {
                        this.setModalVisible(!modalVisible);  
                      }}
                    >
                      <View
                        style={{
                          position: 'absolute',
                          width: '100%',
                          height: '100%',
                          justifyContent: 'center',
                          backgroundColor: 'rgba(100,100,100, 0.5)',
                          padding: 20,
                        }}
                      >
          <View style={styles.centeredView}>
            
            <View>
            <View>
            <Card style={styles.card_rej}>
               <Card.Content>
               <Title style={styles.title}>Confirmation:</Title>
                   <Divider/>
                   <TextInput 
                style={styles.modalText} 
                placeholder='Enter Your Reason for Rejection (Optional)' 
                placeholderTextColor = '#787878'
                onChangeText = {this.Reasontext}
                multiline = {true}
                />
                   
               </Card.Content>
               <Divider/>
                   <Card.Actions >
                     { userRole!='DivisionalEngineer' &&(
                     <Button color={'#000080'} onPress={() => { this.setModalVisible(!modalVisible)}}>Cancel</Button>)}
                     <Button color={'#FF0000'} onPress={() => { this.reject(ref);this.setModalVisible(!modalVisible);}}>Reject</Button>
                   </Card.Actions>
                 </Card>
            
            </View>
          </View>
            </View>
          </View>
          </Modal>
          
        { this.state.Loading==true && (
            <View style={[styles.container_load,styles.horizontal_load]}>
            <ActivityIndicator size ="large" color="#009387" />
            </View>
          )
          }
        </View>
          {
             this.state.posts.map((u,i) => {
               return(
                 <View key={i}>
            <Card style={styles.card}>
                <Card.Title style={styles.title}
                  title={u.Name}
                  right={()=><TouchableOpacity onPress = {()=>{ this.preview(u.documents.filledApplication.path,u.imgUrl,u.imgArray)}}><AntDesign name = 'eye' size ={28} color='#34495e'/></TouchableOpacity>}
                />
                <Card.Content>
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
                     {u.Role!="SeniorDivisionalEngineer" && ( <Button color={'#000080'} onPress={() => {this.forward(u.referenceKey)}}>Forward</Button>)}
                     <Button color={'#FF0000'} onPress={() => { this.setModalVisible(true,u.referenceKey)}}>Reject</Button>
                     <Button color={'#008000'} onPress={() => this.accept(u.referenceKey)}>Accept</Button>
                     
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
  else{
    return(
      <Profile/>
    );
  }
}
  
}
export default ComplaintCard;

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
    marginRight:20
  },
  text_header: {
    color: '#34495e',
    fontWeight: 'bold',
    fontSize: 20,
    textAlign:'center'
  },
  text_header_modal: {
    color: '#34495e',
    fontWeight: 'bold',
    fontSize: 20,
    textAlign:'left'
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
  card_rej: {
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
    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 22,
    },
    centeredView1: {
      flex: 1,
      // justifyContent: "center",
      // alignItems: "center",
      marginTop: 55,
      paddingBottom:50,
    },
    modalView: {
      margin: 20,
      backgroundColor: "white",
      borderRadius: 20,
      padding: 35,
      alignItems: "flex-start",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5
    },
    openButton: {
      backgroundColor: "#006400",
      borderRadius: 10,
      elevation: 2,
      marginTop:"5%"
    },
    textStyle: {
      fontWeight: "bold",
      textAlign: "center",
      fontSize:20,
      padding:"1%"
    },
    modalText: {
      paddingTop:10,
      marginBottom: -1,
      fontSize : 16,
      height: 60,
      borderBottomColor : '#000000',
      borderBottomWidth : 1,
      width : 300,
      textAlign : 'left'
      
    },
   
   button : {
      flexDirection : 'row',
      width : '800%'
      
   },
   textInput: {
      fontSize: 16,
      height: 40
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
  }, 
  stretch: {
    width: 350,
    height: 600,
    resizeMode: 'stretch',
  },

});