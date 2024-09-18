import React, { useState, useCallback } from "react";
import { View, Text, StyleSheet, TextInput, FlatList } from "react-native";
import { MEALS } from "../data/dummy-data";
import MealItem from "../components/MealItem";

import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";
import Colors from "@/constants/Colors";

interface Meal {
  id: string;
  title: string;
  imageUrl: string;
  duration: number;
  complexity: string;
  affordability: string;
}

interface SearchScreenProps {
  navigation: StackNavigationProp<any, any>;
  route: RouteProp<any, any>;
}

const SearchScreen: React.FC<SearchScreenProps> = ({ navigation }) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filteredMeals, setFilteredMeals] = useState<Meal[]>([]);

  // Callback function to handle search
  const searchMeals = useCallback((text: string) => {
    setSearchTerm(text);
    const filtered = MEALS.filter((meal) =>
      meal.title.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredMeals(filtered);
  }, []);

  // Function to render each meal item
  const renderMealItem = ({ item }: { item: Meal }) => (
    <MealItem
      title={item.title}
      image={item.imageUrl}
      duration={item.duration}
      complexity={item.complexity}
      affordability={item.affordability}
      onSelectMeal={() => {
        navigation.navigate("MealDetail", {
          mealId: item.id,
        });
      }}
    />
  );

  return (
    <View style={styles.screen}>
      <TextInput
        style={styles.input}
        placeholder="Search for meals..."
        placeholderTextColor={Colors.lightTextColor}
        value={searchTerm}
        onChangeText={searchMeals}
      />
      <FlatList
        data={filteredMeals}
        keyExtractor={(item) => item.id}
        renderItem={renderMealItem}
        style={{ width: "100%" }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: "center",
    backgroundColor: Colors.backgroundColor,
  },
  input: {
    width: "100%",
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: Colors.gray,
    borderRadius: 5,
    backgroundColor: Colors.white,
    color: Colors.textColor,
    fontFamily: "open-sans",
  },
});

export default SearchScreen;
