import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import MainNavigator from "@/navigation/MealsNavigator";
import { MealsProvider } from "@/contexts/meals-context";
import { ThemeProvider, useTheme } from "@/contexts/theme-context";
import MealsNavigator from "@/navigation/MealsNavigator";

export default function App() {
  return (
    <ThemeProvider>
      <ThemedApp />
    </ThemeProvider>
  );
}

function ThemedApp() {
  const { theme } = useTheme();

  const MyTheme = {
    dark: theme === "dark",
    colors: {
      primary: theme === "dark" ? "#1f1f1f" : "#ffffff",
      background: theme === "dark" ? "#000000" : "#ffffff",
      card: theme === "dark" ? "#1f1f1f" : "#ffffff",
      text: theme === "dark" ? "#ffffff" : "#000000",
      border: theme === "dark" ? "#1f1f1f" : "#ffffff",
      notification: theme === "dark" ? "#1f1f1f" : "#ffffff",
    },
  };

  return (
    <NavigationContainer theme={MyTheme} independent={true}>
      <MainNavigator />
    </NavigationContainer>
  );
}
