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
import {
    AMOUNT_COPY_TEXT,
    CANCEL_TEXT, COPY_TEXT,
    DOWNLOAD_TEXT,
    FILE_TYPE, INN_COPY_TEXT,
    MESSAGE_SEVERITY, NO_TEXT,
    STRING_EMPTY,
    UPLOAD_TEXT, YES_TEXT,
} from "../utils/const";
import {routes} from "../utils/routes";
import {useNavigate} from "react-router-dom";
import DoDisturbAltIcon from "@mui/icons-material/DoDisturbAlt";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import {getIsShipmentByInvoiceId} from "../store/selectors/shipments";
import ApprovedInvoiceCheckbox from "./ApprovedInvoiceCheckbox";
import {
    APPROVED_GRADIENT, BLACK_COLOR,
    CANCEL_GRADIENT, CENTER, COMPONENT_A, CONTAINED_VARIANT, CURSOR_POINTER, END,
    INHERIT, LABEL,
    LOADING_BUTTON_BORDER_RADIUS, NONE, RIGHT, ROW,
    SIZE_SMALL,
    SUCCESS,
    SUCCESS_GRADIENT, WHITE_COLOR,
} from "../styles/const";
import {getUser} from "../store/selectors/auth";


const InvoicesListItem: FC<IInvoice> = (invoice) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const user = useAppSelector(state => getUser(state));
    const isShipment = useAppSelector(state => getIsShipmentByInvoiceId(state, invoice.id));
    //const comments = useAppSelector(state => getCommentsByInvoiceId(state, invoice.id));
    const supplierName = useAppSelector(state => getSupplierNameById(state, invoice.supplierId));
    const supplierINN = useAppSelector(state => getSupplierINNById(state, invoice.supplierId));
    const [isUploadFileLoading, setIsUploadFileLoading] = useState(false);
    const [backgroundGradient, setBackgroundGradient] = useState(WHITE_COLOR);
    const [textColor, setTextColor] = useState(BLACK_COLOR);
    useEffect(() => {
        setBackgroundGradient(WHITE_COLOR);
        setTextColor(BLACK_COLOR);
        if (invoice.paid.isPaid) {
            setBackgroundGradient(SUCCESS_GRADIENT);
            setTextColor(WHITE_COLOR);
        } else {
            if (invoice.approved.isApproved) {
                setBackgroundGradient(APPROVED_GRADIENT);
                setTextColor(WHITE_COLOR);
            }
        }
        if (invoice.cancel && invoice.cancel.isCancel) {
            setBackgroundGradient(CANCEL_GRADIENT);
            setTextColor(BLACK_COLOR);
        }
    }, [invoice]);
    const onLoadingPaymentOrderFile = (name: string, filePatch: string) => {
        const newPaid = {
            isPaid: true, userId: user.id, date: getDateInMilliseconds(), paymentOrderFileLink: filePatch,
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
        dispatch(setMessage({text: INN_COPY_TEXT, severity: MESSAGE_SEVERITY.success}));
    };
    const handleAmountClick = () => {
        navigator.clipboard.writeText(invoice.amount);
        dispatch(setMessage({text: AMOUNT_COPY_TEXT, severity: MESSAGE_SEVERITY.success}));
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
                background: backgroundGradient,
                color: textColor,
            }}
        >
            <TableCell align={CENTER}>
                <ApprovedInvoiceCheckbox invoice={invoice}/>
            </TableCell>
            <TableCell sx={{color: INHERIT}}>{convertMillisecondsToDate(invoice.author.date)}</TableCell>
            <TableCell sx={{color: INHERIT}}>{supplierName}</TableCell>
            <TableCell sx={{cursor: CURSOR_POINTER, color: INHERIT}} onClick={handleINNClick}>
                <Tooltip title={COPY_TEXT}>
                    <Stack direction={ROW} alignItems={CENTER} spacing={1}>
                        <Typography>
                            {supplierINN}
                        </Typography>
                        <ContentCopyIcon color={SUCCESS}/>
                    </Stack>
                </Tooltip>
            </TableCell>
            <TableCell sx={{cursor: CURSOR_POINTER, color: INHERIT}} align={RIGHT} onClick={handleAmountClick}>
                <Tooltip title={COPY_TEXT}>
                    <Stack sx={{width: "100%"}} direction={ROW} alignItems={CENTER} justifyContent={END}
                           spacing={1}>
                        <Typography>
                            {new Intl.NumberFormat("ru-RU").format(invoice.amount)} руб.
                        </Typography>
                        <ContentCopyIcon color={SUCCESS}/>
                    </Stack>
                </Tooltip>
            </TableCell>
            <TableCell sx={{color: INHERIT}} align={CENTER}>
                {invoice.isWithVAT
                    ? (<Typography>
                        {YES_TEXT}
                    </Typography>)
                    : (<Typography>
                        {NO_TEXT}
                    </Typography>)}
            </TableCell>
            <TableCell
                sx={{color: INHERIT}}
                align={CENTER}>
                {invoice.paid.isPaid
                    ? convertMillisecondsToDate(invoice.paid.date)
                    : (
                        <Typography color={INHERIT}>
                            {invoice.cancel && invoice.cancel.isCancel
                                ? CANCEL_TEXT
                                : NO_TEXT}
                        </Typography>
                    )}
            </TableCell>
            <TableCell sx={{color: INHERIT}} align={CENTER}>
                <Chip
                    label={DOWNLOAD_TEXT}
                    component={COMPONENT_A}
                    href={invoice.invoiceFileLink}
                    icon={<DownloadIcon/>}
                    color={SUCCESS}
                    clickable
                />
            </TableCell>
            <TableCell sx={{color: INHERIT}} align={CENTER}>
                {invoice.paid.isPaid
                    ? (<Chip
                        sx={{width: "100%"}}
                        label={DOWNLOAD_TEXT}
                        component={COMPONENT_A}
                        href={invoice.paid.paymentOrderFileLink}
                        icon={<DownloadIcon/>}
                        color={SUCCESS}
                        clickable
                    />)
                    : (
                        <LoadingButton
                            variant={CONTAINED_VARIANT}
                            sx={{borderRadius: LOADING_BUTTON_BORDER_RADIUS, textTransform: NONE}}
                            component={LABEL}
                            loading={isUploadFileLoading}
                            fullWidth
                            disabled={invoice.cancel && invoice.cancel.isCancel}
                            size={SIZE_SMALL}
                            startIcon={(invoice.cancel && invoice.cancel.isCancel
                                ? (<DoDisturbAltIcon/>)
                                : (<AttachFileIcon/>))}
                        >
                            {invoice.cancel && invoice.cancel.isCancel
                                ? CANCEL_TEXT
                                : UPLOAD_TEXT}
                            <input
                                type={FILE_TYPE}
                                hidden
                                accept="image/*, application/pdf"
                                onChange={handleChangeInputFile}
                            />
                        </LoadingButton>
                    )}
            </TableCell>
            <TableCell>
                <IconButton aria-label="show comments" onClick={handleCommentClick} color={SUCCESS}>
                    {isShipment
                        ? (<LocalShippingIcon color={SUCCESS}/>)
                        : (STRING_EMPTY)}
                </IconButton>
            </TableCell>
            <TableCell>
                <IconButton aria-label="show more" onClick={handleMoreClick}>
                    <MoreVertIcon color={SUCCESS}/>
                </IconButton>
            </TableCell>
        </TableRow>
    );
};

export default InvoicesListItem;