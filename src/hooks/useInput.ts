import { useEffect, useState } from "react";
import { validateEmail } from "../utils/services";

interface IValidations {
  [key: string]: string | number | boolean;
}

const useValidation = (value: string | number, validations: IValidations) => {
  const [isEmpty, setIsEmpty] = useState(true);
  const [minLengthError, setMinLengthError] = useState(false);
  const [maxLengthError, setMaxLengthError] = useState(false);
  const [minValueError, setMinValueError] = useState(false);
  const [maxValueError, setMaxValueError] = useState(false);
  const [isEmailError, setIsEmailError] = useState(false);
  useEffect(() => {
    for (const validation in validations) {
      if (typeof value === "string") {
        switch (validation) {
          case "minLength":
            setMinLengthError(value.length < validations[validation]);
            break;
          case "maxLength":
            setMaxLengthError(value.length > validations[validation]);
            break;
          case "isEmpty":
            setIsEmpty(!value);
            break;
          case "isEmail":
            setIsEmailError(!validateEmail(value));
            break;
        }
      }
      if (typeof value === "number") {
        switch (validation) {
          case "minValue":
            setMinValueError(value < validations[validation]);
            break;
          case "maxValue":
            setMaxValueError(value > validations[validation]);
            break;
        }
      }
    }
  }, [value]);
  return { isEmpty, minLengthError, isEmailError, maxLengthError, minValueError, maxValueError };
};

export const useInput = (initialValue: string, validations: IValidations) => {
  const [value, setValue] = useState(initialValue);
  const [isValid, setIsValid] = useState(false);
  const [error, setError] = useState("");
  const [isHappenedChange, setIsHappenedChange] = useState(false);
  const valid = useValidation(value, validations);
  let timeout: NodeJS.Timeout;
  const setErrorText = () => {
    setError("");
    if (isHappenedChange) {
      if (valid.isEmailError) {
        setError("не является email");
      }
      if (valid.minLengthError) {
        setError(`поле не может быть короче ${validations.minLength} символов`);
      }
      if (valid.isEmpty) {
        setError("поле не может быть пустым");
      }
      if (valid.minValueError) {
        setError(`Значение не может быть меньше ${validations.minValue}`);
      }
      if (valid.maxValueError) {
        setError(`Значение не может быть больше ${validations.maxValue}`);
      }
    }
  };
  useEffect(() => {
    if (!valid.isEmpty && !valid.minLengthError && !valid.maxLengthError && !valid.isEmailError) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
    const timeout = setTimeout(setErrorText, 1300);
    return () => clearTimeout(timeout);
  }, [valid]);
  const onChange = (e: any) => {
    if (!isHappenedChange) {
      setIsHappenedChange(true);
    }
    if (timeout) {
      clearTimeout(timeout);
    }
    setError("");
    if (typeof value === "number") {
      setValue(+e.target.value);
    } else {
      setValue(e.target.value);
    }
  };

  const set = (str: string) => {
    setValue(str);
  };
  return { value, onChange, isValid, error, set };
};
