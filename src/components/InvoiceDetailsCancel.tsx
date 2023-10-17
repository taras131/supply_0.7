import React, {FC} from 'react';
import {IInvoice} from "../models/iInvoices";
import {Button, Stack} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../hooks/redux";
import {getUser} from "../store/selectors/auth";
import {fetchUpdateInvoiceApproved, fetchUpdateInvoiceCancel} from "../store/actionsCreators/invoices";
import {getDateInMilliseconds} from "../utils/services";

const InvoiceDetailsCancel: FC<IInvoice> = ({id, cancel, paid}) => {
    const dispatch = useAppDispatch()
    const user = useAppSelector(state => getUser(state))
    const handleCancelClick = () => {
        if (cancel && cancel.isCancel) {
            dispatch(fetchUpdateInvoiceCancel({
                invoiceId: id,
                newCancel: {
                    isCancel: false,
                    date: 0,
                    userId: user.uid
                }
            }))
        } else {
            dispatch(fetchUpdateInvoiceCancel({
                invoiceId: id,
                newCancel: {
                    isCancel: true,
                    date: getDateInMilliseconds(),
                    userId: user.uid
                }
            }))
            dispatch(fetchUpdateInvoiceApproved({
                invoiceId: id,
                newApproved: {
                    userId: user.uid,
                    date: getDateInMilliseconds(),
                    isApproved: false
                }
            }))
        }
    }
    return (
        <Stack sx={{width: "100%"}} alignItems={"end"} justifyContent={"end"}>
            {cancel && cancel.isCancel
                ? (
                    <Button variant={"outlined"} color={"secondary"} onClick={handleCancelClick}>
                        Возобновить счёт
                    </Button>
                )
                : (
                    <Button variant={"outlined"} color={"secondary"} onClick={handleCancelClick}
                            disabled={paid.isPaid}>
                        Отменить счёт
                    </Button>
                )}
        </Stack>
    );
};

export default InvoiceDetailsCancel;