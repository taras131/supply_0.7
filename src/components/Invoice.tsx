import React, {FC, useEffect, useId, useState} from 'react';
import {
    Checkbox,
    Chip,
    FormControlLabel,
    IconButton,
    Stack,
    TableCell,
    TableRow,
    Tooltip,
    Typography
} from "@mui/material";
import {IInvoice} from "../models/iInvoices";
import {convertMillisecondsToDate, getDateInMilliseconds} from "../utils/services";
import {useAppDispatch, useAppSelector} from "../hooks/redux";
import {getSupplierINNById, getSupplierNameById} from "../store/selectors/suppliers";
import DownloadIcon from '@mui/icons-material/Download';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import LoadingButton from "@mui/lab/LoadingButton";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import {fetchUpdateInvoice, fetchUpdateInvoiceApproved, fetchUploadFile} from "../store/actionsCreators/invoices";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import {setMessage} from "../store/reducers/message";
import {MESSAGE_SEVERITY} from "../utils/const";
import {routes} from "../utils/routes";
import {useNavigate} from "react-router-dom";
import {getUser} from "../store/selectors/auth";

const Invoice: FC<IInvoice> = (invoice) => {
    const dispatch = useAppDispatch()
    const checkboxId = useId()
    const navigate = useNavigate()
    const user = useAppSelector(state => getUser(state))
    const supplierName = useAppSelector(state => getSupplierNameById(state, invoice.supplierId))
    const supplierINN = useAppSelector(state => getSupplierINNById(state, invoice.supplierId))
    const [isUploadFileLoading, setIsUploadFileLoading] = useState(false)
    const [backgroundColor, setBackgroundColor] = useState("white")
    const [textColor, setTextColor] = useState("black")
    useEffect(() => {
        setBackgroundColor("white")
        setTextColor("black")
        if (invoice.paid.isPaid) {
            setBackgroundColor("#00CC66")
            setTextColor("white")
        } else {
            if (invoice.approved.isApproved) {
                setBackgroundColor("#00CCFF")
                setTextColor("white")
            }
        }
        if (invoice.cancel && invoice.cancel.isCancel) {
            setBackgroundColor("#FF66CC")
            setTextColor("black")
        }
    }, [invoice])
    const onLoadingPaymentOrderFile = (name: string, filePatch: string) => {
        const newPaid = {
            isPaid: true, userId: "", date: getDateInMilliseconds(), paymentOrderFileLink: filePatch
        }
        dispatch(fetchUpdateInvoice({invoiceId: invoice.id, newPaid: newPaid}))
    }
    const handleChangeInputFile = (e: any) => {
        setIsUploadFileLoading(true)
        dispatch(fetchUploadFile({
            file: e.target.files[0],
            updateFile: onLoadingPaymentOrderFile,
            setIsUpdateFileLoading: setIsUploadFileLoading
        }))
    }
    const handleApprovedChange = () => {
        dispatch(fetchUpdateInvoiceApproved({
            invoiceId: invoice.id,
            newApproved: {
                userId: user.uid,
                date: getDateInMilliseconds(),
                isApproved: !invoice.approved.isApproved
            }
        }))
    }
    const handleINNClick = () => {
        navigator.clipboard.writeText(supplierINN)
        dispatch(setMessage({text: "ИНН скопирован", severity: MESSAGE_SEVERITY.success}))
    }
    const handleAmountClick = () => {
        navigator.clipboard.writeText(invoice.amount)
        dispatch(setMessage({text: "Сумма скопирована", severity: MESSAGE_SEVERITY.success}))
    }
    const handleMoreClick = () => {
        navigate(`${routes.invoices}/${invoice.id}`)
    }
    return (
        <TableRow
            sx={{
                '&:last-child td, &:last-child th': {border: 0},
                backgroundColor: backgroundColor
            }}
        >
            <TableCell align={"center"}>
                <FormControlLabel
                    control={<Checkbox checked={invoice.approved.isApproved}
                                       onChange={handleApprovedChange}
                                       id={checkboxId}
                                       disabled={invoice.paid.isPaid || invoice.cancel && invoice.cancel.isCancel}
                                       sx={{'& .MuiSvgIcon-root': {fontSize: 38}}}/>}/>
            </TableCell>
            <TableCell sx={{color: textColor}}>{convertMillisecondsToDate(invoice.author.date)}</TableCell>
            <TableCell sx={{color: textColor}}>{supplierName}</TableCell>
            <TableCell sx={{cursor: "pointer"}} onClick={handleINNClick}>
                <Tooltip title="скопировать">
                    <Stack direction={"row"} alignItems={"center"} spacing={1}>
                        <Typography sx={{color: textColor}}>
                            {supplierINN}
                        </Typography>
                        <ContentCopyIcon color="action"/>
                    </Stack>
                </Tooltip>
            </TableCell>
            <TableCell sx={{cursor: "pointer"}} align={"right"} onClick={handleAmountClick}>
                {invoice.cancel && invoice.cancel.isCancel
                    ? (<Typography color={"#FF0033"} fontWeight={600}>
                       - - - - - - - - -   руб.
                    </Typography>)
                    : (<Tooltip title="скопировать">
                        <Stack sx={{width: "100%"}} direction={"row"} alignItems={"center"} justifyContent={"end"}
                               spacing={1}>
                            <Typography sx={{color: textColor}}>
                                {new Intl.NumberFormat('ru-RU').format(invoice.amount)} руб.
                            </Typography>
                            <ContentCopyIcon color="action"/>
                        </Stack>
                    </Tooltip>)}
            </TableCell>
            <TableCell sx={{color: textColor}} align={"center"}>
                {invoice.isWithVAT
                    ? (<Typography>
                        Да
                    </Typography>)
                    : (<Typography fontWeight={700} color={"darkred"}>
                        Нет
                    </Typography>)}
            </TableCell>
            <TableCell
                sx={{color: textColor}}
                align={"center"}>
                {invoice.paid.isPaid
                    ? convertMillisecondsToDate(invoice.paid.date)
                    : (
                        <Typography color={invoice.cancel && invoice.cancel.isCancel ? "#FF0033" : "black"}
                                    fontWeight={invoice.cancel && invoice.cancel.isCancel ? 600 : 400}>
                            {invoice.cancel && invoice.cancel.isCancel
                                ? "ОТМЕНЁН"
                                : "Нет"}
                        </Typography>
                    )}
            </TableCell>
            <TableCell sx={{color: textColor}} align="center">
                <Chip
                    label={"Скачать"}
                    component="a"
                    href={invoice.invoiceFileLink}
                    icon={<DownloadIcon/>}
                    color={invoice.paid.isPaid ? "success" : "primary"}
                    clickable
                />
            </TableCell>
            <TableCell sx={{color: textColor}} align="center">
                {invoice.paid.isPaid
                    ? (<Chip
                        label={"Скачать"}
                        component="a"
                        href={invoice.paid.paymentOrderFileLink}
                        icon={<DownloadIcon/>}
                        color={invoice.paid.isPaid ? "success" : "primary"}
                        clickable
                    />)
                    : (
                        <LoadingButton
                            component="label"
                            loading={isUploadFileLoading}
                            fullWidth
                            disabled={invoice.cancel && invoice.cancel.isCancel}
                            size="small"
                            startIcon={(<AttachFileIcon/>)}
                        >
                            Загрузить
                            <input
                                type="file"
                                hidden
                                accept="image/*, application/pdf"
                                onChange={handleChangeInputFile}
                            />
                        </LoadingButton>
                    )}
            </TableCell>
            <TableCell>
                <IconButton aria-label="add to shopping cart" onClick={handleMoreClick}>
                    <MoreVertIcon color="action"/>
                </IconButton>
            </TableCell>
        </TableRow>
    );
};

export default Invoice;