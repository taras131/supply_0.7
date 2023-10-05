import React, {useState} from 'react';
import {Button, Stack, Typography} from "@mui/material";
import InvoicesAddNew from "./InvoicesAddNew";

const InvoicesHeader = () => {
    const [isOpenAddNewModal, setIsOpenAddNewModal] = useState(false)
    const toggleIsOpenAddNewModal = () => {
        setIsOpenAddNewModal(prev => !prev)
    }
    return (
        <Stack sx={{maxWidth: 850, width: "100%", padding: "20px 0"}} direction="row" alignItems="center"
               justifyContent="space-between">
            <Typography variant="h2" fontSize="24px" fontWeight={700}>
                Счета
            </Typography>
            <Button variant="contained" size="large" onClick={toggleIsOpenAddNewModal}>
                Добавить
            </Button>
            <InvoicesAddNew isOpenModal={isOpenAddNewModal} handleToggleOpen={toggleIsOpenAddNewModal}/>
        </Stack>
    );
};

export default InvoicesHeader;