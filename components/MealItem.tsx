import React, { useRef } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground, Animated } from "react-native";
import Colors from "@/constants/Colors";

interface MealItemProps {
  onSelectMeal: () => void;
  image: string;
  title: string;
  duration: number;
  complexity: string;
  affordability: string;
}

const MealItem: React.FC<MealItemProps> = (props) => {
  const scaleValue = useRef(new Animated.Value(1)).current;
  const opacityValue = useRef(new Animated.Value(1)).current;

  const onPressIn = () => {
    Animated.parallel([
      Animated.spring(scaleValue, {
        toValue: 0.95,
        useNativeDriver: true,
      }),
      Animated.timing(opacityValue, {
        toValue: 0.7,
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const onPressOut = () => {
    Animated.parallel([
      Animated.spring(scaleValue, {
        toValue: 1,
        useNativeDriver: true,
      }),
      Animated.timing(opacityValue, {
        toValue: 1,
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start();
  };


  return (
    <Animated.View
      style={[
        styles.mealItem,
        {
          transform: [{ scale: scaleValue }],
          opacity: opacityValue,
        },
      ]}
    >
      <TouchableOpacity
        onPress={props.onSelectMeal}
        onPressIn={onPressIn}
        onPressOut={onPressOut}
      >
        <View>
          <View style={styles.mealHeader}>
            <ImageBackground
              source={{ uri: props.image }}
              style={styles.bgImage}
            >
              <View style={styles.titleContainer}>
                <Text style={styles.title} numberOfLines={2}>
                  {props.title}
                </Text>
              </View>
            </ImageBackground>
          </View>
          <View style={styles.mealDetail}>
            <Text style={styles.detailItem}>{props.duration}m</Text>
            <Text style={styles.detailItem}>
              {props.complexity.toUpperCase()}
            </Text>
            <Text style={styles.detailItem}>
              {props.affordability.toUpperCase()}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  mealItem: {
    height: 220,
    width: "100%",
    backgroundColor: Colors.white,
    borderRadius: 12,
    overflow: "hidden",
    marginVertical: 12,
    elevation: 5,
    shadowColor: Colors.black,
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 12,
  },
  bgImage: {
    width: "100%",
    height: "100%",
    justifyContent: "flex-end",
  },
  mealHeader: {
    height: "85%",
  },
  mealDetail: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    height: "15%",
    paddingHorizontal: 10,
    backgroundColor: Colors.white,
  },
  titleContainer: {
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  title: {
    fontFamily: "open-sans-bold",
    fontSize: 20,
    color: Colors.white,
    textAlign: "center",
  },
  detailItem: {
    fontFamily: "open-sans",
    fontSize: 16,
    color: Colors.lightTextColor,
  },
});

export default MealItem;
