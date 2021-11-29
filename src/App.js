import React from 'react';
import axios from 'axios';
import { Route, Routes } from 'react-router-dom';

import Header from './components/Header';
import Drawer from './components/Drawer';
import Home from './pages/Home';
import Favorites from './pages/Favorites';
function App() {
  const [items, setItems] = React.useState([]);
  const [cartItems, setCartItems] = React.useState([]);
  const [favorites, setFavorites] = React.useState([]);
  const [searchValue, setSearchValue] = React.useState('');
  const [cartOpened, setCartOpened] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);
  React.useEffect(() => {
    async function fetchData() {
      const cartResponse = await axios.get('https://6194fe6d74c1bd00176c6ab0.mockapi.io/cart');
      const favoritesResponse = await axios.get(
        'https://6194fe6d74c1bd00176c6ab0.mockapi.io/favorites',
      );
      const itemsResponse = await axios.get('https://6194fe6d74c1bd00176c6ab0.mockapi.io/items');

      setIsLoading(false);

      setCartItems(cartResponse.data);
      setFavorites(favoritesResponse.data);
      setItems(itemsResponse.data);
    }
    fetchData();
  }, []);

  const onAddToCart = (obj) => {
    console.log(obj);
    if (cartItems.find((item) => Number(item.id) === Number(obj.id))) {
      axios.delete(`https://6194fe6d74c1bd00176c6ab0.mockapi.io/cart/${obj.id}`);
      setCartItems((prev) => prev.filter((item) => item.id !== obj.id));
    } else {
      axios.post('https://6194fe6d74c1bd00176c6ab0.mockapi.io/cart', obj);
      setCartItems((prev) => [...prev, obj]);
    }
  };
  const onRemoveItem = (id) => {
    axios.delete(`https://6194fe6d74c1bd00176c6ab0.mockapi.io/cart/${id}`);
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };
  const onAddToFavorite = async (obj) => {
    try {
      if (favorites.find((favObj) => favObj.id === obj.id)) {
        axios.delete(`https://6194fe6d74c1bd00176c6ab0.mockapi.io/favorites/${obj.id}`);
      } else {
        const { data } = await axios.post(
          'https://6194fe6d74c1bd00176c6ab0.mockapi.io/favorites',
          obj,
        );
        setFavorites((prev) => [...prev, data]);
      }
      if (favorites.find((favObj) => favObj.id === obj.id)) {
        axios.delete(`https://6194fe6d74c1bd00176c6ab0.mockapi.io/favorites/${obj.id}`);
      } else {
        const { data } = await axios.post(
          'https://6194fe6d74c1bd00176c6ab0.mockapi.io/favorites',
          obj,
        );
        setFavorites((prev) => [...prev, data]);
      }
    } catch (error) {
      alert('Не удалось добавить в фавориты');
    }
  };
  const onChangeSearchInput = (event) => {
    console.log(event.target.value);
    setSearchValue(event.target.value);
  };
  return (
    <div className="wrapper clear">
      {cartOpened && (
        <Drawer items={cartItems} onRemove={onRemoveItem} onClose={() => setCartOpened(false)} />
      )}

      <Header onClickCart={() => setCartOpened(true)} />
      <Routes>
        <Route
          path="/"
          element={
            <Home
              items={items}
              cartItems={cartItems}
              searchValue={searchValue}
              setSearchValue={setSearchValue}
              onChangeSearchInput={onChangeSearchInput}
              onAddToFavorite={onAddToFavorite}
              onAddToCart={onAddToCart}
              isLoading={isLoading}
            />
          }
          exact
        />

        <Route
          path="/favorites"
          element={<Favorites items={favorites} onAddToFavorite={onAddToFavorite} />}
          exact
        />
      </Routes>
    </div>
  );
}

export default App;
