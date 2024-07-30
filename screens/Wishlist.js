import { View, Text, StyleSheet, FlatList, Image, Pressable } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState } from "react";
import { useFocusEffect } from '@react-navigation/native';

const AccountSettingsScreen = () => {
  const [wishlist, setWishlist] = useState([]);

  const removeFromWishlist = async (itemId) => {
    try {
      const currList = await AsyncStorage.getItem('my-list');
      const parsedList = JSON.parse(currList) || [];
  
      for(let i = 0; i < parsedList.length; i++){
        if (parsedList[i].itemId === itemId) {
          parsedList.splice(i, 1);
          await AsyncStorage.setItem('my-list', JSON.stringify(parsedList));
          setWishlist(parsedList);
        }
      }
    } catch (e) {
      console.error("Error occurred in removeFromWishlist: ", e);
    }
  };

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem("my-list");
      if (value !== null) {
        const parsedValue = JSON.parse(value);
        setWishlist(parsedValue);
      }
    } catch (e) {
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      getData();
    }, [])
  );

  return (
    <View style={styles.container}>
      {wishlist.length === 0 ? (
        <Text style={styles.emptyText}>Wishlist is empty</Text>
      ) : ( 
        <FlatList
        data={wishlist}
        keyExtractor={(item) => {
          return item.itemId;
        }}
        renderItem={({ item }) => {
          return (
            <View style={{ paddingTop: 20, paddingBottom: 20 }}>
              <Image
                source={{ uri: item.itemThumbnail }}
                style={{ height: 64, width: 64 }}
              />
              <Text>Name: {item.itemTitle}</Text>
              <Text>Price: ${item.itemPrice}</Text>
              <Pressable
                onPress={() => removeFromWishlist(item.itemId)}
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
                <Text>Remove from Wishlist</Text>
              </Pressable>
            </View>
          );
        }}
        ItemSeparatorComponent={() => {
          return <View style={{ borderWidth: 1, borderColor: "#ccc" }}></View>;
        }}
      />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});

export default AccountSettingsScreen;
