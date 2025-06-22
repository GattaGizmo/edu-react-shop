function GoodsItem({ id, name, background_image, rating, price, addToBasket, onCardClick }) {
  return (
    <div className="card" onClick={() => onCardClick(id)} style={{ cursor: 'pointer' }}>
      <div className="card-image">
        <img src={background_image} alt={name} />
      </div>
      <div className="card-content">
        <span className="card-title">{name}</span>
        <p>Рейтинг: {rating}</p>
        <p>Цена: {price} руб.</p>
      </div>
      <div className="card-action">
        <button
          className="btn"
          onClick={(e) => {
            e.stopPropagation(); // Не даём клику на кнопку открыть модалку
            addToBasket({ id, name, background_image, price });
          }}
        >
          Купить
        </button>
      </div>
    </div>
  );
}

export default GoodsItem;
