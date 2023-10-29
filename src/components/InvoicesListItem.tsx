import React, {FC, useEffect, useState} from "react";
import {
    Chip,
    IconButton,
    Stack,
    TableCell,
    TableRow,
    Tooltip,
    Typography,
} from "@mui/material";
import {IInvoice} from "../models/iInvoices";
import {convertMillisecondsToDate, getDateInMilliseconds} from "../utils/services";
import {useAppDispatch, useAppSelector} from "../hooks/redux";
import {getSupplierINNById, getSupplierNameById} from "../store/selectors/suppliers";
import DownloadIcon from "@mui/icons-material/Download";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import LoadingButton from "@mui/lab/LoadingButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import {fetchUpdateInvoice, fetchUploadFile} from "../store/actionsCreators/invoices";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import {setMessage} from "../store/reducers/message";
import {MESSAGE_SEVERITY} from "../utils/const";
import {routes} from "../utils/routes";
import {useNavigate} from "react-router-dom";
import DoDisturbAltIcon from "@mui/icons-material/DoDisturbAlt";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import {getIsShipmentByInvoiceId} from "../store/selectors/shipments";
import ApprovedInvoiceCheckbox from "./ApprovedInvoiceCheckbox";


const InvoicesListItem: FC<IInvoice> = (invoice) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const isShipment = useAppSelector(state => getIsShipmentByInvoiceId(state, invoice.id));
    //const comments = useAppSelector(state => getCommentsByInvoiceId(state, invoice.id));
    const supplierName = useAppSelector(state => getSupplierNameById(state, invoice.supplierId));
    const supplierINN = useAppSelector(state => getSupplierINNById(state, invoice.supplierId));
    const [isUploadFileLoading, setIsUploadFileLoading] = useState(false);
    const [backgroundColor, setBackgroundColor] = useState("white");
    const [textColor, setTextColor] = useState("black");
    useEffect(() => {
        setBackgroundColor("white");
        setTextColor("black");
        if (invoice.paid.isPaid) {
            setBackgroundColor("#00CC66");
            setTextColor("white");
        } else {
            if (invoice.approved.isApproved) {
                setBackgroundColor("#00CCFF");
                setTextColor("white");
            }
        }
        if (invoice.cancel && invoice.cancel.isCancel) {
            setBackgroundColor("#FF66CC");
            setTextColor("black");
        }
    }, [invoice]);
    const onLoadingPaymentOrderFile = (name: string, filePatch: string) => {
        const newPaid = {
            isPaid: true, userId: id, date: getDateInMilliseconds(), paymentOrderFileLink: filePatch,
        };
        dispatch(fetchUpdateInvoice({invoiceId: invoice.id, newPaid: newPaid}));
    };
    const handleChangeInputFile = (e: any) => {
        setIsUploadFileLoading(true);
        dispatch(fetchUploadFile({
            file: e.target.files[0],
            updateFile: onLoadingPaymentOrderFile,
            setIsUpdateFileLoading: setIsUploadFileLoading,
        }));
    };
    const handleINNClick = () => {
        navigator.clipboard.writeText(supplierINN);
        dispatch(setMessage({text: "ИНН скопирован", severity: MESSAGE_SEVERITY.success}));
    };
    const handleAmountClick = () => {
        navigator.clipboard.writeText(invoice.amount);
        dispatch(setMessage({text: "Сумма скопирована", severity: MESSAGE_SEVERITY.success}));
    };
    const handleCommentClick = () => {
        navigate(`${routes.invoices}/${invoice.id}`, {
            state: {
                isCommentClick: true,
            },
        });
    };
    const handleMoreClick = () => {
        navigate(`${routes.invoices}/${invoice.id}`);
    };
    return (
        <TableRow
            sx={{
                "&:last-child td, &:last-child th": {border: 0},
                backgroundColor: backgroundColor,
            }}
        >
            <TableCell align={"center"}>
                <ApprovedInvoiceCheckbox invoice={invoice}/>
            </TableCell>
            <TableCell sx={{color: textColor}}>{convertMillisecondsToDate(invoice.author.date)}</TableCell>
            <TableCell sx={{color: textColor}}>{supplierName}</TableCell>
            <TableCell sx={{cursor: "pointer"}} onClick={handleINNClick}>
                <Tooltip title="скопировать">
                    <Stack direction={"row"} alignItems={"center"} spacing={1}>
                        <Typography sx={{color: textColor}}>
                            {supplierINN}
                        </Typography>
                        <ContentCopyIcon color="success"/>
                    </Stack>
                </Tooltip>
            </TableCell>
            <TableCell sx={{cursor: "pointer"}} align={"right"} onClick={handleAmountClick}>
                <Tooltip title="скопировать">
                    <Stack sx={{width: "100%"}} direction={"row"} alignItems={"center"} justifyContent={"end"}
                           spacing={1}>
                        <Typography sx={{color: textColor}}>
                            {new Intl.NumberFormat("ru-RU").format(invoice.amount)} руб.
                        </Typography>
                        <ContentCopyIcon color="success"/>
                    </Stack>
                </Tooltip>
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
                                ? "Отменён"
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
                    color={"success"}
                    clickable
                />
            </TableCell>
            <TableCell sx={{color: textColor}} align="center">
                {invoice.paid.isPaid
                    ? (<Chip
                        sx={{width: "100%"}}
                        label={"Скачать"}
                        component="a"
                        href={invoice.paid.paymentOrderFileLink}
                        icon={<DownloadIcon/>}
                        color={"success"}
                        clickable
                    />)
                    : (
                        <LoadingButton
                            variant={"contained"}
                            sx={{borderRadius: "25px", textTransform: "none"}}
                            component="label"
                            loading={isUploadFileLoading}
                            fullWidth
                            disabled={invoice.cancel && invoice.cancel.isCancel}
                            size="small"
                            startIcon={(invoice.cancel && invoice.cancel.isCancel
                                ? (<DoDisturbAltIcon/>)
                                : (<AttachFileIcon/>))}
                        >
                            {invoice.cancel && invoice.cancel.isCancel
                                ? "Отменён"
                                : "Загрузить"}
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
                <IconButton aria-label="add to shopping cart" onClick={handleCommentClick} color={"success"}>
                    {isShipment
                        ? (<LocalShippingIcon color="success"/>)
                        : ("")}
                </IconButton>
            </TableCell>
            <TableCell>
                <IconButton aria-label="add to shopping cart" onClick={handleMoreClick}>
                    <MoreVertIcon color="success"/>
                </IconButton>
            </TableCell>
        </TableRow>
    );
};

export default InvoicesListItem;