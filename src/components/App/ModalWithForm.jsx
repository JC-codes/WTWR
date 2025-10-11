import "../../blocks/ModalWithForm.css";
import closeIcon from "../../images/close-gray.svg";
import addGarment from "../../images/addGarment.svg";

function ModalWithForm({
  children,
  title,
  name,
  isOpen,
  onClose,
  onSubmit,
  isSubmitDisabled,
}) {
  return (
    <div className={`modal modaltype${name} ${isOpen ? "modal_opened" : ""}`}>
      <div className="modal__container">
        <h2 className="modal__title">{title}</h2>
        <button type="button" className="modal__close" onClick={onClose}>
          <img src={closeIcon} alt="Close" className="modal__close-icon" />
        </button>
        <form className="modal__form" onSubmit={onSubmit}>
          {children}
          <button
            type="submit"
            className="modal__submit"
            disabled={isSubmitDisabled}
          >
            <img
              src={addGarment}
              alt="Add Garment"
              className="modal__submit-icon"
            />{" "}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
