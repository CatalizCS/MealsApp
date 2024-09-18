import React from "react";
import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  ImageBackground,
} from "react-native";

interface CategoryGridTileProps {
  onSelect: () => void;
  color: string;
  imageUrl: string;
  title: string;
}

const CategoryGridTile: React.FC<CategoryGridTileProps> = ({
  onSelect,
  color,
  imageUrl,
  title,
}) => {
  return (
    <View style={styles.gridItem}>
      <TouchableOpacity style={{ flex: 1 }} onPress={onSelect} activeOpacity={0.8}>
        <ImageBackground source={{ uri: imageUrl }} style={styles.bgImage}>
          <View style={[styles.container, { backgroundColor: color + "cc" }]}>
            <Text style={styles.title} numberOfLines={2}>
              {title}
            </Text>
          </View>
        </ImageBackground>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  gridItem: {
    flex: 1,
    margin: 12,
    height: 180,  // Tăng chiều cao để hình ảnh bắt mắt hơn
    borderRadius: 15,  // Bo tròn các góc mềm mại
    overflow: "hidden",
    elevation: 6,
    shadowColor: "black",
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 12,  // Tăng độ mờ của bóng
  },
  bgImage: {
    width: "100%",
    height: "100%",
    justifyContent: "flex-end",
  },
  container: {
    paddingVertical: 12,
    paddingHorizontal: 14,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontFamily: "open-sans-bold",
    fontSize: 20,  // Tăng kích thước chữ để tiêu đề nổi bật hơn
    textAlign: "center",  // Căn giữa tiêu đề
    color: "white",
    shadowColor: "black",
    shadowOpacity: 0.7,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 5,
  },
});

export default CategoryGridTile;
