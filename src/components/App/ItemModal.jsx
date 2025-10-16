import { useState } from "react";
import "../../blocks/ItemModal.css";
import closeIcon from "../../images/close-white.svg";
import DeleteConfirmModal from "./DeleteConfirmModal.jsx";
import deleteIcon from "../../images/itemDelete.svg";

function ItemModal({ activeModal, card, handleCloseClick, handleDelete }) {
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
          <div className="item__modal__info">
            <h2 className="item__modal__image-title">{card.name}</h2>
            <p className="item__modal__weather">Weather: {card.weather}</p>
          </div>
          <button
            type="button"
            className="item__modal__delete-btn"
            onClick={() => setIsConfirmOpen(true)}
          >
            <img src={deleteIcon} alt="Delete" />
          </button>
        </div>
      </div>
      <DeleteConfirmModal
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={() => {
          handleDelete(card._id)
            .then(() => {
              setIsConfirmOpen(false);
              handleCloseClick();
            })
            .catch((error) => console.error(error));
        }}
      />
    </div>
  );
}

export default ItemModal;
