import React from 'react';
import Info from './info';
import AppContext from '../context';
import axios from 'axios';
const delay = (ms) => {
  new Promise((resolve) => setTimeout(resolve, ms));
};
function Drawer({ onClose, onRemove, items = [] }) {
  const { cartItems, setCartItems } = React.useContext(AppContext);
  const [orderId, setorderId] = React.useState(null);
  const [isOrderComplete, setisOrderComplete] = React.useState(false);
  const [isLoading, setisLoading] = React.useState(false);
  const onClickOrder = async () => {
    try {
      setisLoading(true);
      const { data } = await axios.post('https://6194fe6d74c1bd00176c6ab0.mockapi.io/orders', {
        items: cartItems,
      });

      setorderId(data.id);
      setisOrderComplete(true);
      setCartItems([]);
      for (let i = 0; i < cartItems.length; i++) {
        const item = cartItems[i];
        await axios.delete('https://6194fe6d74c1bd00176c6ab0.mockapi.io/cart/' + item.id);
        await delay(1000);
      }
    } catch (error) {
      alert('Не удалось создать заказ :(');
    }
    setisLoading(false);
  };
  return (
    <div className="overlay">
      <div className="drawer d-flex flex-column">
        <h2 className="mb-30 d-flex justify-between ">
          Корзина
          <img onClick={onClose} className="removeBtn cu-p" src="/img/btnremove.svg" alt="Remove" />
        </h2>

        {items.length > 0 ? (
          <div className="d-flex flex-column flex">
            <div className="items  flex-1">
              {items.map((obj) => (
                <div key={obj.id} className="cartItem d-flex align-center mb-20">
                  <div
                    style={{ backgroundImage: `url(${obj.imageUrl})` }}
                    className="cartItemImg"></div>
                  <div className="mr-20 flex">
                    <p className="mb-5">{obj.title}</p>
                    <b>{obj.price} руб.</b>
                  </div>
                  <img
                    onClick={() => {
                      onRemove(obj.id);
                    }}
                    className="removeBtn"
                    src="/img/btnremove.svg"
                    alt="Remove"
                  />
                </div>
              ))}
            </div>
            <div className="cartTotalBlock">
              <ul>
                <li>
                  <span>Итого: </span>
                  <div></div>
                  <b>21 498 руб. </b>
                </li>
                <li>
                  <span>Налог 5%: </span>
                  <div></div>
                  <b>1074 руб. </b>
                </li>
              </ul>
              <button disabled={isLoading} onClick={onClickOrder} className="greenButton">
                Оформить заказ <img src="/img/arrow.svg" alt="arrow" />
              </button>
            </div>{' '}
          </div>
        ) : (
          <Info
            title={isOrderComplete ? 'Заказ оформлен!' : 'Корзина пустая'}
            image={isOrderComplete ? '/img/complete-order.jpg' : '/img/empty-cart.jpg'}
            description={
              isOrderComplete
                ? `Ваш заказ #${orderId} скоро будет передан курьерской доставке`
                : 'Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ.'
            }
          />
        )}
      </div>
    </div>
  );
}

export default Drawer;
