import React, { createContext, useState } from 'react';

export const FavoritesContext = createContext({
  ids: [],
  addFavourite: (id) => {},
  removeFavorite: (id) => {},
});

function FavoritesContextProvider({ children }) {
  const [favoriteMealIds, setFavoriteMealIds] = useState([]);

  function addFavourite(id) {
    setFavoriteMealIds((currentFavIds) => [...currentFavIds, id]);
  }

  function removeFavorite(id) {
    setFavoriteMealIds((currentFavIds) => currentFavIds.filter((mealId) => mealId !== id));
  }

  const value = {
    ids: favoriteMealIds,
    addFavourite,
    removeFavorite,
  };

  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>;
}

export default FavoritesContextProvider;
