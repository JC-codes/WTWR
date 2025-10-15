import React from "react";
import "../../blocks/DeleteConfirmModal.css";
import closeIcon from "../../images/close-gray.svg";

function DeleteConfirmModal({ isOpen, onClose, onConfirm }) {
  if (!isOpen) return null;

  const handleConfirm = () => {
    if (typeof onConfirm === "function") onConfirm();
    if (typeof onClose === "function") onClose();
  };

  return (
    <div className="delete-confirm__overlay delete-confirm__overlay_opened">
      <div className="delete-confirm__container">
        <button
          type="button"
          className="delete-confirm__close"
          onClick={onClose}
          aria-label="Close"
        >
          <img src={closeIcon} alt="Close" />
        </button>
        <p className="delete-confirm__message">
          Are you sure you want to delete this item? This action is
          irreversible.
        </p>

        <div className="delete-confirm__actions">
          <button
            type="button"
            className="delete-confirm__cancel"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            type="button"
            className="delete-confirm__confirm"
            onClick={handleConfirm}
          >
            Yes, delete item
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteConfirmModal;
