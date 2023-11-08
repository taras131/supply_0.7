import React, {FC, useId} from "react";
import {Checkbox, FormControlLabel, useMediaQuery} from "@mui/material";
import {IInvoice} from "../models/iInvoices";
import {fetchUpdateInvoiceApproved} from "../store/actionsCreators/invoices";
import {getDateInMilliseconds} from "../utils/services";
import {useAppDispatch, useAppSelector} from "../hooks/redux";
import {getUser} from "../store/selectors/auth";

interface IProps {
    invoice: IInvoice
}

const ApprovedInvoiceCheckbox: FC<IProps> = ({invoice}) => {
    const checkboxId = useId();
    const dispatch = useAppDispatch();
    const user = useAppSelector(state => getUser(state));
    const handleApprovedChange = () => {
        dispatch(fetchUpdateInvoiceApproved({
            invoiceId: invoice.id,
            newApproved: {
                userId: user.id,
                date: getDateInMilliseconds(),
                isApproved: !invoice.approved.isApproved,
            },
        }));
    };
    const matches_470 = useMediaQuery("(min-width:470px)");
    return (
        <>
            <FormControlLabel
                sx={{marginRight: 0}}
                label={""}
                control={<Checkbox checked={invoice.approved.isApproved}
                                   onChange={handleApprovedChange}
                                   color={"success"}
                                   id={checkboxId}
                                   disabled={invoice.paid.isPaid || invoice.cancel && invoice.cancel.isCancel}
                                   sx={{"& .MuiSvgIcon-root": {fontSize: matches_470 ? 38 : 24}}}/>}/>
        </>
    );
};

export default ApprovedInvoiceCheckbox;