import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Dimensions } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';
import { AuthContext } from '../../components/AuthContext';
import { useNavigation } from '@react-navigation/native';
const { width, height } = Dimensions.get('window');
const primaryColor = '#0ac4af';

const validationSchema = yup.object().shape({
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().required('Password is required'),
});


const LoginScreen = () => {

  const navigation = useNavigation();
  const { login , primaryColor } = useContext(AuthContext);

  const handleFormSubmit = (values) => {
    login(values.email, values.password);
  };

  const handleForgotPassword = () => {
    navigation.navigate('ForgotPassword');
  };

  const handleSignUp = () => {
    navigation.navigate('SignUp');
  };


  return (
    <View style={styles.container}>



      <Formik
        initialValues={{ email: '', password: '' }}
        onSubmit={handleFormSubmit}
        validationSchema={validationSchema}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
          <View style={styles.lowerSection}>
            <View style={styles.upperSection}>
              {/* <Image source={require('../../../assets/icon.png')} style={styles.logo} /> */}
              <Text style={styles.upprtitle}>Doctor Food</Text>
            </View>

            <Text style={styles.title}>Login</Text>

            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Enter your Email"
                keyboardType="email-address"
                autoCapitalize="none"
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                value={values.email}
              />
              {errors.email && touched.email && (
                <Text style={styles.errorText}>{errors.email}</Text>
              )}
            </View>

            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Password"
                secureTextEntry
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                value={values.password}
              />
              {errors.password && touched.password && (
                <Text style={styles.errorText}>{errors.password}</Text>
              )}
            </View>

            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
              <Text style={styles.buttonText}>Sign In</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.forgotPasswordButton} onPress={handleForgotPassword}>
              <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
            </TouchableOpacity>

            <View style={styles.signUpTextContainer}>
              <Text style={styles.signUpText}>Don't have an account yet?  </Text>
              <TouchableOpacity onPress={handleSignUp}>
                <Text style={styles.signUpLink}>Sign up</Text>
              </TouchableOpacity>

            </View>
          </View>
        )}
      </Formik>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  upperSection: {
    justifyContent: 'center',
    alignItems: 'center',
    height: height * 0.25,
  },

  lowerSection: {
    flex: 1,
    backgroundColor: '#ffffff',
    paddingHorizontal: width * 0.05,
    paddingTop: height * 0.1,
    borderTopLeftRadius: width * 0.15,
    borderTopRightRadius: width * 0.15,
    
  },
  logo: {
    width: width * 0.3,
    height: width * 0.3,
    marginBottom: height * 0.15,
  },
  upprtitle: {
    fontSize: height * 0.055,
    fontWeight: 'bold',
    marginBottom: height * 0.03,
    textAlign: 'center',
    color: primaryColor,
  },

  title: {
    fontSize: height * 0.035,
    fontWeight: 'bold',
    marginBottom: height * 0.03,
    textAlign: 'center',
  },
  inputContainer: {
    marginBottom: height * 0.02,
  },
  input: {
    height: height * 0.04,
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
    fontSize: height * 0.02,
  },
  button: {
    backgroundColor: primaryColor,
    paddingVertical: height * 0.02,
    borderRadius: height * 0.02,
    marginBottom: height * 0.02,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: height * 0.02,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  forgotPasswordButton: {
    alignItems: 'center',
    marginBottom: height * 0.03,
    marginTop: height * 0.01,
    paddingLeft: width * 0.6,
  },
  forgotPasswordText: {
    color: primaryColor,
    fontSize: height * 0.018,
    textDecorationLine: 'underline',
  },
  signUpTextContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingTop: height * 0.06,
  },
  signUpText: {
    color: 'black',
    fontSize: height * 0.018,
  },
  signUpLink: {
    textDecorationLine: 'underline',
    color: primaryColor,
    fontSize: height * 0.018,
  },
  errorText: {
    color: 'red',
    fontSize: height * 0.018,
  },


});

export default LoginScreen;
