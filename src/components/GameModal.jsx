import { useState, useEffect } from 'react';

function GameModal({ game, onClose }) {
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === 'Escape') {
        handleClose();
      }
    };
    document.addEventListener('keydown', handleEsc);
    return () => {
      document.removeEventListener('keydown', handleEsc);
    };
  }, []);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose(); // Закроется после анимации
    }, 300); // Должно совпадать с временем анимации в CSS
  };

  if (!game) return null;

  return (
    <div className={`modal-overlay ${isClosing ? 'fade-out' : ''}`} onClick={handleClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-close-icon" onClick={handleClose}>&times;</div>

        <div className="modal-header">{game.name}</div>

        <img src={game.background_image} alt={game.name} className="modal-image" />

        <div className="modal-body">
          {game.description ? (
            <p dangerouslySetInnerHTML={{ __html: game.description }} />
          ) : (
            <p>Описание отсутствует.</p>
          )}
          <p><strong>Жанры:</strong> {game.genres.map((g) => g.name).join(', ')}</p>
          <p><strong>Рейтинг:</strong> {game.rating}</p>
        </div>

        <div className="modal-footer">
          <button className="btn modal-close-btn" onClick={handleClose}>
            ЗАКРЫТЬ
          </button>
        </div>
      </div>
    </div>
  );
}

export { GameModal };
