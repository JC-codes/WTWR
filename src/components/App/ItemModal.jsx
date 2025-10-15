import { useState } from "react";
import "../../blocks/ItemModal.css";
import closeIcon from "../../images/close-white.svg";

function ItemModal({ activeModal, card, handleCloseClick }) {
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  return (
    <div
      className={`item__modal ${
        activeModal === "preview" ? "item__modal__opened" : ""
      }`}
    >
      <div className="item__modal__container item__modal__container_type_image">
        <button
          type="button"
          className="item__modal__close"
          onClick={handleCloseClick}
        >
          <img
            src={closeIcon}
            alt="Close"
            className="item__modal__close-icon"
          />
        </button>
        <img
          src={card.imageUrl}
          alt={card.name}
          className="item__modal__image"
        />
        <div className="item__modal__footer">
          <h2 className="item__modal__image-title">{card.name}</h2>
          <p className="item__modal__weather">Weather: {card.weather}</p>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
