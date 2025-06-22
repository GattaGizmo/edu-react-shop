import { BasketItem } from './BasketItem';

function BasketList(props) {
  const {
    order = [],
    handleBasketShow = Function.prototype,
    removeFromBasket = Function.prototype,
    incQuantity,
    decQuantity,
  } = props;

  const totalPrice = order.reduce((sum, el) => sum + el.price * el.quantity, 0);

  return (
    <div className="basket-list">
      <i className="material-icons basket-close" onClick={handleBasketShow}>
        close
      </i>
      <h5 className="basket-title">
        Корзина покупок
      </h5>

      <div className="basket-list-scroll">
        {order.length ? (
          order.map(item => (
            <BasketItem
              key={item.id}
              removeFromBasket={removeFromBasket}
              incQuantity={incQuantity}
              decQuantity={decQuantity}
              {...item}
            />
          ))
        ) : (
          <p className="center-align" style={{ color: '#3c3c4d' }}>Корзина пуста</p>
        )}
      </div>

      <ul className="basket-footer">
        <li className="collection-item active">
          Общая стоимость: {totalPrice} руб.
        </li>
        <li>
          <button className="btn btn-medium">Оформить заказ</button>
        </li>
      </ul>
    </div>
  );
}

export { BasketList };
