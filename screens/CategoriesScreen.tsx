import React from "react";
import {
  FlatList,
  StyleSheet,
  SafeAreaView,
  Platform,
  StatusBar,
} from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { CATEGORIES } from "../data/dummy-data";
import CategoryGridTile from "../components/CategoryGridTile";

type RootStackParamList = {
  Categories: undefined;
  CategoryMeals: { categoryId: string };
  MealDetail: { mealId: string };
};

type CategoriesScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Categories"
>;

interface Category {
  id: string;
  title: string;
  color: string;
  imageUrl: string;
}

interface CategoriesScreenProps {
  navigation: CategoriesScreenNavigationProp;
}

const CategoriesScreen: React.FC<CategoriesScreenProps> = ({ navigation }) => {
  const renderGridItem = ({ item }: { item: Category }) => {
    return (
      <CategoryGridTile
        title={item.title}
        color={item.color}
        imageUrl={item.imageUrl}
        onSelect={() => {
          navigation.navigate("CategoryMeals", {
            categoryId: item.id,
          });
        }}
      />
    );
  };

  return (
    <SafeAreaView style={styles.screen}>
      <FlatList
        keyExtractor={(item) => item.id}
        data={CATEGORIES}
        renderItem={renderGridItem}
        numColumns={2}
        contentContainerStyle={styles.listContainer}
        columnWrapperStyle={styles.columnWrapper}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    backgroundColor: "#f5f5f5",
  },
  listContainer: {
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  columnWrapper: {
    justifyContent: "space-between",
    marginBottom: 15,
  },
});

export default CategoriesScreen;
