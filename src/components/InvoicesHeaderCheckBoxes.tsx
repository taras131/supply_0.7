import React, {FC} from "react";
import {Checkbox, FormControlLabel, FormGroup, Stack} from "@mui/material";

interface IProps {
    isShowCanceledInvoice: boolean
    handleCanceledInvoiceChange: () => void
    isShowPaidInvoice: boolean
    handlePaidInvoiceChange: () => void
}

const InvoicesHeaderCheckBoxes: FC<IProps> = ({
                                                  isShowCanceledInvoice,
                                                  handleCanceledInvoiceChange,
                                                  isShowPaidInvoice,
                                                  handlePaidInvoiceChange,
                                              }) => {
    return (
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
    );
};

export default InvoicesHeaderCheckBoxes;