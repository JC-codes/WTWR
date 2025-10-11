import { useState } from "react";
import ModalWithForm from "./ModalWithForm.jsx";
import { useForm } from "../../hooks/useForm.js";

const AddItemModal = ({ isOpen, onAddItem, onClose }) => {
  const defaultValues = {
    name: "",
    imageURL: "",
    weatherType: "",
  };
  const { values, handleChange } = useForm(defaultValues);

  function onAddItemSubmit(e) {
    e.preventDefault();
    onAddItem(values);
  }

  return (
    <ModalWithForm
      title="New Garment"
      name="add-garment"
      onClose={onClose}
      onSubmit={onAddItemSubmit}
      isOpen={isOpen}
    >
      <label htmlFor="name" className="modal__label">
        Name
        <input
          type="text"
          className="modal__input"
          id="name"
          name="name"
          placeholder="Name"
          value={values.name}
          onChange={handleChange}
          required
          minLength="1"
          maxLength="30"
        />
        <span className="modal__input-error" id="place-name-error" />
      </label>

      <label htmlFor="imageURL" className="modal__label">
        Image URL
        <input
          type="url"
          className="modal__input"
          id="imageURL"
          name="imageURL"
          placeholder="imageURL"
          value={values.imageURL}
          onChange={handleChange}
          required
        />
        <span className="modal__input-error" id="place-link-error" />
      </label>

      <fieldset className="modal__radio-buttons">
        <legend className="modal__legend">Select the weather type:</legend>
        <label htmlFor="hot" className="modal__label modal__label_type_radio">
          <input
            id="hot"
            type="radio"
            name="weatherType"
            value="hot"
            className="modal__radio-input"
            onChange={handleChange}
          />
          Hot
        </label>
        <label htmlFor="warm" className="modal__label modal__label_type_radio">
          <input
            id="warm"
            type="radio"
            name="weatherType"
            value="warm"
            className="modal__radio-input"
            onChange={handleChange}
          />
          Warm
        </label>
        <label htmlFor="cold" className="modal__label modal__label_type_radio">
          <input
            id="cold"
            type="radio"
            name="weatherType"
            value="cold"
            className="modal__radio-input"
            onChange={handleChange}
          />
          Cold
        </label>
      </fieldset>
    </ModalWithForm>
  );
};

export default AddItemModal;
