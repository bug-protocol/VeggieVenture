import { View, Text, SafeAreaView, KeyboardAvoidingView, Image, Pressable, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import React, { useState } from 'react';
import colors from '../../components/styles/colors';
import Icon from 'react-native-vector-icons/Entypo';
import axios from 'axios';
import { db } from "../../backend/database/firebase"
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth'
import AsyncStorage from '@react-native-async-storage/async-storage';

const RegisterScreen = (props:any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('')

  const handleRegister = async () => {
    try {
      const signupResponse = await auth()
        .createUserWithEmailAndPassword(email, password);

      const user = signupResponse.user;

      user.updateProfile({
        displayName: name,
      });

      await user.sendEmailVerification();

      await firestore()
        .collection('users')
        .doc(user.uid)
        .set({
          name: name,
          email: email,
          uid: user.uid,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        });

      // Manually sign the user out after account creation
      await auth().signOut();
      AsyncStorage.setItem('registrationStatus', 'registered');
      Alert.alert(
        "Verification Required",
        "An email verification link has been sent to your email address."
      );

    } catch (error) {
      console.error("Registration error:", error);
    }
  };




  return (
    <SafeAreaView style={styles.container}>

      <Image style={styles.backgroundImage} source={require('../../components/assets/farmer.png')} />

      <View style={styles.logoContainer}>
        <Image style={styles.logo} source={require('../../components/assets/farmglobe.png')} />
      </View>

      <KeyboardAvoidingView style={styles.keyboardContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Register Your Account</Text>
        </View>


        <View style={styles.inputContainer}>

          <View style={styles.inputWrapper}>
            <Icon style={{ marginHorizontal: 5 }} name={name.length&1 ? 'emoji-flirt' : 'emoji-happy'} size={30} color={colors.BLACK} />
            <TextInput
              value={name}
              onChangeText={(text) => setName(text)}
              placeholderTextColor={colors.DARK_GREY}
              style={styles.input}
              placeholder="Enter your Name"
            />
          </View>

          <View style={styles.inputWrapper2}>
            <Icon style={{ marginHorizontal: 5 }} name='mail-with-circle' size={30} color={colors.BLACK} />
            <TextInput
              value={email}
              onChangeText={(text) => setEmail(text)}
              placeholderTextColor={colors.DARK_GREY}
              style={styles.input}
              placeholder="Enter your Email"
            />
          </View>

          <View style={styles.inputWrapper2}>
            <Icon style={{ marginHorizontal: 5 }} name='lock' size={30} color={colors.BLACK} />
            <TextInput
              secureTextEntry={true}
              value={password}
              onChangeText={(text) => setPassword(text)}
              placeholderTextColor={colors.DARK_GREY}
              style={styles.input}
              placeholder="Enter your Password"
            />

          </View>
        </View>

        <View style={styles.buttonContainer}>

          <TouchableOpacity onPress={handleRegister} style={styles.loginButton}>

            <Text style={styles.loginButtonText}>Register</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.signupContainer}>
          <Text style={styles.signupText}>Already have an account?</Text>
          <TouchableOpacity onPress={() => { props.navigation.goBack()}} style={styles.signupButton}>
            <Text style={styles.signupText2}>{"\t"}Sign In</Text>
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
    resizeMode: 'cover',
    position: 'absolute',
    opacity: 0.45,
  },
  logoContainer: {
    marginTop: 20,
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
    alignSelf: "center",
    paddingVertical: 2,
    borderRadius: 20,
    width: '99%'
  },
  inputWrapper2: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: colors.BLACK,
    borderWidth: 1,
    alignSelf: "center",
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
    justifyContent: 'space-between',
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
    flexDirection: "row",
  },
  signupButton: {
    justifyContent: 'center',
  },
  signupText: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: "500",
    color: colors.BLACK_1,
  },
  signupText2: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: "bold",
    color: colors.BLUE,
  },
});

export default RegisterScreen;