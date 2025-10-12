import { useState } from "react";
import ModalWithForm from "./ModalWithForm.jsx";
import { useForm } from "../../hooks/useForm.js";

const AddItemModal = ({ isOpen, onAddItem, onClose }) => {
  const defaultValues = {
    name: "",
    imageURL: "",
    weatherType: "",
  };
  const { values, handleChange, resetForm, errors, isValid } =
    useForm(defaultValues);

  function handleClose() {
    resetForm();
    onClose();
  }

  function onAddItemSubmit(e) {
    e.preventDefault();
    onAddItem(values, resetForm);
  }

  return (
    <ModalWithForm
      title="New Garment"
      name="add-garment"
      onClose={handleClose}
      onSubmit={onAddItemSubmit}
      isOpen={isOpen}
      isValid={isValid}
    >
      <label htmlFor="name" className="modal__label">
        Name*
        <input
          type="text"
          className="modal__input"
          id="name"
          name="name"
          placeholder="Name"
          value={values.name}
          onChange={handleChange}
          required
          minLength="3"
          maxLength="30"
        />
        <span className="modal__input-error" id="place-name-error">
          {errors.name}
        </span>
      </label>

      <label htmlFor="imageURL" className="modal__label">
        Image URL*
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
        <span className="modal__input-error" id="place-link-error">
          {errors.imageURL}
        </span>
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
            checked={values.weatherType === "hot"}
            required
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
            checked={values.weatherType === "warm"}
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
            checked={values.weatherType === "cold"}
          />
          Cold
        </label>
      </fieldset>
    </ModalWithForm>
  );
};

export default AddItemModal;
