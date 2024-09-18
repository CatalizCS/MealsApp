import React, { useLayoutEffect, useCallback } from "react";
import { View, FlatList, StyleSheet, Text } from "react-native";
import { CATEGORIES, MEALS } from "../data/dummy-data";
import MealItem from "@/components/MealItem";
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';

interface CategoryMealScreenProps {
  navigation: StackNavigationProp<any, any>;
  route: RouteProp<{ params: { categoryId: string } }, 'params'>;
}

interface MealItemProps {
  id: string;
  title: string;
  imageUrl: string;
  duration: number;
  complexity: string;
  affordability: string;
  categoryIds: string[];
}

const CategoryMealScreen: React.FC<CategoryMealScreenProps> = (props) => {
  const catId = props.route.params.categoryId;

  const displayedMeals = MEALS.filter(
    (meal: MealItemProps) => meal.categoryIds.indexOf(catId) >= 0
  );

  useLayoutEffect(() => {
    const selectedCategory = CATEGORIES.find((cat) => cat.id === catId);
    props.navigation.setOptions({
      title: selectedCategory?.title,
    });
  }, [catId, props.navigation]);

  const renderMealItem = useCallback(
    (itemData: { item: MealItemProps }) => (
      <MealItem
        title={itemData.item.title}
        image={itemData.item.imageUrl}
        duration={itemData.item.duration}
        complexity={itemData.item.complexity}
        affordability={itemData.item.affordability}
        onSelectMeal={() => {
          props.navigation.navigate("MealDetail", {
            mealId: itemData.item.id,
          });
        }}
      />
    ),
    [props.navigation]
  );

  return (
    <View style={styles.screen}>
      <FlatList
        data={displayedMeals}
        keyExtractor={(item) => item.id}
        renderItem={renderMealItem}
        style={{ width: "100%" }}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={() => (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No meals found in this category.</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 15,
    backgroundColor: '#f5f5f5',
  },
  listContainer: {
    paddingBottom: 20,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 18,
    fontFamily: "open-sans-bold",
    color: '#888',
  },
});

export default CategoryMealScreen;
