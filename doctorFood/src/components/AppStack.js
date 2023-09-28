import { StyleSheet, Text, View, Dimensions, TouchableOpacity } from 'react-native'
import React, { useContext } from 'react';
import { AuthContext } from '../components/AuthContext';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();
import { useNavigation } from '@react-navigation/native';
const primaryColor = '#0ac4af';
const secondaryColor = '#0d294f';

import Home from '../Pages/User/Home';
import Profile from '../Pages/User/Profile';
import BMI from '../Pages/User/BMI';
import IntakeNote from '../Pages/User/IntakeNote';
import AddItem from '../Pages/Admin/AddItem';
import AdminDashboard from '../Pages/Admin/AdminDashboard';
import FoodDetail from '../Pages/User/FoodDetail';
import EditItem from '../Pages/Admin/EditItem';


const CustomHeader = ({ navigation, title }) => (
  <View style={{
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: secondaryColor,
    height: Dimensions.get('window').height * 0.08,
  }}>
    <TouchableOpacity onPress={() => navigation.openDrawer()}>
      <MaterialCommunityIcons name="menu" size={30} color="#ffffff" style={{ marginLeft: 10 }} />
    </TouchableOpacity>
    <View style={{ flex: 1, alignItems: 'center', marginRight: Dimensions.get('window').width * 0.1 }}>
      <Text style={{ color: '#ffffff', fontSize: Dimensions.get('window').width * 0.05, fontWeight: 'bold' }}>
        {title}
      </Text>
    </View>
  </View>
);

const CustomHeader2 = ({ navigation, title }) => (
  <View style={{
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: secondaryColor,
    height: Dimensions.get('window').height * 0.08,
  }}>
    <TouchableOpacity onPress={() => navigation.goBack()}>
      <MaterialCommunityIcons name="arrow-left" size={30} color="#ffffff" style={{ marginLeft: 10 }} />
    </TouchableOpacity>
    <View style={{ flex: 1, alignItems: 'center', marginRight: Dimensions.get('window').width * 0.1 }}>
      <Text style={{ color: '#ffffff', fontSize: Dimensions.get('window').width * 0.05, fontWeight: 'bold' }}>
        {title}
      </Text>
    </View>
    <TouchableOpacity onPress={() => navigation.openDrawer()} style={{ position: 'absolute', right: 10 }}>
      <MaterialCommunityIcons name="menu" size={30} color="#ffffff" />
    </TouchableOpacity>
  </View>
);

const MainHeader = ({ navigation, title }) => (
  <CustomHeader navigation={navigation} title={title} />
);

const InsideHeader = ({ navigation, title }) => (
  <CustomHeader2 navigation={navigation} title={title} />
);

const HomeScreens = ({ }) => (

  <Stack.Navigator initialRouteName="Dashboard" >
    <Stack.Screen
      name="Dashboard"
      component={Home}
      initialParams={{ title: 'Dashboard' }}
      options={({ route, navigation }) => ({
        header: (props) => <MainHeader {...props} title={route.params?.title || 'Home'} />,
      })}
    />

    <Stack.Screen
      name="FoodDetail"
      component={FoodDetail}
      initialParams={{ title: 'FoodDetail' }}
      options={({ route, navigation }) => ({
        header: (props) => <InsideHeader {...props} title={route.params?.title || 'FoodDetail'} />,
      })}
    />

    <Stack.Screen
      name="EditItem"
      component={EditItem}
      initialParams={{ title: 'EditItem' }}
      options={({ route, navigation }) => ({
        header: (props) => <InsideHeader {...props} title={route.params?.title || 'EditItem'} />,
      })}
    />

  </Stack.Navigator>


);

const IntakeNoteSceen = ({ }) => (

  <Stack.Navigator
    screenOptions={{
      header: ({ route, navigation }) => (
        <CustomHeader navigation={navigation} title={route.params?.title || 'IntakeNote'} />
      ),
    }}

  >
    <Stack.Screen
      name="IntakeNote"
      component={IntakeNote}
      initialParams={{ title: 'IntakeNote' }}
    />

  </Stack.Navigator>

);

const ProfileScreens = ({ }) => (

  <Stack.Navigator
    screenOptions={{
      header: ({ route, navigation }) => (
        <CustomHeader navigation={navigation} title={route.params?.title || 'Profile'} />
      ),
    }}

  >
    <Stack.Screen
      name="Profile"
      component={Profile}
      initialParams={{ title: 'Profile' }}
    />

  </Stack.Navigator>

);

const BMISceeens = ({ }) => (

  <Stack.Navigator
    screenOptions={{
      header: ({ route, navigation }) => (
        <CustomHeader navigation={navigation} title={route.params?.title || 'BMI'} />
      ),
    }}

  >
    <Stack.Screen
      name="BMI"
      component={BMI}
      initialParams={{ title: 'BMI' }}
    />

  </Stack.Navigator>

);

const AdminScreens = ({ }) => (

  <Stack.Navigator initialRouteName="Admin-Dashboard" >

    <Stack.Screen
      name="Admin-Dashboard"
      component={AdminDashboard}
      initialParams={{ title: 'Admin Board' }}
      options={({ route, navigation }) => ({
        header: (props) => <MainHeader {...props} title={route.params?.title || 'AdminDashboard'} />,
      })}
    />

    <Stack.Screen
      name="AddItem"
      component={AddItem}
      options={({ route, navigation }) => ({
        header: (props) => <InsideHeader {...props} title={route.params?.title || 'AddItem'} />,
      })}
    />

  </Stack.Navigator>

);


const AppStack = () => {

  const [active, setActive] = React.useState('');
  const { userInfo, logout } = useContext(AuthContext)
  const navigation = useNavigation();

  return (

    <View style={{ flex: 1 }}>

      <Drawer.Navigator initialRouteName="Home"
        drawerContentOptions={{
          activeTintColor: '#e91e63',
          itemStyle: {
            marginVertical: 2,
          },
          labelStyle: {
            color: 'white',
            fontSize: Dimensions.get('window').width * 0.05,
            fontFamily: 'sans-serif',
          },
        }}
        drawerContent={(props) => (

          <View style={{ flex: 1 }}>
            <View style={{
              backgroundColor: secondaryColor,
              padding: 20,
              alignItems: 'center',
              justifyContent: 'center',
              height: Dimensions.get('window').height * 0.15,
            }}>
              <Text style={{
                color: 'white',
                fontSize: Dimensions.get('window').width * 0.08,
                fontWeight: 'bold',
                fontFamily: 'sans-serif'
              }}>
                Doctor Food
              </Text>
            </View>


            <DrawerContentScrollView {...props} style={styles.drawerContainer} >
              <DrawerItem
                style={styles.drawerItem}
                label="Home"
                labelStyle={styles.drawerLabel}
                icon={({ focused, color, size }) => (
                  <MaterialCommunityIcons
                    name={focused ? 'home' : 'home-outline'}
                    size={size}
                    color='white'
                  />
                )}
                onPress={() => navigation.navigate('Home')}
              />
              <DrawerItem
                label="Profile"
                labelStyle={styles.drawerLabel}
                icon={({ focused, color, size }) => (
                  <MaterialCommunityIcons
                    name={focused ? 'account' : 'account-outline'}
                    size={size}
                    color='white'
                  />
                )}
                onPress={() => navigation.navigate('Profile')}
              />
              <DrawerItem
                label="BMI"
                labelStyle={styles.drawerLabel}
                icon={({ focused, color, size }) => (
                  <MaterialCommunityIcons
                    name={focused ? 'book' : 'book-outline'}
                    size={size}
                    color='white'
                  />
                )}
                onPress={() => navigation.navigate('BMI')}
              />
              <DrawerItem
                label="IntakeNote"
                labelStyle={styles.drawerLabel}
                icon={({ focused, color, size }) => (
                  <MaterialCommunityIcons
                    name={focused ? 'book' : 'book-outline'}
                    size={size}
                    color='white'
                  />
                )}
                onPress={() => navigation.navigate('IntakeNote')}
              />

              {
                userInfo.role === 'admin' ? (
                  <DrawerItem
                    label="Admin Board"
                    labelStyle={styles.drawerLabel}
                    icon={({ focused, color, size }) => (
                      <MaterialCommunityIcons
                        name={focused ? 'book' : 'book-outline'}
                        size={size}
                        color='white'
                      />
                    )}
                    onPress={() => navigation.navigate('Admin')}
                  />
                ) : null
              }

            </DrawerContentScrollView>

            <TouchableOpacity
              style={{ backgroundColor: secondaryColor,
                padding: 10,
                alignItems: 'center',
                justifyContent: 'center',
               }}
              onPress={() => logout()}
            >
              <View style={{ padding: 16 }}>

                <Text style={{ color: 'white', fontSize: Dimensions.get('window').width * 0.05 }}>
                  <MaterialCommunityIcons

                    name='logout'
                    size={30}
                    color='white'
                  />  Logout
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        )}>
        <Drawer.Screen
          name="Home"
          component={HomeScreens}
          options={{
            headerShown: false,
            drawerIcon: ({ focused, size }) => (
              <MaterialCommunityIcons
                name={focused ? 'home' : 'home-outline'}
                size={size}
              />
            ),
          }}
        />
        <Drawer.Screen
          name="Profile"
          component={ProfileScreens}
          options={{
            headerShown: false,
            drawerIcon: ({ focused, size }) => (
              <MaterialCommunityIcons
                name={focused ? 'account' : 'account-outline'}
                size={size}
              />
            ),
          }}
        />
        <Drawer.Screen
          name="BMI"
          component={BMISceeens}
          options={{
            headerShown: false,
            drawerIcon: ({ focused, size }) => (
              <MaterialCommunityIcons
                name={focused ? 'book' : 'book-outline'}
                size={size}
              />
            ),
          }}
        />

        <Drawer.Screen
          name="IntakeNote"
          component={IntakeNoteSceen}
          options={{
            headerShown: false,
            drawerIcon: ({ focused, size }) => (
              <MaterialCommunityIcons
                name={focused ? 'book' : 'book-outline'}
                size={size}
              />
            ),
          }}
        />

        {
          userInfo.role === 'admin' ? (
            <Drawer.Screen
              name="Admin"
              component={AdminScreens}
              options={{
                headerShown: false,
                drawerIcon: ({ focused, size }) => (
                  <MaterialCommunityIcons
                    name={focused ? 'book' : 'book-outline'}
                    size={size}
                  />
                ),
              }}
            />
          ) : null
        }

      </Drawer.Navigator>
    </View>
  );
}

export default AppStack

const styles = {

  drawerContainer: {
    backgroundColor: "#0d294f",
  },

  drawerItem: {
    color: 'white',
  },

  drawerLabel: {
    color: 'white',
    fontSize: Dimensions.get('window').width * 0.05,
    fontFamily: 'sans-serif',

  }

};