import React,{useState , createRef} from 'react';
import { 
    View, 
    ScrollView ,
    Text, 
    TouchableOpacity, 
    TextInput,
    Platform,
    StyleSheet ,
    StatusBar,
    ActivityIndicator,
    Alert
} from 'react-native';
import * as Animatable from 'react-native-animatable';
//import { LinearGradient } from 'expo-linear-gradient';
import Ip from './Ip';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';

import { useTheme } from 'react-native-paper';
import axios from 'axios';
//import { AuthContext } from '../components/context';
import { Avatar, Button, Card, Title, Paragraph, Divider } from 'react-native-paper';


const EditUserRole = ({navigation}) => {

    const [userPFNumber, setUserPFNumber]=useState('');
    const [userHint, setUserHint]=useState('');
    const [userDetails,setUserDetails]=useState('');
    const [userpassword, setUserpassword]=useState('');
    const [userconfirmpassword, setUserconfirmpassword]=useState('');
 

    const [data, setData] = React.useState({
        username: '',
        password: '',
        check_textInputChange: false,
        secureTextEntry: true,
        isValidUser: true,
        isValidPassword: true,
    });

    const { colors } = useTheme();

    
    
    const textInputChange = (userPFNumber) => {
        setUserPFNumber(userPFNumber)
        if( userPFNumber.trim().length >= 4 ) {
            setData({
                ...data,
                check_textInputChange: true,
                isValidUser: true
            });
        } else {
            setData({
                ...data,
                check_textInputChange: false,
                isValidUser: false
            });
        }
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

    const handleHintChange = (userHint) => {
        setUserHint(userHint)
            setData({
                ...data,
                isValidPassword: true
            });
    }

    function search(){
        if(!userPFNumber){
            Alert.alert('Alert!', 'Please Enter your PFNumber', [
                {text: 'Okay'}
               ]);
        }
        if(!userHint){
            Alert.alert('Alert!', 'Please Enter your Hint', [
                {text: 'Okay'}
               ]);
        }
        if(userPFNumber && userHint)
        {
        axios.get(Ip+`/user/editRole/${userPFNumber}`)
        .then(response =>{
            console.log(response)
            // this.state.posts=response.data
            setUserDetails(response.data)
            if(userDetails.Hint!=userHint){
                Alert.alert('Hint!', 'Please Enter your Password Hint Correctly', [
                    {text: 'Okay'}
                   ]);
            }
            
        })
        .catch(error =>
            {
                console.log(error)
            })
        }
    } 

    function ChangePassword(){
        console.log(userpassword,userconfirmpassword)
        if(userpassword==userconfirmpassword){
            const dis={
                Password:userpassword
            }
            console.log(userPFNumber)
            axios.post(Ip+`/user/changePassword/${userPFNumber}`,dis)
            .then(response =>{
                console.log(response)
                // this.state.posts=response.data
                Alert.alert('Password!', 'Password Changed Successfully !!!', [
                    {text: 'Okay'}
                   ]);
                navigation.navigate('Login')            
            })
            .catch(error =>
            {
                console.log(error)
            })

        }
        else{
            Alert.alert('Password!', 'Password and Confirm Password must be same', [
                {text: 'Okay'}
               ]);
        }
       
    }


    return (

      <View style={styles.container}>
          <StatusBar backgroundColor='#009387' barStyle="light-content"/>
        <View style={styles.header}>
            <Text style={styles.text_header}>Change Your Password!</Text>
        </View>
        <Animatable.View 
                animation="fadeInUpBig"
                style={[styles.footer, {
                    backgroundColor: colors.background
                }]}
            >
        <ScrollView>
        <Card style={styles.card}>
       <Card.Content>           
                <Text style={[styles.text_footer, {
                    color: colors.text
                }]}>PF Number</Text>
            <View style={styles.action}>
                <FontAwesome 
                    name="user-o"
                    color={colors.text}
                    size={20}
                />
                <TextInput 
                    placeholder="Enter PFNumber"
                    placeholderTextColor="#666666"
                    style={[styles.textInput, {
                        color: colors.text
                    }]}
                    autoCapitalize="none"
                    onChangeText={(userPFNumber) => textInputChange(userPFNumber)}  
                />
                {data.check_textInputChange ? 
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
                color: colors.text,
                marginTop: 35
            }]}>Hint</Text>
            <View style={styles.action}>
                <Feather 
                    name="lock"
                    color={colors.text}
                    size={20}
                />
                <TextInput 
                    placeholder="Your Hint"
                    placeholderTextColor="#666666"
                    secureTextEntry={data.secureTextEntry ? true : false}
                    style={[styles.textInput, {
                        color: colors.text
                    }]}
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
       </Card.Content>
       <Divider/>
                   <Card.Actions >
                     <Button color={'#008000'} onPress={() => {search()}}>Search</Button>
                   </Card.Actions>
         </Card>
         {
            userDetails!=0 && userDetails.Hint==userHint &&
             (
                <Card style={styles.card}>
                <Card.Content>           
                <Text style={[styles.text_footer, {
          marginTop: 35
      }]}>New Password</Text>
      <View style={styles.action}>
          <Feather 
              name="lock"
              color="#05375a"
              size={20}
          />
          <TextInput 
              placeholder="Your New Password"
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
      }]}>Confirm New Password</Text>
      <View style={styles.action}>
          <Feather 
              name="lock"
              color="#05375a"
              size={20}
          />
          <TextInput 
              placeholder="Confirm Your New Password"
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
                </Card.Content>
                <Divider/>
                            <Card.Actions >
                              <Button color={'#008000'} onPress={() => {ChangePassword()}}>Change Password</Button>
                            </Card.Actions>
                  </Card>
             )
         } 
         {
             userDetails==0 &&(
                <Card style={styles.card}>
                <Card.Content>
                    <Title style={{fontWeight:'bold',textAlign:'center'}}>No User Found</Title>
                </Card.Content>
                  </Card>
             ) 
         }
         </ScrollView>
         </Animatable.View>
      </View>
    );
};

export default EditUserRole;

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
    footer: {
        flex: 3,
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
        paddingBottom: 0
    },
    actionError: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#FF0000',
        paddingBottom: 5
    },
    textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 10,
        color: '#05375a',
    },
    errorMsg: {
        color: '#FF0000',
        fontSize: 14,
    },
    button: {
        alignItems: 'center',
        marginTop: 50
    },
    signIn: {
        width: '30%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    textSign: {
        fontSize: 18,
        fontWeight: 'bold'
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
  });
