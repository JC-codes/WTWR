import "../../blocks/ItemModal.css";
import closeIcon from "../../images/close-white.svg";

function ItemModal({ activeModal, card, handleCloseClick }) {
  return (
    <div className={`modal ${activeModal === "preview" && "modal_opened"}`}>
      <div className="modal__container modal__container_type_image">
        <button
          type="button"
          className="modal__close"
          onClick={handleCloseClick}
        >
          <img src={closeIcon} alt="Close" className="modal__close-icon" />
        </button>
        <img src={card.link} alt={card.name} className="modal__image" />
        <div className="modal__footer">
          <h2 className="modal__image-title">{card.name}</h2>
          <p className="modal__weather">Weather: {card.weather}</p>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
