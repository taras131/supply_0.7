import React, {FC, useState} from 'react';
import ModalWindow from "./ModalWindow";
import {Button, Stack, TextField} from "@mui/material";
import {StyledTextField} from "../styles/const";
import {useAppDispatch, useAppSelector} from "../hooks/redux";
import {fetchUpdateMachinery} from "../store/actionsCreators/machinery";
import {getMachineryById} from "../store/selectors/machinery";
import {useParams} from "react-router-dom";
import {IMachinery, INotice} from "../models/iMachinery";
import {getDateInMilliseconds} from "../utils/services";
import {getUser} from "../store/selectors/auth";

interface IProps {
    isOpenModal: boolean
    handleToggleOpen: () => void
}

const MachineryAddNotice: FC<IProps> = ({isOpenModal, handleToggleOpen}) => {
    const dispatch = useAppDispatch();
    const [text, setText] = useState("")
    const machineryId = useParams().machineryId || "0"
    const currentMachinery = useAppSelector(state => getMachineryById(state,machineryId))[0]
    const currentUser = useAppSelector(getUser)
    const handleInputChange = (e: any) => {
        setText(e.target.value)
    }
    const handleAddClick = () => {
        let updatedMachinery: IMachinery
        const newNotice: INotice = {
            createdDate: getDateInMilliseconds(),
            text: text,
            isActive: true,
            authorId: currentUser ? currentUser.id : "",
        }
        if(currentMachinery.notices && currentMachinery.notices.length) {
            updatedMachinery = {...currentMachinery, notices: [newNotice, ...currentMachinery.notices]}
        } else {
            updatedMachinery = {...currentMachinery, notices: [newNotice]}
        }
        dispatch(fetchUpdateMachinery(updatedMachinery))
        setText("")
        handleToggleOpen()
    }
    return (
        <ModalWindow isOpenModal={isOpenModal} handleToggleOpen={handleToggleOpen} title={"Новая заметка:"}>
            <Stack spacing={3} mt={3}>
                <TextField value={text}
                           onChange={handleInputChange}
                           name="text"
                           label="Текст"
                           rows={4}
                           helperText={""}
                           type="text"/>
                <Button onClick={handleAddClick}
                        variant={"contained"}
                        disabled={false}>
                    Добавить
                </Button>
            </Stack>
        </ModalWindow>
    );
};

export default MachineryAddNotice;