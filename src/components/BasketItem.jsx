function BasketItem(props) {
  const {
    id,
    name,
    price,
    quantity,
    removeFromBasket = Function.prototype,
    incQuantity = Function.prototype,
    decQuantity = Function.prototype,
  } = props;

  return (
    <li className="basket-item">
      <span className="basket-item-name">{name}</span>

      <div className="basket-item-controls">
        <i className="material-icons basket-quantity" onClick={() => decQuantity(id)}>remove</i>
        <span>x{quantity}</span>
        <i className="material-icons basket-quantity" onClick={() => incQuantity(id)}>add</i>
        <span>= {price * quantity} руб.</span>
        <i className="material-icons basket-delete" onClick={() => removeFromBasket(id)}>close</i>
      </div>
    </li>
  );
}

export { BasketItem };
