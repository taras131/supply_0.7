import React, {FC, useState} from 'react';
import ModalWindow from "./ModalWindow";
import {Button, Stack, TextField} from "@mui/material";
import {useAppDispatch} from "../hooks/redux";
import {fetchAddSupplier} from "../store/actionsCreators/suppliers";

interface IProps {
    isOpenModal: boolean
    handleToggleOpen: () => void
}

const SuppliersAddNew: FC<IProps> = ({isOpenModal, handleToggleOpen}) => {
    const dispatch = useAppDispatch()
    const [inputValue, setInputValue] = useState({
        name: "",
        INN: ""
    })
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue({...inputValue, [e.target.name]: e.target.value})
    }
    const handleAddClick = () => {
        dispatch(fetchAddSupplier({name: inputValue.name, INN: inputValue.INN}))
    }
    return (
        <ModalWindow isOpenModal={isOpenModal} handleToggleOpen={handleToggleOpen}>
            <Stack spacing={4} mt={4}>
                <TextField value={inputValue.name}
                           onChange={handleInputChange}
                           name="name"
                           label="Поставщик"/>
                <TextField value={inputValue.INN}
                           onChange={handleInputChange}
                           name="INN"
                           label="ИНН"/>
                <Button onClick={handleAddClick}>
                    Добавить
                </Button>
            </Stack>
        </ModalWindow>
    );
};

export default SuppliersAddNew;