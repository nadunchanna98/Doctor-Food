import { StyleSheet, Text, View, Dimensions } from 'react-native'
import React from 'react'
import { Button } from 'react-native-paper';
const { height, width } = Dimensions.get('window');
const secondaryColor = '#0d294f';
import { useNavigation } from '@react-navigation/native';

const AdminDashboard = () => {

  const navigation = useNavigation();

  return (
    <View style={styles.container}  >

      <View style={styles.buttonContainer}>
        <Button icon="plus"
          mode="contained"
          buttonColor={secondaryColor}
          labelStyle={{
            color: '#fff',
            fontSize: width * 0.05,
            margin : width * 0.02,
          }}
          style={{
            borderRadius: width * 0.1,
            marginRight: width * 0.04,
            marginLeft: width * 0.04,
            marginBottom: height * 0.02,
            borderColor: secondaryColor,
            borderWidth: 1,
            width: width * 0.8,
            alignSelf: 'center',
          }}
          onPress={() => {
            navigation.navigate('AddItem', { title: 'Add Item' })
          }}>
          Add New Disease
        </Button>
      </View>



    </View>
  )
}

export default AdminDashboard

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  buttonContainer: {
    marginTop: 10,
    marginHorizontal: 10,
    backgroundColor: 'transparent',
  },


})