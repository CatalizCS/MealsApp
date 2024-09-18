import React, { useLayoutEffect, useContext } from "react";
import { View, Text, StyleSheet, Image, ScrollView } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "@/components/HeaderButton";
import { MEALS } from "@/data/dummy-data";
import { MealsContext } from "@/contexts/meals-context";
import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";
import Colors from "@/constants/Colors";

interface MealDetailScreenProps {
  navigation: StackNavigationProp<any, any>;
  route: RouteProp<{ params: { mealId: string } }, "params">;
}

interface ListItemProps {
  children: React.ReactNode;
}

const ListItem: React.FC<ListItemProps> = ({ children }) => {
  return (
    <View style={styles.listItem}>
      <Text style={styles.listItemText}>{children}</Text>
    </View>
  );
};

const MealDetailScreen: React.FC<MealDetailScreenProps> = (props) => {
  const { mealId } = props.route.params;
  const selectedMeal = MEALS.find((meal) => meal.id === mealId);
  const { isFavorite, addFavorite, removeFavorite } = useContext(MealsContext);

  const currentMealIsFavorite = isFavorite(mealId);

  useLayoutEffect(() => {
    props.navigation.setOptions({
      headerTitle: selectedMeal ? selectedMeal.title : "Meal Detail",
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={HeaderButton}>
          <Item
            title="Favorite"
            iconName={currentMealIsFavorite ? "ios-star" : "ios-star-outline"}
            onPress={() => {
              if (currentMealIsFavorite) {
                removeFavorite(mealId);
              } else {
                addFavorite(mealId);
              }
            }}
          />
        </HeaderButtons>
      ),
    });
  }, [props.navigation, selectedMeal, currentMealIsFavorite]);

  if (!selectedMeal) {
    return <View style={styles.screen}><Text>Meal not found</Text></View>;
  }

  return (
    <ScrollView style={styles.screen}>
      <Image source={{ uri: selectedMeal.imageUrl }} style={styles.image} />
      <View style={styles.details}>
        <Text style={styles.detailItem}>{selectedMeal.duration}m</Text>
        <Text style={styles.detailItem}>
          {selectedMeal.complexity.toUpperCase()}
        </Text>
        <Text style={styles.detailItem}>
          {selectedMeal.affordability.toUpperCase()}
        </Text>
      </View>
      <Text style={styles.title}>Ingredients</Text>
      {selectedMeal.ingredients.map((ingredient) => (
        <ListItem key={ingredient}>{ingredient}</ListItem>
      ))}
      <Text style={styles.title}>Steps</Text>
      {selectedMeal.steps.map((step) => (
        <ListItem key={step}>{step}</ListItem>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.backgroundColor,
  },
  image: {
    width: "100%",
    height: 200,
  },
  details: {
    flexDirection: "row",
    padding: 15,
    justifyContent: "space-around",
    backgroundColor: Colors.white,
    elevation: 4,
    shadowColor: Colors.black,
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
  },
  detailItem: {
    fontFamily: "open-sans",
    fontSize: 14,
    color: Colors.lightTextColor,
  },
  title: {
    fontFamily: "open-sans-bold",
    fontSize: 22,
    textAlign: "center",
    color: Colors.textColor,
    marginVertical: 20,
  },
  listItem: {
    marginVertical: 10,
    marginHorizontal: 20,
    borderColor: Colors.gray,
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    backgroundColor: Colors.white,
  },
  listItemText: {
    fontFamily: "open-sans",
    color: Colors.textColor,
  },
});

export default MealDetailScreen;
