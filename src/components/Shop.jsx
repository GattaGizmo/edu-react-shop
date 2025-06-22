import { useState, useEffect } from 'react';
import { API_KEY } from '../config';

import { Preloader } from './Preloader';
import { GoodsList } from './GoodsList';
import { Cart } from './Cart';
import { BasketList } from './BasketList';
import { Alert } from './Alert';
import { GameModal } from './GameModal'; // подключаем модалку игры

function Shop() {
  const [goods, setGoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [order, setOrder] = useState([]);
  const [isBasketShow, setBasketSow] = useState(false);
  const [alertName, setAlertName] = useState('');

  const [genres, setGenres] = useState([]);
  const [platforms, setPlatforms] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState('');
  const [selectedPlatform, setSelectedPlatform] = useState('');
  const [selectedRating, setSelectedRating] = useState('');

  const [selectedGame, setSelectedGame] = useState(null); // стейт для выбранной игры

  // Добавить в корзину
  const addToBasket = item => {
    const itemIndex = order.findIndex(orderItem => orderItem.id === item.id);

    if (itemIndex < 0) {
      const newItem = {
        ...item,
        quantity: 1,
      };
      setOrder([...order, newItem]);
    } else {
      const newOrder = order.map((orderItem, index) => {
        if (index === itemIndex) {
          return {
            ...orderItem,
            quantity: orderItem.quantity + 1,
          };
        } else {
          return orderItem;
        }
      });

      setOrder(newOrder);
    }
    setAlertName(item.name);
  };

  // Удалить из корзины
  const removeFromBasket = itemId => {
    const newOrder = order.filter(el => el.id !== itemId);
    setOrder(newOrder);
  };

  const incQuantity = itemId => {
    const newOrder = order.map(el => {
      if (el.id === itemId) {
        return { ...el, quantity: el.quantity + 1 };
      } else {
        return el;
      }
    });
    setOrder(newOrder);
  };

  const decQuantity = itemId => {
    const newOrder = order.map(el => {
      if (el.id === itemId) {
        const newQuantity = el.quantity - 1;
        return { ...el, quantity: newQuantity >= 0 ? newQuantity : 0 };
      } else {
        return el;
      }
    });
    setOrder(newOrder);
  };

  const handleBasketShow = () => {
    setBasketSow(!isBasketShow);
  };

  const closeAlert = () => {
    setAlertName('');
  };

  // Открыть карточку игры
  const handleCardClick = (gameId) => {
    fetch(`https://api.rawg.io/api/games/${gameId}?key=${API_KEY}`)
      .then(response => response.json())
      .then(data => {
        setSelectedGame(data);
      })
      .catch(error => console.error('Ошибка при загрузке игры:', error));
  };

  // Загрузка жанров и платформ
  useEffect(() => {
    const fetchFilters = async () => {
      try {
        const [genresRes, platformsRes] = await Promise.all([
          fetch(`https://api.rawg.io/api/genres?key=${API_KEY}`),
          fetch(`https://api.rawg.io/api/platforms?key=${API_KEY}`)
        ]);

        const genresData = await genresRes.json();
        const platformsData = await platformsRes.json();

        setGenres(genresData.results);
        setPlatforms(platformsData.results);
      } catch (err) {
        console.error('Ошибка при загрузке фильтров:', err);
      }
    };

    fetchFilters();
  }, []);

  // Загрузка списка игр
  useEffect(() => {
    setLoading(true);

    let url = `https://api.rawg.io/api/games?key=${API_KEY}&page_size=12`;

    if (selectedGenre) url += `&genres=${selectedGenre}`;
    if (selectedPlatform) url += `&platforms=${selectedPlatform}`;
    if (selectedRating) url += `&ordering=${selectedRating}`;

    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error(`Ошибка: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        let updatedGoods = data.results.map(game => ({
          ...game,
          price: 500 + (game.id * 17) % 2500
        }));

        // Локальная сортировка по цене
        if (selectedRating === 'price-asc') {
          updatedGoods.sort((a, b) => a.price - b.price);
        } else if (selectedRating === 'price-desc') {
          updatedGoods.sort((a, b) => b.price - a.price);
        }

        setGoods(updatedGoods);
      })
      .catch(error => {
        console.error('Ошибка при получении данных:', error.message);
      })
      .finally(() => setLoading(false));
  }, [selectedGenre, selectedPlatform, selectedRating]);

  return (
    <main className="container content">
      <Cart quantity={order.length} handleBasketShow={handleBasketShow} />

      {/* Фильтры */}
      <div className="row">
        <div className="col s12">
          <div className="filters-card">
            <div className="card-content">
              <span className="card-title">Фильтры игр</span>

              <div className="row filters">
                {/* Жанр */}
                <div className="col s12 m4">
                  <p className="filter-label">Жанр</p>
                  <select
                    className="browser-default custom-select"
                    id="genre-select"
                    value={selectedGenre}
                    onChange={e => setSelectedGenre(e.target.value)}
                  >
                    <option value="">Все жанры</option>
                    {genres.map(g => (
                      <option key={g.id} value={g.slug}>
                        {g.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Платформа */}
                <div className="col s12 m4">
                  <p className="filter-label">Платформа</p>
                  <select
                    className="browser-default custom-select"
                    id="platform-select"
                    value={selectedPlatform}
                    onChange={e => setSelectedPlatform(e.target.value)}
                  >
                    <option value="">Все платформы</option>
                    {platforms.map(p => (
                      <option key={p.id} value={p.id}>
                        {p.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Сортировка */}
                <div className="col s12 m4">
                  <p className="filter-label">Сортировка</p>
                  <select
                    className="browser-default custom-select"
                    id="rating-select"
                    value={selectedRating}
                    onChange={e => setSelectedRating(e.target.value)}
                  >
                    <option value="">Без сортировки</option>
                    <option value="-rating">По рейтингу (по убыв.)</option>
                    <option value="rating">По рейтингу (по возр.)</option>
                    <option value="-released">По дате выхода</option>
                    <option value="price-asc">По цене (дешевле → дороже)</option>
                    <option value="price-desc">По цене (дороже → дешевле)</option>
                  </select>
                </div>
              </div>

              {/* Сброс фильтров */}
              <div className="row center-align">
                <button
                  className="filters-reset-btn"
                  onClick={() => {
                    setSelectedGenre('');
                    setSelectedPlatform('');
                    setSelectedRating('');
                  }}
                >
                  Сбросить фильтры
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Список игр */}
      {loading ? (
        <Preloader />
      ) : (
        <GoodsList goods={goods} addToBasket={addToBasket} onCardClick={handleCardClick} />
      )}

      {/* Корзина */}
      {isBasketShow && (
        <BasketList
          order={order}
          handleBasketShow={handleBasketShow}
          removeFromBasket={removeFromBasket}
          incQuantity={incQuantity}
          decQuantity={decQuantity}
        />
      )}

      {/* Уведомление */}
      {alertName && <Alert name={alertName} closeAlert={closeAlert} />}

      {/* Модалка игры */}
      {selectedGame && <GameModal game={selectedGame} onClose={() => setSelectedGame(null)} />}
    </main>
  );
}

export { Shop };
