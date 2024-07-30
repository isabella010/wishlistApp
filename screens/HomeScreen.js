import { View, Text, StyleSheet, FlatList, Image, Pressable, Alert } from "react-native";
import { useState, useEffect } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomeScreen = () => {
  const [itemsFromAPI, setItemsFromAPI] = useState([]);

  const addToWishlist = async (itemId, itemTitle, itemPrice, itemThumbnail) => {
    try {
      let inWishlist = false;

      const currList = await AsyncStorage.getItem('my-list');
      const parsedList = JSON.parse(currList) || [];

      for(let i = 0; i < parsedList.length; i++){
        if (parsedList[i].itemId === itemId) {
          inWishlist = true;
          break; 
        }
      }

      if (!inWishlist) {
        const tmp = {
          itemId,
          itemTitle,
          itemPrice,
          itemThumbnail,
        };
        parsedList.push(tmp);
        await AsyncStorage.setItem('my-list', JSON.stringify(parsedList));
      } else {
        Alert.alert(itemTitle + " is already in your wishlist");
        console.log(itemTitle + " is already in wishlist");
      }
    } catch (e) { 
      console.error("error occurred in addToWishlist: ", e);
    }
  };

  const getData = async () => {
    const API_URL = "https://dummyjson.com/products";

    try {
      const responseFromWebsite = await fetch(API_URL);
      const data = await responseFromWebsite.json();

      const allItems = [];

      for (let i = 0; i < data.products.length; i++) {
        allItems.push({
          id: i,
          title: data.products[i].title,
          price: data.products[i].price.toString(),
          thumbnail: data.products[i].thumbnail,
        });
      }

      setItemsFromAPI(allItems);
    } catch (err) {
      console.log("ERROR OCCURRED!!!");
      console.log(err);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={itemsFromAPI}
        keyExtractor={(item) => {
          return item.id;
        }}
        renderItem={({ item }) => {
          return (
            <View style={{ paddingTop: 20, paddingBottom: 20 }}>
              <Image
                source={{ uri: item.thumbnail }}
                style={{ height: 64, width: 64 }}
              />
              <Text>Name: {item.title}</Text>
              <Text>Price: ${item.price}</Text>
              <Pressable
                onPress={() => addToWishlist(item.id, item.title, item.price, item.thumbnail)}
                style={({ pressed }) => [
                  {
                    width: "50%",
                    backgroundColor: pressed ? "#DDDDDD" : "#CCCCCC",
                    padding: 10,
                    alignItems: "center",
                    borderRadius: 10,
                  },
                ]}
              >
                <Text>Add to Wishlist</Text>
              </Pressable>
            </View>
          );
        }}
        ItemSeparatorComponent={() => {
          return <View style={{ borderWidth: 1, borderColor: "#ccc" }}></View>;
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});

export default HomeScreen;
