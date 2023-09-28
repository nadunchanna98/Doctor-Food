import { StyleSheet, View, Dimensions, ScrollView , Share,RefreshControl } from 'react-native';
import React, {useCallback,useEffect, useState,useContext } from 'react';
import { Searchbar, Card, Avatar, IconButton, Button } from 'react-native-paper';
const { height, width } = Dimensions.get('window');
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { AuthContext } from  '../../components/AuthContext';

const secondaryColor = '#0d294f';

const Home = () => {

  const { BASE_URL } = useContext(AuthContext)

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    getDiseases();

    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);



  useEffect(() => {
    getDiseases();
  }, []);

  const getDiseases = async () => {
    try {
      axios.get(`${BASE_URL}diseases/`)
        .then(function (response) {
          setCards(response.data);
        })
        .catch(function (error) {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const [refreshing, setRefreshing] = useState(false);
 const [cards, setCards] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const navigation = useNavigation();
  // const [cards, setCards] = useState([
  //   {
  //     id : 1,
  //     title: 'Diaberetes',
  //     subtitle: 'type 1, type 2',
  //   },
  //   {
  //     id : 2,
  //     title: 'Hypertension',
  //     subtitle: 'Stage 1, Stage 2',
  //   },
  //   {
  //     id : 3,
  //     title: 'kidney disease ',
  //     subtitle: 'frequent urination, blood in urine',
  //   },
  //   {
  //     id : 4,
  //     title: 'Cardiovascular disease and stroke',
  //     subtitle: 'chest pain, shortness of breath',
  //   },

  // ]);

  const filteredCards = cards.filter((card) =>
    card.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const onChangeSearch = (query) => setSearchQuery(query);

  return (
    <ScrollView style={styles.Container} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}  >
      <View style={styles.searchbarContainer}>
        <Searchbar
          placeholder="Search Disease"
          onChangeText={onChangeSearch}
          value={searchQuery}
          color={secondaryColor}
          iconColor={secondaryColor}
          placeholderTextColor={secondaryColor}
          style={{
            borderRadius: 20,
            backgroundColor: '#fff',
            borderColor: secondaryColor,
            borderWidth: 1,
            position: 'fixed'
          }}
        />
      </View>
      <View style={styles.searchItems}>
        {filteredCards.map((card, index) => (

          <View style={styles.searchItem}>
            <Card>
              <Card.Cover
                source={ {uri: card.image} }
                style={{ height: height * 0.2 }}

              />
              <Card.Title
                key={index}
                title={card.title}
                subtitle={card.subtitle}
                left={(props) => <Avatar.Icon
                  {...props}
                  icon="medical-bag"
                  style={{
                    backgroundColor: secondaryColor,
                  }}
                />}
                right={(props) => <IconButton {...props} icon="share-variant"
                onPress={() => {
                         Share.share({
                            message: `Hey,`+`\nCheck out this medical details for ${card.title} and its symptoms ${card.subtitle} on Doctor Food App.`+` \n\nDownload it from`+`\n https://play.google.com/store/apps/details?id=com.doctorfood`,      });
                }} />}
              />
              <Button
                icon="food"
                mode="contained"
                buttonColor={secondaryColor}
                style={{
                  borderRadius: width * 0.1,
                  marginRight: width * 0.04,
                  marginLeft: width * 0.04,
                  marginBottom: height * 0.02,
                  borderColor: secondaryColor,
                  borderWidth: 1,
                  width: width * 0.8,
                  alignSelf: 'center',
                }

                }
                onPress={() => { 
                  navigation.navigate('FoodDetail', { title: 'Food Detail', id: card._id})
                }} >Check Foods need to avoid and eat</Button>
            </Card>

          </View>

        ))}
      </View>



    </ScrollView>
  );
};

export default Home;

const styles = StyleSheet.create({

  Container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  searchbarContainer: {
    marginTop: 10,
    marginHorizontal: 10,
    backgroundColor: 'transparent',
  },

  searchItems: {
    marginTop: 10,
  },

  searchItem: {
    marginVertical: 10,
    marginHorizontal: 10,
    borderRadius: 15,
  },
});