// screens/SettingsScreen.tsx
import React from "react";
import { View, Text, Switch, StyleSheet } from "react-native";
import { useTheme } from "../contexts/theme-context";

const SettingsScreen: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Dark Mode</Text>
      <Switch
        value={theme === "dark"}
        onValueChange={toggleTheme}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: '#f5f5f5',
  },
  text: {
    fontSize: 18,
    marginBottom: 10,
    fontFamily: "open-sans-bold",
  },
});

export default SettingsScreen;
