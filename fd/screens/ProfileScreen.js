//import AsyncStorage from '@react-native-community/async-storage';
import * as React from 'react';
import { StyleSheet, Text, View , ScrollView ,Alert , TouchableOpacity ,ActivityIndicator,LinearGradient , Image, ImageBackground} from 'react-native';
import { Avatar, Button, Card, Title, Paragraph, Divider } from 'react-native-paper';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

//import Feather from 'react-native-vector-icons/Feather';
//import Ip from './Ip';

function ProfileScreen() {
   return(
     <View>
        <ScrollView>
        <ImageBackground 
        source={require('../assets/dealer2.jpg')} 
        style={{width:undefined, padding:16, paddingTop:48, height:270}}
        >
          <View style={{alignItems : 'center',paddingTop : 10,}}>
            <Image source={require('../assets/logo.png')} style={{width:180,
        height:180,
        borderRadius:100,
        borderWidth:3,
        borderColor:"#FFF"}}></Image>
          </View>
          </ImageBackground>
          <View style ={{paddingTop:10}}>
          <Card style={styles.card}>
          <Card.Content>
            <Title style={styles.title}>{userName}</Title>
              <Divider/>
              <View style={{paddingLeft : '3%'}}>
              <Paragraph style={{fontWeight: 'bold',fontSize:18}}>{'\n'}
              <FontAwesome 
              name="user-o"
              color="#05375a"
              size={18}
          />
          {'\t\t'}PFNumber{'\t'}<Paragraph style={{color: '#34495e',fontSize:16}}> :  {userPFNumber}{'\n'}</Paragraph></Paragraph>
              <Paragraph style={{fontWeight: 'bold',fontSize:18}}><FontAwesome 
              name="user-o"
              color="#05375a"
              size={18}
          />
          {'\t\t'}Name{'\t'}<Paragraph style={{color: '#34495e',fontSize:16}}> :  {userName}{'\n'}</Paragraph></Paragraph>
              <Paragraph style={{fontWeight: 'bold',fontSize:18}}><FontAwesome 
              name="home"
              color="#05375a"
              size={18}
          />
          {'\t\t'}Qtr Number{'\t'}<Paragraph style={{color: '#34495e',fontSize:16}}> :  {userQtrNumber}{'\n'}</Paragraph></Paragraph>
              <Paragraph style={{fontWeight: 'bold',fontSize:18}}><FontAwesome 
              name="user-o"
              color="#05375a"
              size={18}
          />
          {'\t\t'}Role{'\t'}<Paragraph style={{color: '#34495e',fontSize:16}}> :  {userRole}{'\n'}</Paragraph></Paragraph>
             { userRole!='Occupant' &&
              <Paragraph style={{fontWeight: 'bold',fontSize:18}}><FontAwesome 
              name="user"
              color="#05375a"
              size={18}
          />
          {'\t\t'}Department{'\t'}<Paragraph style={{color: '#34495e',fontSize:16}}> :  {userDepart}{'\n'}</Paragraph></Paragraph>}
          <Paragraph style={{fontWeight: 'bold',fontSize:18}}><FontAwesome 
              name="home"
              color="#05375a"
              size={18}
          />
          {'\t\t'}Colony{'\t'}<Paragraph style={{color: '#34495e',fontSize:16}}> :  {userColony}{'\n'}</Paragraph></Paragraph>
          <Paragraph style={{fontWeight: 'bold',fontSize:18}}><FontAwesome 
              name="home"
              color="#05375a"
              size={18}
          />
          {'\t\t'}Station{'\t'}<Paragraph style={{color: '#34495e',fontSize:16}}> :  {userStation}{'\n'}</Paragraph></Paragraph>
          <Paragraph style={{fontWeight: 'bold',fontSize:18}}><FontAwesome 
              name="mobile"
              color="#05375a"
              size={20}
          />
          {'\t\t'}Mobile{'\t'}<Paragraph style={{color: '#34495e',fontSize:16}}> :  {userMobile}{'\n'}</Paragraph></Paragraph>

              </View>
          </Card.Content>
              <Divider/>
          {/* <Card.Content>
              <Paragraph style={{fontWeight: 'bold'}}>{'\n'}Status<Paragraph style={{color: '#34495e'}}> :  On Progress</Paragraph></Paragraph>
             
          </Card.Content> */}
                   
        </Card> 
        </View>
    </ScrollView>
     </View>
   );
}
export default ProfileScreen;

const styles = StyleSheet.create({

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