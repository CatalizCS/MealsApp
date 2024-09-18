import React from 'react';
import { FlatList } from 'react-native';
import { CATEGORIES } from '../data/dummy-data';
import CategoryGridTile from '../components/CategoryGridTile';

interface Category {
    id: string;
    title: string;
    color: string;
    imageUrl: string;
}

interface CategoriesScreenProps {
    navigation: {
        navigate: (screen: string, params: { categoryId: string }) => void;
    };
}

const CategoriesScreen: React.FC<CategoriesScreenProps> = (props) => {
    const renderGridItem = (itemData: { item: Category }) => {
        return (
            <CategoryGridTile
                title={itemData.item.title}
                color={itemData.item.color}
                imageUrl={itemData.item.imageUrl}
                onSelect={() => {
                    props.navigation.navigate('CategoryMeals', {
                        categoryId: itemData.item.id
                    });
                }}
            />
        );
    };

    return (
        <FlatList
            keyExtractor={(item) => item.id}
            data={CATEGORIES}
            renderItem={renderGridItem}
            numColumns={2}
        />
    );
};

export default CategoriesScreen;