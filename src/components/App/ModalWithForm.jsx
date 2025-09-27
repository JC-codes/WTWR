import { useEffect } from "react";
import "../../blocks/ModalWithForm.css";
import closeIcon from "../../images/close-gray.svg";
import addGarment from "../../images/addGarment.svg";

function ModalWithForm({ children, title, name, isOpen, handleCloseClick }) {
  return (
    <div className={`modal modaltype${name} ${isOpen ? "modal_opened" : ""}`}>
      <div className="modal__container">
        <h2 className="modal__title">{title}</h2>
        <button
          type="button"
          className="modal__close"
          onClick={handleCloseClick}
        >
          <img src={closeIcon} alt="Close" className="modal__close-icon" />
        </button>
        <form className="modal__form">
          {children}
          <button type="submit" className="modal__submit">
            <img src={addGarment} alt="addGarment" />
          </button>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
