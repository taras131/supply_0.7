import React, { FC, useEffect, useState } from "react";
import ModalWindow from "./ModalWindow";
import { Button, Stack, TextField } from "@mui/material";
import { useAppDispatch } from "../hooks/redux";
import { fetchAddSupplier } from "../store/actionsCreators/suppliers";
import { StyledTextField } from "../styles/const";

interface IProps {
  isOpenModal: boolean;
  handleToggleOpen: () => void;
}

const SuppliersAddNew: FC<IProps> = ({ isOpenModal, handleToggleOpen }) => {
  const dispatch = useAppDispatch();
  const [inputValue, setInputValue] = useState({
    name: "",
    INN: "",
  });
  const [inputValueError, setInputValueError] = useState({
    name: "не менее трёх символов",
    INN: "ИНН должен содержать десять цифр",
  });
  useEffect(() => {
    if (inputValue.name.length > 3) {
      setInputValueError({ ...inputValueError, name: "" });
    }
    if (("" + inputValue.INN).length < 10) {
      setInputValueError({ ...inputValueError, INN: "ИНН должен быть не меннее 10 символов" });
    } else {
      setInputValueError({ ...inputValueError, INN: "" });
    }
  }, [inputValue.name, inputValue.INN]);
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue({ ...inputValue, [e.target.name]: e.target.value });
  };
  const handleAddClick = () => {
    dispatch(fetchAddSupplier({ name: inputValue.name, INN: inputValue.INN }));
    setInputValue({
      name: "",
      INN: "",
    });
    setInputValueError({
      name: "не менее трёх символов",
      INN: "ИНН должен содержать десять цифр",
    });
    handleToggleOpen();
  };
  return (
    <ModalWindow isOpenModal={isOpenModal} handleToggleOpen={handleToggleOpen} title={"Новый поставщик"}>
      <Stack spacing={3} mt={3}>
        <TextField
          value={inputValue.name}
          onChange={handleInputChange}
          name="name"
          label="Поставщик"
          helperText={inputValueError.name}
        />
        <StyledTextField
          value={inputValue.INN}
          onChange={handleInputChange}
          name="INN"
          label="ИНН"
          helperText={inputValueError.INN}
          type="number"
        />
        <Button
          onClick={handleAddClick}
          variant={"contained"}
          disabled={!!inputValueError.INN || !inputValue.name.length}
        >
          Добавить
        </Button>
      </Stack>
    </ModalWindow>
  );
};

export default SuppliersAddNew;
