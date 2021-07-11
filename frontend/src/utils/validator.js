import { useState, useCallback } from 'react';
import { validationSettings, authValidation } from './constants';

export default function useFormAndValidation(authMode = false) {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(true);
  const [inputsClasses, setInputsClasses] = useState({});
  const [errorsClasses, setErrorsClasses] = useState({});

  const handleChange = ({ target }) => {
    const {
      inputClass, inputErrorClass, errorClass, errorClassVisible,
    } = authMode ? authValidation : validationSettings;
    const { name, value } = target;
    const newInputClass = target.validity.valid ? inputClass : `${inputClass} ${inputErrorClass}`;
    const newErrorClass = target.validity.valid ? errorClass : `${errorClass} ${errorClassVisible}`;
    setValues({ ...values, [name]: value });
    setErrors({ ...errors, [name]: target.validationMessage });
    setInputsClasses({ ...inputsClasses, [name]: newInputClass });
    setErrorsClasses({ ...errorsClasses, [name]: newErrorClass });
    setIsValid(target.closest('form').checkValidity());
  };

  const resetForm = useCallback(
    (newValues = {},
      newErrors = {},
      newInputClasses = {},
      newErrrorClasses = {},
      newIsValid = false) => {
      setValues(newValues);
      setErrors(newErrors);
      setIsValid(newIsValid);
      setInputsClasses(newInputClasses);
      setErrorsClasses(newErrrorClasses);
    }, [setValues, setErrors, setIsValid],
  );

  return {
    values,
    handleChange,
    errors,
    inputsClasses,
    errorsClasses,
    isValid,
    resetForm,
    setValues,
    setIsValid,
  };
}
