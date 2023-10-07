import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Dimensions, ScrollView } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';
import { useNavigation } from '@react-navigation/native';
const { width, height } = Dimensions.get('window');
import axios from 'axios';
import BASE_URL from '../../components/BaseURL';
import moment from 'moment';
const primaryColor = '#0d294f';

const validationSchema = yup.object().shape({
    name: yup.string().required('Name is required'),
    email: yup.string().email('Invalid email').required('Email is required')
        .test(
            'Unique email',
            'Email address already in use',
            async (value) => {
                try {
                    const response = await axios.post(`${BASE_URL}users/user/checkemail`, {
                        email: value,
                    });
                    return response.data.message === 'email is available';
                } catch (error) {
                    console.log(`Error checking Email address: ${error}`);
                    return false;
                }
            }
        ),
    password: yup.string().required('Password is required'),
    confirmPassword: yup
        .string()
        .oneOf([yup.ref('password'), null], 'Passwords must match')
        .required('Confirm Password is required'),
});

const SignUpScreen = () => {

    const navigation = useNavigation();

    var date = ''
    const handleDateInputChange = (day, month, year) => {
        const dateString = `${year}-${month}-${day}`;
        date = moment(dateString, 'YYYY-MM-DD').toDate();
    };

    const handleSignUp = (values) => {
        const { name, email, password, blood, allergies } = values;

        const requestData = {
            name,
            email,
            password,
            dob: date,
            blood,
            allergies
        };

        axios
            .post(`${BASE_URL}users/user/register`, requestData)
            .then((response) => {
                console.log(response.data);
                alert('User registered successfully!');
                navigation.navigate('Login');
            })
            .catch((error) => {
                console.log(error);
                alert('User registration failed!');
            });
    };

    return (
        <ScrollView style={styles.container}>

            <View style={styles.lowerSection}>
                <Text style={styles.title}>Sign Up Form</Text>

                <Formik
                    initialValues={{
                        name: '',
                        email: '',
                        password: '',
                        confirmPassword: '',
                        blood: '',
                        Allergies: '',
                    }}
                    validationSchema={validationSchema}
                    onSubmit={handleSignUp}
                >
                    {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                        <View>
                            <View style={styles.inputContainer}>
                                <TextInput
                                    style={[styles.input, styles.disabledInput]}
                                    placeholder="Name *"
                                    onChangeText={handleChange('name')}
                                    onBlur={handleBlur('name')}
                                    value={values.name}
                                />
                                {touched.name && errors.name && <Text style={styles.errorText}>{errors.name}</Text>}
                            </View>

                            <View style={styles.inputContainer}>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Email *"
                                    keyboardType="email-address"
                                    autoCapitalize="none"
                                    onChangeText={handleChange('email')}
                                    onBlur={handleBlur('email')}
                                    value={values.email}
                                />
                                {touched.email && errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
                            </View>

                            <View style={styles.inputContainerDate}>

                                <TextInput
                                    style={styles.inputDate}
                                    placeholder="Day"
                                    onChangeText={(text) => handleDateInputChange(text, values.month, values.year)}
                                    onBlur={handleBlur('day')}
                                    value={values.day}
                                    keyboardType="numeric"
                                    maxLength={2}
                                />

                                <TextInput
                                    style={styles.inputDate}
                                    placeholder="Month"
                                    onChangeText={(text) => handleDateInputChange(values.day, text, values.year)}
                                    onBlur={handleBlur('month')}
                                    value={values.month}
                                    keyboardType="numeric"
                                    maxLength={2}
                                />

                                <TextInput
                                    style={styles.inputDate}
                                    placeholder="Year"
                                    onChangeText={(text) => handleDateInputChange(values.day, values.month, text)}
                                    onBlur={handleBlur('year')}
                                    value={values.year}
                                    keyboardType="numeric"
                                    maxLength={4}
                                />

                            </View>

                            <View style={styles.inputContainer}>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Blood Group"
                                    onChangeText={handleChange('blood')}
                                    onBlur={handleBlur('blood')}
                                    value={values.blood}
                                />
                                {touched.blood && errors.blood && <Text style={styles.errorText}>{errors.blood}</Text>}
                            </View>

                            <View style={styles.inputContainer}>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Allergies"
                                    onChangeText={handleChange('allergies')}
                                    onBlur={handleBlur('allergies')}
                                    value={values.allergies}
                                />

                                {touched.allergies && errors.allergies && <Text style={styles.errorText}>{errors.allergies}</Text>}
                            </View>

                            <View style={styles.inputContainer}>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Password *"
                                    secureTextEntry
                                    onChangeText={handleChange('password')}
                                    onBlur={handleBlur('password')}
                                    value={values.password}
                                />
                                {touched.password && errors.password && <Text style={styles.errorText}>{errors.password}</Text>}
                            </View>

                            <View style={styles.inputContainer}>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Confirm Password *"
                                    secureTextEntry
                                    onChangeText={handleChange('confirmPassword')}
                                    onBlur={handleBlur('confirmPassword')}
                                    value={values.confirmPassword}
                                />
                                {touched.confirmPassword && errors.confirmPassword && (
                                    <Text style={styles.errorText}>{errors.confirmPassword}</Text>
                                )}
                            </View>

                            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                                <Text style={styles.buttonText}>Sign Up</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                </Formik>
                <View style={styles.footer}>
                    <Text style={styles.footerText}>Already have an account?</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                        <Text style={styles.footerLink}>Login</Text>
                    </TouchableOpacity>
                </View>

            </View>
        </ScrollView>
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
        height: height * 0.3,
    },
    lowerSection: {
        backgroundColor: '#ffffff',
        paddingHorizontal: width * 0.05,
        paddingTop: height * 0.1,
    },
    logo: {
        width: width * 0.3,
        height: width * 0.3,
        marginBottom: height * 0.15,

    },
    title: {
        fontSize: height * 0.035,
        fontWeight: 'bold',
        marginBottom: height * 0.03,
        textAlign: 'center',
        color: primaryColor,
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

    inputDate: {
        height: height * 0.04,
        borderBottomWidth: 1,
        borderBottomColor: 'gray',
        fontSize: height * 0.02,
        width: width * 0.2,
        marginRight: width * 0.02,
        marginLeft: width * 0.02,
    },
    errorText: {
        color: 'red',
        fontSize: height * 0.015,
        marginTop: height * 0.005,
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

    footer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: height * 0.02,
        marginBottom: height * 0.05,
    },
    footerText: {
        fontSize: height * 0.02,
        marginRight: width * 0.02,
    },
    footerLink: {
        fontSize: height * 0.02,
        color: primaryColor,
    },

    inputContainerDate: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: height * 0.02,
        marginLeft: width * 0.02,
        marginRight: width * 0.02,
    },


});

export default SignUpScreen;
