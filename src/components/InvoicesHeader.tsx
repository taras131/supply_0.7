import React, {FC, useId, useState} from "react";
import {Button, Checkbox, FormControlLabel, FormGroup, Stack, Typography} from "@mui/material";
import InvoicesAddNew from "./InvoicesAddNew";

interface IProps {
    isShowCanceledInvoice: boolean
    isShowPaidInvoice: boolean
    handleCanceledInvoiceChange: () => void
    handlePaidInvoiceChange: () => void
}

const InvoicesHeader: FC<IProps> = ({
                                        isShowCanceledInvoice,
                                        isShowPaidInvoice,
                                        handleCanceledInvoiceChange,
                                        handlePaidInvoiceChange,
                                    }) => {
    const [isOpenAddNewModal, setIsOpenAddNewModal] = useState(false);
    const toggleIsOpenAddNewModal = () => {
        setIsOpenAddNewModal(prev => !prev);
    };
    return (
        <Stack sx={{maxWidth: 1350, width: "100%"}} direction="row" alignItems="center"
               justifyContent="space-between">
            <Typography variant="h2" fontSize="24px" fontWeight={700}>
                Счета
            </Typography>
            <FormGroup sx={{width: "100%"}}>
                <Stack sx={{width: "100%"}} direction={"row"} alignItems={"center"} justifyContent={"space-around"}>
                    <FormControlLabel
                        control={<Checkbox checked={isShowCanceledInvoice}
                                           onChange={handleCanceledInvoiceChange}/>}
                        label="показать отменённые"/>
                    <FormControlLabel
                        control={<Checkbox checked={isShowPaidInvoice}
                                           onChange={handlePaidInvoiceChange}/>}
                        label="показать оплаченные"/>
                </Stack>
            </FormGroup>
            <Button variant="contained" size="large" onClick={toggleIsOpenAddNewModal}>
                Добавить
            </Button>
            <InvoicesAddNew isOpenModal={isOpenAddNewModal} handleToggleOpen={toggleIsOpenAddNewModal}/>
        </Stack>
    );
};

export default InvoicesHeader;