import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Dimensions, ScrollView, Image } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';
import { useNavigation, useRoute } from '@react-navigation/native';
const { width, height } = Dimensions.get('window');
import axios from 'axios';
import BASE_URL from '../../components/BaseURL';
const primaryColor = '#0ac4af';
const secondaryColor = '#0d294f';
import FileUpload from './FileUpload';
import Modal from "react-native-modal";
import { AuthContext } from '../../components/AuthContext';

const validationSchema = yup.object().shape({
    // subtitle: yup.string().required('Subtitlele is required'),
    // description: yup.string().required('Description is required'),
    title: yup.string().required('Title is required')
        .test(
            'Unique ',
            'title address already added',
            async (value) => {
                try {
                    const response = await axios.post(`${BASE_URL}diseases/disease/checktitle`, {
                        title: value,
                    });
                    return response.data.message === 'title is available';
                } catch (error) {
                    console.log(`Error checking title : ${error}`);
                    return false;
                }
            }
        ),
    important: yup.string().required('Important is required'),
    veryimportant: yup.string().required('Very important is required'),
    // recommondation: yup.string().required('Recommondation is required'),
});


const EditItem = () => {

    const card = useRoute().params.card;
    const { userInfo, } = useContext(AuthContext)
    const navigation = useNavigation();
    const [uploadedImageLink, setUploadedImageLink] = useState();
    const [isModalVisible, setModalVisible] = useState(false);

    console.log(uploadedImageLink);

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

    const handleAdd = (values) => {
        const { title, subtitle, description, causes, important, veryimportant, symptoms, recommondation } = values;

        const requestData = {
            title,
            subtitle,
            description,
            causes,
            important,
            veryimportant,
            recommondation,
            symptoms,
            image: uploadedImageLink ? uploadedImageLink : card.image,
        };

        axios
            .put(`${BASE_URL}diseases/disease/edit/${card._id}`, requestData)
            .then((response) => {
                alert('Changed successfully!');
                navigation.navigate('Dashboard');
            })
            .catch((error) => {
                console.log(error);
                alert('User registration failed!');
            });
    };

    return (
        <ScrollView style={styles.container}>


            <View style={styles.lowerSection}>
                <Formik
                    initialValues={{
                        title: card.title,
                        subtitle: card.subtitle,
                        description: card.description,
                        causes: card.causes,
                        important: card.important,
                        veryimportant: card.veryimportant,
                        recommondation: card.recommondation,
                        symptoms: card.symptoms,

                    }}
                    validationSchema={validationSchema}
                    onSubmit={handleAdd}
                >
                    {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                        <View>
                            <View style={styles.inputContainer}>
                                <Text style={styles.label}>Title *</Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Title"
                                    onChangeText={handleChange('title')}
                                    onBlur={handleBlur('title')}
                                    value={values.title}
                                />
                                {touched.title && errors.title && <Text style={styles.errorText}>{errors.title}</Text>}
                            </View>

                            <View style={styles.inputContainer}>
                                <Text style={styles.label}>Subtitle</Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Enter Subtitle"
                                    onChangeText={handleChange('subtitle')}
                                    onBlur={handleBlur('subtitle')}
                                    value={values.subtitle}
                                />
                                {touched.subtitle && errors.subtitle && <Text style={styles.errorText}>{errors.subtitle}</Text>}
                            </View>

                            <View style={styles.inputContainer}>
                                <Text style={styles.label}>Description</Text>
                                <TextInput
                                    style={[styles.input, styles.multilineInput]}
                                    placeholder="Enter the Description"
                                    onChangeText={handleChange('description')}
                                    onBlur={handleBlur('description')}
                                    value={values.description}
                                    multiline={true}
                                    numberOfLines={4}
                                />
                                {touched.description && errors.description && <Text style={styles.errorText}>{errors.description}</Text>}
                            </View>

                            <View style={styles.inputContainer}>
                                <Text style={styles.label}>Causes</Text>
                                <TextInput
                                    style={[styles.input, styles.multilineInput]}
                                    placeholder="Enter Causes..."
                                    onChangeText={handleChange('causes')}
                                    onBlur={handleBlur('causes')}
                                    value={values.causes}
                                    multiline={true}
                                    numberOfLines={4}
                                />
                                {touched.causes && errors.causes && <Text style={styles.errorText}>{errors.causes}</Text>}
                            </View>

                            <View style={styles.inputContainer}>
                                <Text style={styles.label}>Diagnosis/ Symptoms</Text>
                                <TextInput
                                    style={[styles.input, styles.multilineInput]}
                                    placeholder="Enter Diagnosis/ Symptoms ..."
                                    onChangeText={handleChange('symptoms')}
                                    onBlur={handleBlur('symptoms')}
                                    value={values.symptoms}
                                    multiline={true}
                                    numberOfLines={4}
                                />
                                {touched.symptoms && errors.symptoms && <Text style={styles.errorText}>{errors.symptoms}</Text>}
                            </View>

                            <View style={styles.inputContainer}>
                                <Text style={styles.label}>Important *</Text>
                                <TextInput
                                    style={[styles.input, styles.multilineInput]}
                                    placeholder="Enter Important ..."
                                    onChangeText={handleChange('important')}
                                    onBlur={handleBlur('important')}
                                    value={values.important}
                                    multiline={true}
                                    numberOfLines={4}
                                />
                                {touched.important && errors.important && <Text style={styles.errorText}>{errors.important}</Text>}
                            </View>

                            <View style={styles.inputContainer}>
                                <Text style={styles.label}>Very Important *</Text>
                                <TextInput
                                    style={[styles.input, styles.multilineInput]}
                                    placeholder="Enter Very Important ..."
                                    onChangeText={handleChange('veryimportant')}
                                    onBlur={handleBlur('veryimportant')}
                                    value={values.veryimportant}
                                    multiline={true}
                                    numberOfLines={4}
                                />
                                {touched.veryimportant && errors.veryimportant && <Text style={styles.errorText}>{errors.veryimportant}</Text>}
                            </View>

                            <View style={styles.inputContainer}>
                                <Text style={styles.label}>Recommondation</Text>
                                <TextInput
                                    style={[styles.input, styles.multilineInput]}
                                    placeholder="Enter Recommondation ..."
                                    onChangeText={handleChange('recommondation')}
                                    onBlur={handleBlur('recommondation')}
                                    value={values.recommondation}
                                    multiline={true}
                                    numberOfLines={4}
                                />
                                {touched.recommondation && errors.recommondation && <Text style={styles.errorText}>{errors.recommondation}</Text>}
                            </View>

                            <TouchableOpacity onPress={toggleModal}>
                                <Text style={styles.label}>Change Image</Text>
                                <View style={styles.imagecontainer}>
                                    {uploadedImageLink ? (
                                        <Image source={{ uri: uploadedImageLink }} style={styles.image} />
                                    ) : card.image ? (
                                        <Image source={{ uri: card.image }} style={styles.image} />
                                    ) : (
                                        <Image source={require('./img.jpg')}
                                            style={styles.image} />
                                    )
                                    }
                                </View>
                            </TouchableOpacity>

                            <View style={styles.FileUploadContainer}>

                            <Modal isVisible={isModalVisible}>
                                        <View style={styles.model}>
                                            <FileUpload onImageUpload={setUploadedImageLink} />


                                            <TouchableOpacity style={styles.button2} onPress={toggleModal}>
                                                <Text style={styles.buttonText}>Go back</Text>
                                            </TouchableOpacity>

                                        </View>
                                    </Modal>
                                
                            </View>

                            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                                <Text style={styles.buttonText}>Save Disease</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                </Formik>

            </View>
        </ScrollView>
    );
};

export default EditItem;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    lowerSection: {
        backgroundColor: '#ffffff',
        paddingHorizontal: width * 0.05,
        paddingVertical: height * 0.05,
    },
    title: {
        fontSize: height * 0.035,
        fontWeight: 'bold',
        marginBottom: height * 0.03,
        textAlign: 'center',
        color: secondaryColor,
    },
    label: {
        fontSize: height * 0.02,
        fontWeight: 'bold',
        marginBottom: height * 0.01,
        color: secondaryColor,
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
    multilineInput: {
        height: null, // Remove fixed height
        textAlignVertical: 'top', // Allows text to start from the top of the input field
        paddingTop: height * 0.01,
    },
    errorText: {
        color: 'red',
        fontSize: height * 0.015,
        marginTop: height * 0.005,
    },
    button: {
        backgroundColor: secondaryColor,
        paddingVertical: height * 0.02,
        borderRadius: height * 0.02,
        marginBottom: height * 0.02,
    },

    button2: {
        backgroundColor: secondaryColor,
        paddingVertical: height * 0.02,
        borderRadius: height * 0.02,
        marginBottom: height * 0.02,
        width: width * 0.5,
    },


    buttonText: {
        color: '#ffffff',
        fontSize: height * 0.02,
        fontWeight: 'bold',
        textAlign: 'center',
    },

    model: {
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        height: height * 0.6,
    },

    image: {
        width: width * 0.9,
        height: height * 0.3,
        resizeMode: 'contain',
        marginBottom: height * 0.02,
    },
});