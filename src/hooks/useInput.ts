import {useEffect, useState} from "react";
import {validateEmail} from "../utils/services";

interface IValidations {
    [key: string]: string | number | boolean
}

const useValidation = (value: string, validations: IValidations) => {
    const [isEmpty, setIsEmpty] = useState(true);
    const [minLengthError, setMinLengthError] = useState(false);
    const [maxLengthError, setMaxLengthError] = useState(false);
    const [isEmailError, setIsEmailError] = useState(false);
    useEffect(() => {
        for (const validation in validations) {
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
    }, [value]);
    return {isEmpty, minLengthError, isEmailError, maxLengthError};
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
        if(!isHappenedChange) {
            setIsHappenedChange(true);
        }
        if (timeout) {
            clearTimeout(timeout);
        }
        setError("");
        setValue(e.target.value);
    };

    const set = (str: string) => {
        setValue(str);
    };
    return {value, onChange, isValid, error, set};
};