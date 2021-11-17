import React from 'react';
import styles from './Card.module.scss';
function Card({ title, price, imageUrl, onFavorite, onPlus }) {
  const [isAdded, setIsAdded] = React.useState(false);
  const onClickPlus = () => {
    onPlus({ title, price, imageUrl });
    setIsAdded(!isAdded);
  };
  return (
    <div className={styles.card}>
      <div className={styles.favorite}>
        <img onClick={onFavorite} src="/img/unwish.svg" alt="unwish" />
      </div>
      <img width={133} height={112} src={imageUrl} alt="sneakers" />
      <h5>{title}</h5>
      <div className="d-flex justify-between align-center">
        <div class="d-flex flex-column">
          <span>Цена:</span>
          <b>{price} руб.</b>
        </div>
        <img
          className={styles.plus}
          onClick={onClickPlus}
          src={isAdded ? '/img/btnchoose.svg' : '/img/btnplus.svg'}
          alt="plus"
        />
      </div>
    </div>
  );
}

export default Card;
