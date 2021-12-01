import React from 'react';
import AppContext from '../context';
import Card from '../components/Card/';
function Favorites({ items, onAddToFavorite }) {
  const { favorites } = React.useContext(AppContext);

  return (
    <div>
      <div className="content p-40">
        <div className="d-flex align-center mb-40 justify-between">
          <h1>Мои закладки</h1>
        </div>
        <div className="d-flex flex-wrap">
          {favorites.map((item, index) => (
            <Card key={index} favorited={true} onFavorite={onAddToFavorite} {...item} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Favorites;
