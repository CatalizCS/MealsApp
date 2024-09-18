import React, { createContext, useState } from "react";

interface MealsContextType {
  favoriteMeals: string[];
  addFavorite: (mealId: string) => void;
  removeFavorite: (mealId: string) => void;
  isFavorite: (mealId: string) => boolean;
}

export const MealsContext = createContext<MealsContextType>({
  favoriteMeals: [],
  addFavorite: (mealId: string) => {},
  removeFavorite: (mealId: string) => {},
  isFavorite: (mealId: string) => false,
});

import { ReactNode } from "react";

interface MealsProviderProps {
  children: ReactNode;
}

export const MealsProvider = ({ children }: MealsProviderProps) => {
  const [favoriteMeals, setFavoriteMeals] = useState<string[]>([]);

  const addFavorite = (mealId: string) => {
    setFavoriteMeals((currentFavs: string[]) => [...currentFavs, mealId]);
  };

  const removeFavorite = (mealId: string) => {
    setFavoriteMeals((currentFavs: string[]) =>
      currentFavs.filter((id: string) => id !== mealId)
    );
  };

  const isFavorite = (mealId: string): boolean => {
    return favoriteMeals.includes(mealId);
  };

  return (
    <MealsContext.Provider
      value={{
        favoriteMeals,
        addFavorite,
        removeFavorite,
        isFavorite,
      }}
    >
      {children}
    </MealsContext.Provider>
  );
};
