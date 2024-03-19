import React,{useState , createRef,useEffect} from 'react';
import axios from 'axios';
import Ip from './Ip';
import { 
    View, 
    Text, 
    Alert,
    Button, 
    TouchableOpacity, 
    Dimensions,
    TextInput,
    Platform,
    StyleSheet,
    ScrollView,
    StatusBar,
    ImageBackground
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import { LinearGradient } from 'expo-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import * as Notifications from 'expo-notifications'
import * as Permissions from 'expo-permissions';
import Constants from 'expo-constants';
import ReactDom from 'react-dom';
import {
    Dropdown,
  } from 'sharingan-rn-modal-dropdown';
//import Stat from './Items'
const SignUpScreen = ({navigation}) => {



const [userPFNumber, setUserPFNumber]=useState('');
const [userName, setUserName]=useState('');
const [userQtrNumber, setUserQtrNumber]=useState('');
const [userColony, setUserColony]=useState('');
const [userStation, setUserStation]=useState('');
const [userMobile, setUserMobile]=useState('');
const [userpassword, setUserpassword]=useState('');
const [userconfirmpassword, setUserconfirmpassword]=useState('');
const [errortext,setErrortext]=useState('');
const [userHint, setUserHint]=useState('');
const [expoPushToken,setexpoPushToken]=useState('');
const [notification,setnotification]=useState({});

const [userRole, setUserRole]=useState('');


  const [data, setData] = React.useState({
    PFNumber: '',
    Name: '',
    QtrNumber: '',
    Colony: '',
    Station:'',
    City: '',
    MobileNumber: '',
    password: '',
    confirm_password: '',

    check_textInputPFNumber: false,
    check_textInputName: false,
    check_textInputQtrNumber: false,
    check_textInputcolony: false,
    check_textInputStation: false,
    check_textInputCity: false,
    check_textInputMobileNumber: false,
    
    secureTextEntry: true,
    confirm_secureTextEntry: true,
});

// useEffect(() => {
//     return () => {
//     }
// }, [])

// const _handleNotification = notification => {
//     Vibration.vibrate();
//     this.setState({ notification: notification });
//     console.log(notification);
//   };


  const sendNotification = async () => {
    const message = {
      to: expoPushToken,
      sound: 'default',
      title: 'Original Title',
      body: 'And here is the body!',
      data: { data: 'goes here' },
    };

    // await fetch('https://exp.host/--/api/v2/push/send', {
    //   method: 'POST',
    //   headers: {
    //     Accept: 'application/json',
    //     'Accept-encoding': 'gzip, deflate',
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(message),
    // });
  };

function prin(){
    console.log(userPFNumber)
    console.log(userName)
    console.log(userQtrNumber)
    console.log(userColony)
    console.log(userRole)
    console.log(userStation)
    console.log(userMobile)
    console.log(userpassword)
    console.log(userconfirmpassword)
}

const Stat = [
    {
      value: 'TPT',
      label: 'Tirupattur - TPT',
      },
      {
      value: 'KEY',
      label: 'Kagankarai - KEY',
      },
      {
      value: 'SLY',
      label: 'Samalpatti - SLY',
      },
      {
      value: 'DST',
      label: 'Dasampatti - DST',
      },
      {
      value: 'DPI',
      label: 'Doddampatti - DPI',
      },
      {
      value: 'MAP',
      label: 'Morappur - MAP',
      },
      {
      value: 'TNGR',
      label: 'Thonganur - TNGR',
      },
      {
      value: 'BDY',
      label: 'Buddireddippatti - BDY',
      },
      {
      value: 'BQI',
      label: 'Bommidi - BQI',
      },
      {
      value: 'LCR',
      label: 'Lokur - LCR',
      },
      {
      value: 'DSPT',
      label: 'Danishpet - DSPT',
      },
      {
      value: 'TNT',
      label: 'Tinnappatti - TNT',
      },
      {
      value: 'KPPR',
      label: 'Karuppur - KPPR',
      },
      {
      value: 'OML',
      label: 'Omalur - OML',
      },
      {
      value: 'MCRD',
      label: 'Mecheri Road - MCRD',
      },
      {
      value: 'MTDM',
      label: 'Mettur Dam - MTDM',
      },
      {
      value: 'SA',
      label: 'Salem Jn - SA',
      },
      {
      value: 'VRPD',
      label: 'Virapandi Road - VRPD',
      },
      {
      value: 'DC',
      label: 'Magudanchavadi - DC',
      },
      {
      value: 'MVPM',
      label: 'Mavelipalayam - MVPM',
      },
      {
      value: 'SAMT',
      label: 'Salem Market - SAMT',
      },
      {
      value: 'SXT',
      label: 'SALEM TOWN - SXT',
      },
      {
      value: 'APN',
      label: 'Ayodhyapatamam - APN',
      },
      {
      value: 'MPLI',
      label: 'Minnampalli - MPLI',
      },
      {
      value: 'VGE',
      label: 'Valappadi Gate - VGE',
      },
      {
      value: 'ETP',
      label: 'Ettapur Road - ETP',
      },
      {
      value: 'PDKM',
      label: 'Peddanayakkan palaiyam - PDKM',
      },
      {
      value: 'ATU',
      label: 'Attur - ATU',
      },
      {
      value: 'TVS',
      label: 'Talaivasal Halt - TVS',
      },
      {
      value: 'MLYR',
      label: 'Melnariyaapanur Halt - MLYR',
      },
      {
      value: 'CHSM',
      label: 'Chinnasalem - CHSM',
      },
      {
      value: 'SRVT',
      label: 'Siruvattur Halt - SRVT',
      },
      {
      value: 'PRV',
      label: 'Pukiravari - PRV',
      },
      {
      value: 'KKTI',
      label: 'Kuttakudi Halt - KKTI',
      },
      {
      value: 'MKSP',
      label: 'MukhasaParur - MKSP',
      },
      {
      value: 'SGE',
      label: 'Sankaridurg - SGE',
      },
      {
      value: 'ANU',
      label: 'Anangur - ANU',
      },
      {
      value: 'CV',
      label: 'Cauvery - CV',
      },
      {
      value: 'ED',
      label: 'Erode Jn - ED',
      },
      {
      value: 'TPM',
      label: 'Totiyapalayam - TPM',
      },
      {
      value: 'PY',
      label: 'Perundurai - PY',
      },
      {
      value: 'IGR',
      label: 'Ingur - IGR',
      },
      {
      value: 'VZ',
      label: 'Vijyamanagalam - VZ',
      },
      {
      value: 'UKL',
      label: 'Uttukuli - UKL',
      },
      {
      value: 'CVD',
      label: 'Chavadipalayam - CVD',
      },
      {
      value: 'PAS',
      label: 'Pasur - PAS',
      },
      {
      value: 'URL',
      label: 'Unjalur - URL',
      },
      {
      value: 'KMD',
      label: 'Kodumudi - KMD',
      },
      {
      value: 'TUP',
      label: 'Tiruppur - TUP',
      },
      {
      value: 'VNJ',
      label: 'Vanjipalayam - VNJ',
      },
      {
      value: 'SNO',
      label: 'Somanur - SNO',
      },
      {
      value: 'SUU',
      label: 'Sulur Road - SUU',
      },
      {
      value: 'IGU',
      label: 'Irugur - IGU',
      },
      {
      value: 'SHI',
      label: 'Singanallur Halt - SHI',
      },
      {
      value: 'PLMD',
      label: 'Pilamedu - PLMD',
      },
      {
      value: 'CBF',
      label: 'Coimbatore North - CBF',
      },
      {
      value: 'CBE',
      label: 'Coimbatore Junction - CBE',
      },
      {
      value: 'PTJ',
      label: 'Podanur Jn - PTJ',
      },
      {
      value: 'TDE',
      label: 'Tudiyalur Halt - TDE',
      },
      {
      value: 'PKM',
      label: 'Periayanaikanpalayam - PKM',
      },
      {
      value: 'KAY',
      label: 'Karaimadai - KAY',
      },
      {
      value: 'MTP',
      label: 'Mettupalaiyam - MTP',
      },
      {
      value: 'QLR',
      label: 'Kallar - QLR',
      },
      {
      value: 'HLG',
      label: 'Hilgrove - HLG',
      },
      {
      value: 'ONR',
      label: 'Coonoor - ONR',
      },
      {
      value: 'WEL',
      label: 'Wellington - WEL',
      },
      {
      value: 'AVK',
      label: 'Aravankadu - AVK',
      },
      {
      value: 'KXT',
      label: 'Ketti - KXT',
      },
      {
      value: 'LOV',
      label: 'Lovdale - LOV',
      },
      {
      value: 'UAM',
      label: 'Udhagamandalam - UAM',
      },
      {
      value: 'MALR',
      label: 'Mallur - MALR',
      },
      {
      value: 'RASP',
      label: 'Rasipuram - RASP',
      },
      {
      value: 'KLGN',
      label: 'Kalangani - KLGN',
      },
      {
      value: 'NMKL',
      label: 'Namakkal - NMKL',
      },
      {
      value: 'MONR',
      label: 'Mohanur - MONR',
      },
      {
      value: 'VNGL',
      label: 'Vangal Halt - VNGL',
      },
      {
      value: 'KRR',
      label: 'Karur Jn - KRR',
      },
      {
      value: 'VEI',
      label: 'Velliyanai - VEI',
      },
      {
      value: 'PALM',
      label: 'Palayam - PALM',
      },
      {
      value: 'EDU',
      label: 'Eriodu - EDU',
      },
      {
      value: 'PGR',
      label: 'Pugalur - PGR',
      },
      {
      value: 'MPLM',
      label: 'Murthipalayam - MPLM',
      },
      {
      value: 'VRQ',
      label: 'Virarakkiyam - VRQ',
      },
      {
      value: 'MYU',
      label: 'Mayanoor - MYU',
      },
      {
      value: 'SEV',
      label: 'Sithalavai Halt - SEV',
      },
      {
      value: 'MMH',
      label: 'Mahadanapuram - MMH',
      },
      {
      value: 'LP',
      label: 'Lalapet - LP',
      },
      {
      value: 'TIC',
      label: 'Timmachipuram Halt - TIC',
      },
      {
      value: 'KLT',
      label: 'Kulithalai - KLT',
      },
      {
      value: 'Marudur Halt - MUQ',
      label: 'Marudur Halt - MUQ',
      },
      {
      value: 'PLI',
      label: 'Pettaivaytalai - PLI',
      },
      {
      value: 'PGN',
      label: 'Perugamani - PGN',
      },
      {
      value: 'EL',
      label: 'Elamanur - EL',
      },
      {
      value: 'JPM',
      label: 'Jiyapuram Halt - JPM',
      },
      {
      value: 'MTNL',
      label: 'Muttarasanallur - MTNL',
      },
    ]

const Option = [
    {
      value: ['Occupant',''],
      label: 'Occupant',
      },
      {
        value: ['SeniorSectionEngineer','Engineering'],
        label: 'Senior Section Engineer-Engg',
        },
        {
            value: ['AdditionalDivisionalEngineer','Engineering'],
            label: 'Additional Divisional Engineer-Engg',
            },
            {
                value: ['DivisionalEngineer','Engineering'],
                label: 'Divisional Engineer-Engg',
                }, 
                {
                    value: ['SeniorDivisionalEngineer','Engineering'],
                    label: 'Senior Divisional Engineer-Engg',
                    }, 
                    {
                        value: ['SeniorSectionEngineer','Electrical'],
                        label: 'Senior Section Engineer-Elec',
                        },
                        {
                            value: ['AdditionalDivisionalEngineer','Electrical'],
                            label: 'Additional Divisional Engineer-Elec',
                            },
                            {
                                value: ['DivisionalEngineer','Electrical'],
                                label: 'Divisional Engineer-Elec',
                                }, 
                                {
                                    value: ['SeniorDivisionalEngineer','Electrical'],
                                    label: 'Senior Divisional Engineer-Elec',
                                    },
                                    {
                                        value: ['JuniorEngineer','Electrical'],
                                        label: 'Junior Engineer-Elec',
                                        },
                                        {
                                            value: ['JuniorEngineer','Engineering'],
                                            label: 'Junior Engineer-Engg',
                                            },
  ];


  /*async function registerForPushNotificationsAsync() {
    let token;
    if (Constants.isDevice) {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        alert('Failed to get push token for push notification!');
        return;
      }
      token = (await Notifications.getExpoPushTokenAsync()).data;
      console.log(token);
    } else {
      alert('Must use physical device for Push Notifications');
    }
  
    if (Platform.OS === 'android') {
      Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }
  
    return token;
  }*/

// const registerForPushNotificationsAsync = async () => {
//     if (Constants.isDevice) {
//       const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
//       let finalStatus = existingStatus;
//       if (existingStatus !== 'granted') {
//         const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
//         finalStatus = status;
//       }
//       if (finalStatus !== 'granted') {
//         alert('Failed to get push token for push notification!');
//         return;
//       }
//       const token = await Notifications.getExpoPushTokenAsync();
//       console.log(token);
//         setexpoPushToken(token);
//     } else {
//       alert('Must use physical device for Push Notifications');
//     }

//     if (Platform.OS === 'android') {
//       Notifications.createChannelAndroidAsync('default', {
//         name: 'default',
//         sound: true,
//         priority: 'max',
//         vibrate: [0, 250, 250, 250],
//       });
//     }

//   };

function beforeSubmit(){
    handleSubmitButton();
    //registerForPushNotificationsAsync().then(token => setexpoPushToken(token) ,handleSubmitButton());
}
function handleSubmitButton(){
    if(userpassword.trim()!=userconfirmpassword.trim()){

        Alert.alert('Password!', 'Password and Confirm Password must be same', [
            {text: 'Okay'}
           ]);
           return;

    }

    if(!userPFNumber || !userName || !userQtrNumber || !userColony || !userStation 
        || !userMobile || !userpassword || !userconfirmpassword ||!expoPushToken){
            setErrortext('');
            if(!userPFNumber){
                Alert.alert('PF Number!', 'Please Fill Your PF Number', [
                 {text: 'Okay'}
                ]);
                return;
            }
            if(!userName){
                Alert.alert('Name!', 'Please Fill Your Name', [
                    {text: 'Okay'}
                   ]);
                   return;
            }
            if(!userQtrNumber){
                Alert.alert('Qtr Number!', 'Please Fill Your Qtr Number', [
                    {text: 'Okay'}
                   ]);
                   return;
            }
            if(!userColony){
                Alert.alert('Colony!', 'Please Fill Your Colony', [
                    {text: 'Okay'}
                   ]);
                   return;
            }
            if(!userStation){
                Alert.alert('Station!', 'Please Fill Your Station', [
                    {text: 'Okay'}
                   ]);
                   return;
            }
            if(!userMobile){
                Alert.alert('Mobile Number!', 'Please Fill Your Mobile Number', [
                    {text: 'Okay'}
                   ]);
                   return;
            }
            if(!userpassword){
                Alert.alert('Password!', 'Please Fill Your Password', [
                    {text: 'Okay'}
                   ]);
                   return;
            }
            if(!userconfirmpassword){
                Alert.alert('Confirm Password!', 'Please Fill Your Confirm Password', [
                    {text: 'Okay'}
                   ]);
                   return;
            }

        }
    else{


        prin();
        const e ={
            PFNumber : userPFNumber.trim(),
            Name:userName.trim(),
            QtrNumber:userQtrNumber.trim(),
            Colony:userColony.trim(),
            Department:userRole[1],
            Role:userRole[0],
            Station:userStation.trim(),
            Mobile:userMobile.trim(),
            Password:userpassword.trim(),
            Hint:userHint.trim(),
            Token:expoPushToken
        }

        console.log(e)
        
        axios.post(Ip+'/user/create',e)
            .then(response =>{
                const message = {
                    to: response.data.Token,
                    sound: 'default',
                    title: 'New Registration',
                    body: 'Please Check !!!',
                    data: { data: 'goes here' },
                  };
              
                //   fetch('https://exp.host/--/api/v2/push/send', {
                //     method: 'POST',
                //     headers: {
                //       Accept: 'application/json',
                //       'Accept-encoding': 'gzip, deflate',
                //       'Content-Type': 'application/json',
                //     },
                //     body: JSON.stringify(message),
                //   });
                console.log(response)
                Alert.alert('User Approval!', 'Your Form has been Submitted and Please Sign in after 2 hours to get Approved', [
                    {text: 'Okay'}
                   ]);
                navigation.navigate('Login')
            })
            .catch(error =>
                {    Alert.alert('User!', 'User Already exist', [
                    {text: 'Okay'}
                   ]);
                    console.log(error)
                }) 
    }
}

const textInputPFNumber = (userPFNumber) => {
    setUserPFNumber(userPFNumber)
    if( userPFNumber.length !== 0 ) {
        // registerForPushNotificationsAsync().then(token => setexpoPushToken(token));
        setData({
            ...data,
            check_textInputPFNumber: true
        });
    } else {
        setData({
            ...data,
            check_textInputPFNumber: false
        });
    }
}

const textInputName = (userName) => {
    setUserName(userName)
    if( userName.length !== 0 ) {
        setData({
            ...data,
            check_textInputName: true
        });
    } else {
        setData({
            ...data,
            check_textInputName: false
        });
    }
}

const textInputQtrNumber = (userQtrNumber) => {
    setUserQtrNumber(userQtrNumber)
    if( userQtrNumber.length !== 0 ) {
        setData({
            ...data,
            check_textInputQtrNumber: true
        });
    } else {
        setData({
            ...data,
            check_textInputQtrNumber: false
        });
    }
}

const textInputcolony = (userColony) => {
    setUserColony(userColony)
    if( userColony.length !== 0 ) {
        setData({
            ...data,
            check_textInputcolony: true
        });
    } else {
        setData({
            ...data,
            check_textInputcolony: false
        });
    }
}

const textInputStation = (userStation) => {
    setUserStation(userStation)
    if( userStation.length !== 0 ) {
        setData({
            ...data,
            check_textInputStation: true
        });
    } else {
        setData({
            ...data,
            check_textInputStation: false
        });
    }
}


const textInputCity = (userRole) => {
    setUserRole(userRole)
    if(!userRole){
        setData({
            ...data,
            check_textInputCity: false
        });
    }
    else{
        setData({
            ...data,
            check_textInputCity: true
        });
    }
}

const textInputMobileNumber = (userMobile) => {
    setUserMobile(userMobile)
    if( userMobile.length !== 0 ) {
        setData({
            ...data,
            check_textInputMobileNumber: true
        });
    } else {
        setData({
            ...data,
            check_textInputMobileNumber: false
        });
    }
}

const handleHintChange = (userHint) => {
    setUserHint(userHint)
    setData({
        ...data,
    });
}

const handlePasswordChange = (userpassword) => {
    setUserpassword(userpassword)
    setData({
        ...data,
    });
}

const handleConfirmPasswordChange = (userconfirmpassword) => {
    setUserconfirmpassword(userconfirmpassword)
    setData({
        ...data,
    });
}

const updateSecureTextEntry = () => {
    setData({
        ...data,
        secureTextEntry: !data.secureTextEntry
    });
}

const updateConfirmSecureTextEntry = () => {
    setData({
        ...data,
        confirm_secureTextEntry: !data.confirm_secureTextEntry
    });
}
  return (
    <View style={styles.container}>
        <ImageBackground 
        source={require('../assets/trainhd4.jpg')} 
        style={{width:undefined, padding:16, paddingTop:48, height:300}}
        >
    <StatusBar backgroundColor='#009387' barStyle="light-content"/>
  <View style={styles.header}>
      <Text style={styles.text_header}>Register Now!</Text>
  </View>
  </ImageBackground>
  <Animatable.View 
      animation="fadeInUpBig"
      style={styles.footer}
  >
      <ScrollView>
      <Text style={styles.text_footer}>PF Number</Text>
      <View style={styles.action}>
          <FontAwesome 
              name="user-o"
              color="#05375a"
              size={20}
          />
          <TextInput 
              placeholder="Your PF Number"
              style={styles.textInput}
              autoCapitalize="none"
              onChangeText={(userPFNumber) => textInputPFNumber(userPFNumber)}
          />
          {data.check_textInputPFNumber ? 
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
      }]}>Name</Text>
      <View style={styles.action}>
          <FontAwesome 
              name="user-o"
              color="#05375a"
              size={20}
          />
          <TextInput 
              placeholder="Your Name"
              style={styles.textInput}
              autoCapitalize="none"
              onChangeText={(userName) => textInputName(userName)}
          />
          {data.check_textInputName ? 
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
      }]}>Qtr Number</Text>
      <View style={styles.action}>
          <FontAwesome 
              name="home"
              color="#05375a"
              size={20}
          />
          <TextInput 
              placeholder="Your Qtr Number"
              style={styles.textInput}
              autoCapitalize="none"
              onChangeText={(userQtrNumber) => textInputQtrNumber(userQtrNumber)}
          />
          {data.check_textInputQtrNumber ? 
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

      <Text style={[styles.text_footer_role, {
          marginTop: 35
      }]}>Designation</Text>
      <View style={styles.action_role}>
          <FontAwesome 
              name="user-o"
              color="#05375a"
              size={20}
          />
          {/* <View style={styles.containerdropdown}> */}
          <Dropdown
            label="Please Select Your Role"
            data={Option}
            disableSort
            enableSearch
            value={userRole}
            onChange={textInputCity}
          />
        {/* </View>   */}
          {data.check_textInputCity ? 
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
      }]}>Colony</Text>
      <View style={styles.action}>
          <FontAwesome 
              name="home"
              color="#05375a"
              size={20}
          />
          <TextInput 
              placeholder="Your Colony"
              style={styles.textInput}
              autoCapitalize="none"
              onChangeText={(userColony) => textInputcolony(userColony)}
          />
          {data.check_textInputcolony ? 
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
      }]}>Station</Text>
      <View style={styles.action_role}>
          <FontAwesome 
              name="home"
              color="#05375a"
              size={20}
          />
          <Dropdown 
            label="Please Select Your Station"
            data={Stat} 
            enableSearch    
            value={userStation}
            onChange={textInputStation}
          />
          {data.check_textInputStation ? 
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
      }]}>Mobile Number</Text>
      <View style={styles.action}>
          <FontAwesome 
              name="mobile"
              color="#05375a"
              size={20}
          />
          <TextInput 
              placeholder="Your Mobile Number"
              style={styles.textInput}
              autoCapitalize="none"
              onChangeText={(userMobile) => textInputMobileNumber(userMobile)}
          />
          {data.check_textInputMobileNumber ? 
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
      }]}>Password Hint</Text>
      <View style={styles.action}>
          <Feather 
              name="lock"
              color="#05375a"
              size={20}
          />
          <TextInput 
              placeholder="Your Hint"
              secureTextEntry={data.secureTextEntry ? true : false}
              style={styles.textInput}
              autoCapitalize="none"
              onChangeText={(userHint) => handleHintChange(userHint)}
          />
          <TouchableOpacity
              onPress={updateSecureTextEntry}
          >
              {data.secureTextEntry ? 
              <Feather 
                  name="eye-off"
                  color="grey"
                  size={20}
              />
              :
              <Feather 
                  name="eye"
                  color="grey"
                  size={20}
              />
              }
          </TouchableOpacity>
      </View>

      <Text style={[styles.text_footer, {
          marginTop: 35
      }]}>Password</Text>
      <View style={styles.action}>
          <Feather 
              name="lock"
              color="#05375a"
              size={20}
          />
          <TextInput 
              placeholder="Your Password"
              secureTextEntry={data.secureTextEntry ? true : false}
              style={styles.textInput}
              autoCapitalize="none"
              onChangeText={(userpassword) => handlePasswordChange(userpassword)}
          />
          <TouchableOpacity
              onPress={updateSecureTextEntry}
          >
              {data.secureTextEntry ? 
              <Feather 
                  name="eye-off"
                  color="grey"
                  size={20}
              />
              :
              <Feather 
                  name="eye"
                  color="grey"
                  size={20}
              />
              }
          </TouchableOpacity>
      </View>

      <Text style={[styles.text_footer, {
          marginTop: 35
      }]}>Confirm Password</Text>
      <View style={styles.action}>
          <Feather 
              name="lock"
              color="#05375a"
              size={20}
          />
          <TextInput 
              placeholder="Confirm Your Password"
              secureTextEntry={data.confirm_secureTextEntry ? true : false}
              style={styles.textInput}
              autoCapitalize="none"
              onChangeText={(userconfirmpassword) => handleConfirmPasswordChange(userconfirmpassword)}
          />
          <TouchableOpacity
              onPress={updateConfirmSecureTextEntry}
          >
              {data.secureTextEntry ? 
              <Feather 
                  name="eye-off"
                  color="grey"
                  size={20}
              />
              :
              <Feather 
                  name="eye"
                  color="grey"
                  size={20}
              />
              }
          </TouchableOpacity>
      </View>
      <View style={styles.textPrivate}>
          <Text style={styles.color_textPrivate}>
              {/* By signing up you agree to our */}
          </Text>
          {/* <Text style={[styles.color_textPrivate, {fontWeight: 'bold'}]}>{" "}Terms of service</Text> */}
          {/* <Text style={styles.color_textPrivate}>{" "}and</Text> */}
          {/* <Text style={[styles.color_textPrivate, {fontWeight: 'bold'}]}>{" "}Privacy policy</Text> */}
      </View>
      {
          errortext!='' ?(
              <Text style ={
                    styles.errorTextStyle}>
                        {errortext}
                    </Text>
          ):null 
      }
      <View style={styles.button}>
          <TouchableOpacity
              style={styles.signIn}
              onPress={() =>{beforeSubmit()}}
          >
          <LinearGradient
              colors={['#08d4c4', '#01ab9d']}
              style={styles.signIn}
          >
              <Text style={[styles.textSign, {
                  color:'#fff'
              }]}>Sign Up</Text>
          </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={[styles.signIn, {
                  borderColor: '#009387',
                  borderWidth: 1,
                  marginTop: 15
              }]}
          >
              <Text style={[styles.textSign, {
                  color: '#009387'
              }]}>Sign In</Text>
          </TouchableOpacity>
      </View>
      </ScrollView>
  </Animatable.View>
</View>
);
};
export default SignUpScreen;

const styles = StyleSheet.create({
    container: {
      flex: 1, 
    //   backgroundColor: '#009387'
    },
    header: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        paddingBottom: 50
    },

        containerdropdown: {
          marginLeft: 20,
          marginRight: 20,
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
          flex: Platform.OS === 'ios' ? 3 : 5,
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
    text_footer_role: {
        color: '#05375a',
        fontSize: 18
    },
    action_role: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
    },
    textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 10,
        color: '#05375a',
    },

    button: {
        alignItems: 'center',
        marginTop: 50
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