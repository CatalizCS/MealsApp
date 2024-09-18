import React, { useState, useLayoutEffect, useCallback } from "react";
import { View, Text, StyleSheet, Switch, Platform } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../components/HeaderButton";
import Colors from "@/constants/Colors";
import { NavigationProp } from "@react-navigation/native";

interface FilterSwitchProps {
  label: string;
  state: boolean;
  onChange: (newValue: boolean) => void;
}

const FilterSwitch: React.FC<FilterSwitchProps> = ({
  label,
  state,
  onChange,
}) => {
  return (
    <View style={styles.filterContainer}>
      <Text style={styles.label}>{label}</Text>
      <Switch
        trackColor={{ true: Colors.primaryColor }}
        thumbColor={Colors.accentColor}
        value={state}
        onValueChange={onChange}
      />
    </View>
  );
};

interface FiltersScreenProps {
  navigation: NavigationProp<any>;
}

interface AppliedFilters {
  glutenFree: boolean;
  lactoseFree: boolean;
  vegan: boolean;
  vegetarian: boolean;
}

const FiltersScreen: React.FC<FiltersScreenProps> = ({ navigation }) => {
  const [isGlutenFree, setIsGlutenFree] = useState<boolean>(false);
  const [isLactoseFree, setIsLactoseFree] = useState<boolean>(false);
  const [isVegan, setIsVegan] = useState<boolean>(false);
  const [isVegetarian, setIsVegetarian] = useState<boolean>(false);

  const saveFilters = useCallback(() => {
    const appliedFilters: AppliedFilters = {
      glutenFree: isGlutenFree,
      lactoseFree: isLactoseFree,
      vegan: isVegan,
      vegetarian: isVegetarian,
    };

    console.log(appliedFilters);
  }, [isGlutenFree, isLactoseFree, isVegan, isVegetarian]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={HeaderButton}>
          <Item title="Save" iconName="ios-save" onPress={saveFilters} />
        </HeaderButtons>
      ),
    });
  }, [navigation, saveFilters]);

  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Available Filters / Restrictions</Text>
      <FilterSwitch
        label="Gluten-free"
        state={isGlutenFree}
        onChange={setIsGlutenFree}
      />
      <FilterSwitch
        label="Lactose-free"
        state={isLactoseFree}
        onChange={setIsLactoseFree}
      />
      <FilterSwitch label="Vegan" state={isVegan} onChange={setIsVegan} />
      <FilterSwitch
        label="Vegetarian"
        state={isVegetarian}
        onChange={setIsVegetarian}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? 30 : 0,
    alignItems: "center",
    backgroundColor: Colors.backgroundColor,
  },
  title: {
    fontFamily: "open-sans-bold",
    fontSize: 22,
    marginVertical: 20,
    textAlign: "center",
    color: Colors.textColor,
  },
  filterContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "90%",
    marginVertical: 10,
    backgroundColor: Colors.white,
    padding: 12,
    borderRadius: 10,
    elevation: 3,
    shadowColor: Colors.black,
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
  },
  label: {
    fontFamily: "open-sans",
    fontSize: 16,
    color: Colors.textColor,
  },
});

export default FiltersScreen;
