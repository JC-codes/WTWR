import { useState, useCallback } from "react";

export function useForm(initialValues = {}) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

  const handleChange = (e) => {
    const { name, value, validity, validationMessage } = e.target;
    setValues((v) => ({ ...v, [name]: value }));

    let message = "";
    if (validity.valueMissing) {
      message =
        name === "name"
          ? "(Please enter a garment name.)"
          : "(This field is required.)";
    } else if (validity.typeMismatch) {
      message = "(Please enter a valid URL).";
    } else if (validity.tooShort) {
      message = `(Must be at least ${e.target.minLength} characters.)`;
    } else if (validity.tooLong) {
      message = `(Must be no more than ${e.target.maxLength} characters.)`;
    } else {
      message = validationMessage;
    }

    setErrors((err) => ({ ...err, [name]: message }));

    const form = e.target.closest("form");
    setIsValid(form ? form.checkValidity() : false);
  };

  const resetForm = useCallback(
    (newValues = initialValues, newErrors = {}, newIsValid = false) => {
      setValues(newValues);
      setErrors(newErrors);
      setIsValid(newIsValid);
    },
    [initialValues]
  );

  return { values, setValues, handleChange, resetForm, errors, isValid };
}
