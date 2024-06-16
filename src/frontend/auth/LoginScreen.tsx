import {
  View,
  Text,
  SafeAreaView,
  KeyboardAvoidingView,
  Image,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import colors from '../../components/styles/colors';
import Icon from 'react-native-vector-icons/Entypo';
import AsyncStorage from '@react-native-async-storage/async-storage';
import auth from '@react-native-firebase/auth';
const Login = (props: any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const handleLogin = () => {
    auth()
      .fetchSignInMethodsForEmail(email)
      .then(methods => {
        if (methods.includes('password')) {
          auth()
            .signInWithEmailAndPassword(email, password)
            .then(async userCredential => {
              const user = userCredential.user;
              if (user.emailVerified) {
                console.log('User Logged In');
                AsyncStorage.setItem('userLoginStatus', 'true');
                // Proceed with further actions for a verified user
              } else {
                // User's email is not verified, prevent login
                Alert.alert(
                  'Account not verified',
                  'Please verify your account using the link sent to your registered email',
                );
                // You might also want to sign the user out at this point
                auth().signOut();
              }
            })
            .catch(error => {
              // Handle login error
              console.error('Login error:', error);
            });
        } else {
          // No password-based sign-in method available for the email
          Alert.alert('No account found', 'Please sign up first');
        }
      })
      .catch(error => {
        // Handle fetchSignInMethodsForEmail error
        console.error('Fetch methods error:', error);
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Image
        style={styles.backgroundImage}
        source={require('../../components/assets/local-farmers-market.png')}
      />

      <View style={styles.logoContainer}>
        <Image
          style={styles.logo}
          source={require('../../components/assets/farmglobe.png')}
        />
      </View>

      <KeyboardAvoidingView style={styles.keyboardContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Login to Your Account</Text>
        </View>

        <View style={styles.inputContainer}>
          <View style={styles.inputWrapper}>
            <Icon
              style={{marginHorizontal: 5}}
              name="mail-with-circle"
              size={30}
              color={colors.BLACK}
            />
            <TextInput
              value={email}
              onChangeText={text => setEmail(text)}
              placeholderTextColor={colors.DARK_GREY}
              style={styles.input}
              placeholder="Enter your Email"
            />
          </View>

          <View style={styles.inputWrapper2}>
            <Icon
              style={{marginHorizontal: 5}}
              name="lock"
              size={30}
              color={colors.BLACK}
            />
            <TextInput
              secureTextEntry={true}
              value={password}
              onChangeText={text => setPassword(text)}
              placeholderTextColor={colors.DARK_GREY}
              style={styles.input}
              placeholder="Enter your Password"
            />
          </View>
          <View style={styles.checkboxContainer}>
            <Text style={styles.forgotPassword}>Forgot Password?</Text>
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={handleLogin} style={styles.loginButton}>
            <Text style={styles.loginButtonText}>Login</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.signupContainer}>
          <Text style={styles.signupText}>Don't have an account?</Text>
          <TouchableOpacity
            onPress={() => {
              props.navigation.navigate('Register');
            }}
            style={styles.signupButton}>
            <Text style={styles.signupText2}>{'\t'}Sign up</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#9af0f5',
    alignItems: 'center',
  },
  backgroundImage: {
    resizeMode: 'contain',
    position: 'absolute',
    opacity: 1,
    bottom: 0,
  },
  logoContainer: {
    marginTop: 10,
  },
  logo: {
    width: 250,
    height: 250,
    resizeMode: 'contain',
  },
  keyboardContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    color: colors.BLACK_1,
  },
  inputContainer: {
    marginTop: 40,
  },
  inputWrapper: {
    marginTop: 5,
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: colors.BLACK,
    borderWidth: 1,
    alignSelf: 'center',
    paddingVertical: 2,
    borderRadius: 20,
    width: '99%',
  },
  inputWrapper2: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: colors.BLACK,
    borderWidth: 1,
    alignSelf: 'center',
    paddingVertical: 2,
    borderRadius: 20,
    width: '99%',
  },
  input: {
    color: colors.BLACK,
    marginVertical: 3,
    width: '80%',
    fontSize: 16,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginTop: 12,
  },
  forgotPassword: {
    fontWeight: '500',
    color: '#007FFF',
  },
  buttonContainer: {
    marginTop: 45,
  },
  loginButton: {
    width: 200,
    backgroundColor: colors.BLACK,
    padding: 15,
    marginTop: 40,
    marginLeft: 'auto',
    marginRight: 'auto',
    borderRadius: 40,
  },
  loginButtonText: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
    color: 'white',
  },
  signupContainer: {
    marginTop: 10,
    flexDirection: 'row',
  },
  signupButton: {
    justifyContent: 'center',
  },
  signupText: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '500',
    color: colors.BLACK_1,
  },
  signupText2: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.BLUE,
  },
});

export default Login;
