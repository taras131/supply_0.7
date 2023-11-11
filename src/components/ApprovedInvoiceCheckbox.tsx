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
    const matches_470 = useMediaQuery("(min-width:470px)");
    const user = useAppSelector(state => getUser(state));
    const handleApprovedChange = () => {
        if (invoice.approved.isApproved) {
            dispatch(fetchUpdateInvoiceApproved({
                invoiceId: invoice.id,
                newApproved: {
                    userId: "",
                    date: 0,
                    isApproved: !invoice.approved.isApproved,
                },
            }));
        } else {
            dispatch(fetchUpdateInvoiceApproved({
                invoiceId: invoice.id,
                newApproved: {
                    userId: user.id,
                    date: getDateInMilliseconds(),
                    isApproved: !invoice.approved.isApproved,
                },
            }));
        }
    };
    return (
        <Checkbox
            checked={invoice.approved.isApproved}
            onChange={handleApprovedChange}
            sx={{"& .MuiSvgIcon-root": {fontSize: matches_470 ? 38 : 24}, margin: 0, padding: 0}}
            id={checkboxId}
        />
    );
};

export default ApprovedInvoiceCheckbox;