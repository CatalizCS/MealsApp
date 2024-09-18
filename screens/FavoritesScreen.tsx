import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";

interface FavoritesScreenProps {}

const dummyFavorites = [
  { id: "1", title: "Spaghetti Carbonara" },
  { id: "2", title: "Sushi" },
  { id: "3", title: "Pizza Margherita" },
];

const FavoritesScreen: React.FC<FavoritesScreenProps> = (props) => {
  const renderFavoriteItem = (itemData: {
    item: { id: string; title: string };
  }) => {
    return (
      <View style={styles.favoriteItem}>
        <Text>{itemData.item.title}</Text>
      </View>
    );
  };

  return (
    <View style={styles.screen}>
      {dummyFavorites.length === 0 ? (
        <Text>No favorite meals yet!</Text>
      ) : (
        <FlatList
          data={dummyFavorites}
          keyExtractor={(item) => item.id}
          renderItem={renderFavoriteItem}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  favoriteItem: {
    padding: 10,
    marginVertical: 10,
    backgroundColor: "#f5f5f5",
    borderRadius: 5,
    width: "100%",
    alignItems: "center",
  },
});

export default FavoritesScreen;
