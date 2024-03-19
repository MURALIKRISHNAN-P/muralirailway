import React,{useState , createRef, Component , useEffect, useRef } from 'react';
/*import SelectMultiple from 'react-native-select-multiple'
import CheckboxGroup from 'react-checkbox-group'
import { render } from "react-dom";*/
import AsyncStorage from '@react-native-community/async-storage';
import { Divider, RadioButton } from 'react-native-paper';
//import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import {
    MultiselectDropdown,
  } from 'sharingan-rn-modal-dropdown';           
import { 
    View, 
    Text, 
    Button, 
    TouchableOpacity, 
    Dimensions,
    TextInput,
    Alert,
    Platform,
    StyleSheet,
    ScrollView,
    StatusBar,
    Image,
    Modal,
    TouchableHighlight,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import { LinearGradient } from 'expo-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
/*import ReactDom from 'react-dom';
import { Col, Row, Grid } from "react-native-easy-grid";*/
import axios from 'axios';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
//import {decode as atob , encode as btoa} from 'base-64'

global.Images = [];
global.disabled = false;

Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: false,
      shouldSetBadge: false,
    }),
  }); 

const ComplaintForm = ({navigation}) => {
    const state = {
        image: null,
        uploading: false,
      };

      const [expoPushToken, setExpoPushToken] = useState('');
      const [notification, setNotification] = useState(false);
      const notificationListener = useRef();
      const responseListener = useRef();
  
    const [userRoom, setUserRoom]=useState('');
    const [userSubject, setUserSubject]=useState('');
    const [userComplaint, setUserComplaint]=useState('');
    // const [Department, setDepartment] = useState('Electrical');
    const [value, setValue] = React.useState('first');

    const [Complaints, setComplaints] = useState([ ])   
    const [image, setImage]=useState(null)
    const [uploading,setUploading]=useState(false)
    const [imgnam,setimgnam]=useState('')
    const [imgurl,setimgurl]=useState('')



    useEffect(() => {
        (async () => {
          if (Platform.OS !== 'web') {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
              alert('Sorry, we need camera roll permissions to make this work!');
            }
          }
        })();
      }, []);
      
      const pickFromCamera = async () => {
        const {granted} = await Permissions.askAsync(Permissions.CAMERA)
        if(granted){
            global.dataimg= await ImagePicker.launchCameraAsync(
                {
                    mediaTypes : ImagePicker.MediaTypeOptions.Images,
                    allowsEditing : true,
                    aspect : [1,1],
                    quality : 1,
                    allowsMultipleSelection:true,
                }
            )
        let nam=dataimg.uri.split('/').pop();
        let uriArra = dataimg.uri.split(".");
        let fileTyp = uriArra[uriArra.length - 1];

        let newfile ={ uri:dataimg.uri,type: `image/${fileTyp}`,name:nam}

        
        await handleUpload(newfile,dataimg)
        }else{
            Alert.alert("SORRY")
        }
    }

      const pickImageMedia = async () => {
        global.pickerResult = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
        
        let nam=pickerResult.uri.split('/').pop();
        let uriArra = pickerResult.uri.split(".");
        let fileTyp = uriArra[uriArra.length - 1];

        let newfile ={ uri:pickerResult.uri,type: `image/${fileTyp}`,name:nam}

        
        await handleUpload(newfile,pickerResult)
        
        
    }
    const handleImagePicked = async (pickerResult) => {
        
    
        try {
        //   this.setState({ uploading: true });
        setUploading(true)
    
          if (!pickerResult.cancelled) {
            let uploadResponse, uploadResult;
           
            
            uploadResponse = await uploadImageAsync(pickerResult.uri);
            uploadResult = await uploadResponse.json();
            //this.setState({ image: uploadResult.location });
            console.log(uploadResult)
            global.filledApplication=uploadResult
            setImage(uploadResponse.location)

          }
        } catch (e) {
          console.log({ uploadResponse });
          console.log({ uploadResult });
          console.log({ e });
          alert("Upload failed, sorry :(");
        } finally {
        //   this.setState({ uploading: false });
        setUploading(false)
        }
      };

      function handleUpload(image,pickerResult){
        
        const data = new FormData();
        data.append('file',image);
        data.append('upload_preset','RailwayQuartersGrievance');
        data.append("cloud_name","dd6tnivac")
        fetch("https://api.cloudinary.com/v1_1/dd6tnivac/image/upload",{
              method:"post",
              body:data,
          }).then(res=>res.json())
          .then(data=>{
              console.log(data.public_id,data.url)
              setimgnam(data.public_id)
              setimgurl(data.url)
              handleImagePicked(pickerResult);
          })

        console.log("Hi")

          
      }

      async function uploadImageAsync(uri) {
        
          

          
        let apiUrl = `http://192.168.43.163:3000/user/complaint-file-upload/${userPFNumber}`;
        // Note:
        // Uncomment this if you want to experiment with local server
        //
        // if (Constants.isDevice) {
        //   apiUrl = `https://your-ngrok-subdomain.ngrok.io/upload`;
        // } else {
        //   apiUrl = `http://localhost:3000/upload`
        // }
        let name=uri.split('/').pop();
        let uriArray = uri.split(".");
        let fileType = uriArray[uriArray.length - 1];
      
        let formData = new FormData();
        formData.append('photo', {
          uri,
          name: name,
          type: `image/${fileType}`,
        });
      
        let options = {
            method: "POST",
            body: formData,
            headers: {
              Accept: "application/json",
              "Content-Type": "multipart/form-data",
            },
            imgnam:imgnam,
            imgurl:imgurl,
          };
          console.log(options)
          return fetch(apiUrl,options)
    }
        
        
    

    
  
  
  const Option = [
    {
      value: 'WaterLeakage ',
      label: 'Water Leakage',
    },
    {
      value: 'Sewage Disposal ',
      label: 'Sewage Disposal',
    },
    {
      value: 'Carpentry ',
      label: 'Carpentry',
    },
    // {
    //   value: 'EnvironmentalCleaning ',
    //   label: 'Environmental Cleaning',
    // },
    {
        value: 'Painting ',
        label: 'Painting',
    },
    {
        value: 'DrainageProblem ',
        label: 'Drainage Problem',
    },
    {
        value: 'Others ',
        label: 'Others',
    },
        
  ];

  const Options = [
    {
       value: 'ElectricalWiring ',
       label: 'Electrical Wiring',
    },
    {
        value: 'FanProblems ',
        label: 'Fan Problems',
     } ,
     {
        value: 'LightProblem ',
        label: 'Light Problem',
     } ,
     {
        value: 'SwitchProblem ',
        label: 'Switch Problem',
     },
     {
        value: 'Others ',
        label: 'Others',
    } 
  ];
  async() => {
    // setIsLoading(false);
    let userToken;
    userToken = null;
    try {
      userName = await AsyncStorage.getItem('Name');
      userPFNumber = await AsyncStorage.getItem('PFNumber');
      userMobile = await AsyncStorage.getItem('Mobile');
      userRole = await AsyncStorage.getItem('Role');
      userStation = await AsyncStorage.getItem('Station');
      userQtrNumber = await AsyncStorage.getItem('QtrNumber');
      userColony = await AsyncStorage.getItem('Colony');
      userToken = await AsyncStorage.getItem('Dek');
    } catch(e) {
      console.log(e);
    }
}

    const Submit = (Images) =>{
    global.disabled = false;  
    if(!userRoom || !Complaints || !userComplaint || !value){
        Alert.alert('Wrong Input!', 'Please Check all the field properly', [
                        {text: 'Okay'}
                    ]);
    }
    else{
    if(userRole=='Occupant' ||userRole=='JuniorEngineer'){
    const doc={filledApplication}
    const Comm={
        PFNumber:userPFNumber,
        Name:userName,
        Mobile:userMobile,
        Station:userStation,
        ComplaintCategory:Complaints,
        Role:userRole,
        Description:userComplaint.trim(),
        Department:value,
        QtrNumber:userRoom.trim(),
        Colony:userColony,
        documents:doc,
        imgUrl:imgurl,
        imgArray:Images,
        imgNam:imgnam,
        Token:userTok
    }
    console.log(Comm)

    
    axios.post('http://192.168.43.163:3000/user/new-Complaints',Comm)
            .then(response =>{ 
                const message = {
                    to: response.data.Token,
                    sound: 'default',
                    title: 'Grievance',
                    body: 'New Grievance Received !!!',
                    data: { data: 'goes here' },
                  };
              
                  fetch('https://exp.host/--/api/v2/push/send', {
                    method: 'POST',
                    headers: {
                      Accept: 'application/json',
                      'Accept-encoding': 'gzip, deflate',
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(message),
                  });
                Alert.alert('Grievance!', 'Grievance Successfully Submitted', [
                    {text: 'Okay'}
                ]);  
                setUserRoom('')
                setUserComplaint('')
                setValue('first')
                setComplaints([ ])
                setData({
                    check_textInputRoomChange: false
                });
                setData({
                    check_textInputComplaint: false
                });

                navigation.navigate("Home") 
            })
            .catch(error =>
                {
                    console.log(error)
                })
        
    }
    else{
    var lastItem = userStation.split("/").pop();
    const doc={filledApplication}
    const Comm={
        PFNumber:userPFNumber,
        Name:userName,
        Mobile:userMobile,
        Station:lastItem,
        ComplaintCategory:Complaints,
        Role:userRole,
        Description:userComplaint.trim(),
        Department:value,
        QtrNumber:userRoom.trim(),
        Colony:userColony,
        documents:doc,
        imgUrl:imgurl,
        imgNam:imgnam,
        imgArray:Images,
        Token:userTok
    }
       
    console.log(Comm)
    axios.post('http://192.168.43.163:3000/user/new-Complaints',Comm)
            .then(response =>{ 
                const message = {
                    to: response.data.Token,
                    sound: 'default',
                    title: 'Grievance',
                    body: 'New Grievance Received !!!',
                    data: { data: 'goes here' },
                  };
              
                  fetch('https://exp.host/--/api/v2/push/send', {
                    method: 'POST',
                    headers: {
                      Accept: 'application/json',
                      'Accept-encoding': 'gzip, deflate',
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(message),
                  });
                Alert.alert('Grievance!', 'Grievance Successfully Submitted', [
                    {text: 'Okay'}
                ]);  
                setUserRoom('')
                setUserComplaint('')
                setValue('first')
                setComplaints([ ])
                setData({
                    check_textInputRoomChange: false
                });
                setData({
                    check_textInputComplaint: false
                });
                navigation.navigate("Home") 
            })
            .catch(error =>
                {
                    console.log(error)
                })
    }
    

    }
}

    const [data, setData] = React.useState({
        check_textInputChange: false,
        secureTextEntry: true,
        confirm_secureTextEntry: false,
        check_textInputRoomChange: false,
        check_textInputComplaint: false,
        check_textInputComplaintChange: false,
        
        userRoom: '',
        value: '',
        userComplaint: '',
        Complaints: [],
    });

    const textInputRoomChange = (userRoom) => {
        setUserRoom(userRoom)
        if( userRoom.length !== 0 ) {
            setData({
                ...data,
                check_textInputRoomChange: true
            });
        } else {
            setData({
                ...data,
                check_textInputRoomChange: false
            });
        }
    }

    const textInputComplaint = (Complaints) => {
        setComplaints(Complaints)
        console.log(Complaints)
        if(Complaints.length !== 0 ) {
            setData({
                ...data,
                check_textInputComplaint: true
            });
        } else {
            setData({
                ...data,
                check_textInputComplaint: false
            });
        }
    }


    const textInputSubjectChange = (userSubject) => {
        setUserSubject(userSubject)
        if( userSubject.length !== 0 ) {
            setData({
                ...data,
                check_textInputSubjectChange: true
            });
        } else {
            setData({
                ...data,
                check_textInputSubjectChange: false
            });
        }
    }

    const textInputComplaintChange = (userComplaint) => {
        setUserComplaint(userComplaint)
        if( userComplaint.length !== 0 ) {
            setData({
                ...data,
                check_textInputComplaintChange: true
            });
        } else {
            setData({
                ...data,
                check_textInputComplaintChange: false
            });
        }
    }

    if(Images.length==3){
        disabled=true
    }


    const [modalVisible, setModalVisible] = useState(false);
    return (

      <View style={styles.container}>
          <StatusBar backgroundColor='#009387' barStyle="light-content"/>
        <View style={styles.header}>
            <Text style={styles.text_header}>Grievance Form!</Text>
        </View>
        <Animatable.View 
            animation="fadeInUpBig"
            style={styles.footer}
        >
            <ScrollView>
            <Text style={styles.text_footer}>Qtr Number</Text>
            <View style={styles.action}>
                <FontAwesome 
                    name="home"
                    color="#05375a"
                    size={20}
                />
                <TextInput 
                    placeholder="Your Qtr Number"
                    value={userRoom}
                    style={styles.textInput}
                    autoCapitalize="none"
                    onChangeText={(userRoom) => textInputRoomChange(userRoom)}
                />
                {data.check_textInputRoomChange ? 
                <Animatable.View
                    animation="bounceIn"
                >
                    <Feather 
                        name="check-circle"
                        color="green"
                        size={20}
                    />
                </Animatable.View>
                : null}
            </View>

            <Text style={[styles.text_footer, {
                marginTop: 35
            }]}>Complaints</Text>
           <RadioButton.Group onValueChange={newValue => setValue(newValue)} value={value}>
      <View>
        
        <Text><RadioButton value="Electrical" />Electrical</Text>
      </View>
      <View>
        <Text><RadioButton value="Engineering" />Engineering</Text>
        
      </View>
    </RadioButton.Group>


    { value=='Electrical' ?
            
            <MultiselectDropdown
            label="Select Your Complaints"
            data={Options}
            enableSearch
            chipType="outlined"
            value={Complaints}
            onChange={textInputComplaint}
          />
            
       : 
            <MultiselectDropdown
            label="Select Your Complaints"
            data={Option}
            enableSearch
            chipType="outlined"
            value={Complaints}
            onChange={textInputComplaint}
          />
        }     
          
        
                {/* {data.check_textInputComplaint ? 
                <Animatable.View
                    animation="bounceIn"
                >
                    <Feather 
                        name="check-circle"
                        color="green"
                        size={20}
                    />
                </Animatable.View>
                : null} */}

            {/* <Text style={[styles.text_footer, {
                marginTop: 35
            }]}>Subject</Text>
            <View style={styles.action}>
                <FontAwesome 
                    name="pencil"
                    color="#05375a"
                    size={20}
                />
                <TextInput 
                    placeholder="Your Subject"
                    style={styles.textInput}
                    autoCapitalize="none"
                    onChangeText={(userSubject) => textInputSubjectChange(userSubject)}
                />
                {data.check_textInputSubjectChange ? 
                <Animatable.View
                    animation="bounceIn"
                >
                    <Feather 
                        name="check-circle"
                        color="green"
                        size={20}
                    />
                </Animatable.View>
                : null}
            </View> */}
            <Text style={[styles.text_footer, {
                marginTop: 35
            }]}>Complaint</Text>
            <View style={styles.actionComplaint}>
                <FontAwesome 
                    name="edit"
                    color="#05375a"
                    size={20}
                />
                <TextInput 
                    placeholder="Your Complaint"
                    multiline
                    value={userComplaint}
                    numberOfLines={4}
                    style={styles.textInputComplaint}
                    autoCapitalize="none"
                    onChangeText={(userComplaint) => textInputComplaintChange(userComplaint)}
                />
                {data.check_textInputComplaintChange ? 
                <Animatable.View
                    animation="bounceIn"
                >
                    <Feather 
                        name="check-circle"
                        color="green"
                        size={20}
                    />
                </Animatable.View>
                : null}
            </View>

                     
            <View style={styles.textPrivate}>
                <Text style={styles.color_textPrivate}>
                    {/* Please Regiter */}
                </Text>
                {/* <Text style={[styles.color_textPrivate, {fontWeight: 'bold'}]}>{" "} The Complaint </Text> */}
                {/* <Text style={styles.color_textPrivate}>{" "}and</Text> */}
                {/* <Text style={[styles.color_textPrivate, {fontWeight: 'bold'}]}>{" "}Correctly</Text> */}
            </View>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                setModalVisible(false);
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
                  }}>

                
                <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <Text style={styles.modalText}>UPLOAD PHOTOS</Text>
                    <Divider/>

                    <View style={{...styles.button,flexDirection:"row"}}>
                        <TouchableHighlight
                        style={{ ...styles.openButton, backgroundColor: "#006400" }}
                        onPress={() => {
                        setModalVisible(false);
                        pickFromCamera();
                        Images.push(imgurl);

                        }}
                    >
                        <LinearGradient
                    colors={['#08d4c4', '#01ab9d']}
                    style={styles.signIn}
                >
                    <Text style={[styles.textSign, {
                        color:'#fff'
                    }]}>  Take A Photo  </Text>
                </LinearGradient>
                        {/* <Text style={styles.textStyle}>Take A Photo</Text> */}
                    </TouchableHighlight><Text>{'\t'}{'\t'}{'\t'}{'\t'}</Text>
                    <TouchableHighlight
                        style={{ ...styles.openButton}}
                        onPress={() => {
                        setModalVisible(false);
                        pickImageMedia();
                        Images.push(imgurl);
                        }}
                    >
                         <LinearGradient
                    colors={['#08d4c4', '#01ab9d']}
                    style={styles.signIn}
                >
                    <Text style={[styles.textSign, {
                        color:'#fff'
                    }]}>Choose  From Gallery  </Text>
                </LinearGradient>
                        {/* <Text style={styles.textStyle}>From Gallery</Text> */}
                    </TouchableHighlight>   
                        </View><Text>{'\n'}</Text>
                        <TouchableHighlight
                    style={{ ...styles.openButton, backgroundColor: "#006400" }}
                    onPress={() => {
                        setModalVisible(!modalVisible);
                    }}
                    >
                    <LinearGradient
                    colors={['#08d4c4', '#01ab9d']}
                    style={styles.signIn}
                >
                    <Text style={[styles.textSign, {
                        color:'#fff'
                    }]}>  Cancel </Text>
                </LinearGradient>
                    </TouchableHighlight>
                </View>
                </View>
                </View>
            </Modal>
            <View style={styles.button_BUTTON}>
                <TouchableOpacity
                    style={styles.signIn}
                    onPress={()=>setModalVisible(true)}
                    disabled={disabled}
                    //onPress={pickImageMedia}
                >
                <LinearGradient
                    colors={['#08d4c4', '#01ab9d']}
                    style={styles.signIn}
                >
                    <Text style={[styles.textSign, {
                        color:'#fff'
                    }]}>Upload File({3-Images.length})</Text>
                </LinearGradient>
                </TouchableOpacity>
                <Text>{Images}</Text>
            </View>
                    

            <View style={styles.button}>
                <TouchableOpacity
                    style={styles.signIn}
                    onPress={()=>
                        {
                            Submit(Images);
                            Images.splice(0,Images.length);
                            imgArray=Images
                        }
                    }
                >
                <LinearGradient
                    colors={['#08d4c4', '#01ab9d']}
                    style={styles.signIn}
                >
                    <Text style={[styles.textSign, {
                        color:'#fff'
                    }]}>Submit</Text>
                </LinearGradient>
                </TouchableOpacity>
                
                <TouchableOpacity
                    onPress={() => {
                        Images.splice(0,Images.length);                        
                        imgArray=Images
                        navigation.goBack();                        
                    }}
                    style={[styles.signIn, {
                        borderColor: '#009387',
                        borderWidth: 1,
                        marginTop: 15
                    }]}
                >
                    <Text style={[styles.textSign, {
                        color: '#009387'
                    }]}>Cancel</Text>
                </TouchableOpacity>
            </View>
            </ScrollView>
        </Animatable.View>
      </View>
    );
};




export default ComplaintForm;

const styles = StyleSheet.create({
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
      centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
      },
      modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
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
        borderRadius: 10,
        elevation: 2
      },
      textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
      },
      modalText: {
        color: '#34495e',
    fontWeight: 'bold',
    fontSize: 20,
    textAlign:'center'
      },
      ok : {
        width : '50%',
        marginHorizontal : '5%'
     },
     decline : {
        width : "50%",
        marginHorizontal : '10%'
     },
     button : {
        flexDirection : 'row',
        width : '80%'
        
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
    }
  });