import React, {FC, useEffect, useState} from "react";
import {
    Chip,
    IconButton,
    Stack,
    TableCell,
    TableRow,
    Tooltip,
    Typography, useMediaQuery,
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
    STRING_EMPTY, STRING_WITH_SPACE,
    UPLOAD_TEXT, YES_TEXT,
} from "../utils/const";
import {routes} from "../utils/routes";
import {useLocation, useNavigate} from "react-router-dom";
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
    const {pathname} = useLocation();
    const user = useAppSelector(state => getUser(state));
    const isShipment = useAppSelector(state => getIsShipmentByInvoiceId(state, invoice.id));
    const matches_1300 = useMediaQuery("(min-width:1300px)");
    const matches_1050 = useMediaQuery("(min-width:1050px)");
    const matches_700 = useMediaQuery("(min-width:700px)");
    const matches_470 = useMediaQuery("(min-width:470px)");
    //const comments = useAppSelector(state => getCommentsByInvoiceId(state, invoice.id));
    const supplierName = useAppSelector(state => getSupplierNameById(state, invoice.supplierId));
    const supplierINN = useAppSelector(state => getSupplierINNById(state, invoice.supplierId));
    const [isUploadFileLoading, setIsUploadFileLoading] = useState(false);
    const [backgroundGradient, setBackgroundGradient] = useState(WHITE_COLOR);
    const [textColor, setTextColor] = useState(BLACK_COLOR);
    const invoiceCreatedDate = convertMillisecondsToDate(invoice.author.date);
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
        navigate(`${routes.invoices}/${invoice.id}`, {state: {from: pathname}});
    };
    return (
        <TableRow
            sx={{
                "&:last-child td, &:last-child th": {border: 0},
                background: backgroundGradient,
                color: textColor,
                padding: matches_1300 ? "16px" : 0,
            }}
        >
            <TableCell align={CENTER} sx={{padding: matches_1050 ? "16px" : "2px"}}>
                <ApprovedInvoiceCheckbox invoice={invoice}/>
            </TableCell>
            <TableCell sx={{color: INHERIT, padding: matches_1050 ? "16px" : 0}} align={CENTER}>
                {matches_700
                    ? invoiceCreatedDate
                    : invoiceCreatedDate.split(".")[0] + "." + invoiceCreatedDate.split(".")[1]}
            </TableCell>
            <TableCell sx={{color: INHERIT, padding: matches_1050 ? "16px" : "6px"}}>
                {matches_700
                    ? supplierName
                    : supplierName.split(STRING_WITH_SPACE)[1].replace(/['"]+/g, "").slice(0, 12)}
            </TableCell>
            {matches_1050 && (
                <TableCell sx={{cursor: CURSOR_POINTER, color: INHERIT, padding: matches_1050 ? "16px" : "6px"}}
                           onClick={handleINNClick}>
                    <Tooltip title={COPY_TEXT}>
                        <Stack direction={ROW} alignItems={CENTER} spacing={1}>
                            <Typography>
                                {supplierINN}
                            </Typography>
                            <ContentCopyIcon color={SUCCESS}/>
                        </Stack>
                    </Tooltip>
                </TableCell>
            )}
            <TableCell sx={{cursor: CURSOR_POINTER, color: INHERIT, padding: matches_1050 ? "16px" : "6px"}}
                       align={RIGHT}
                       onClick={handleAmountClick}>
                <Tooltip title={COPY_TEXT}>
                    <Stack sx={{width: "100%"}} direction={ROW} alignItems={CENTER} justifyContent={END}
                           spacing={1}>
                        <Typography>
                            {new Intl.NumberFormat("ru-RU").format(invoice.amount)} {matches_470 ? " руб." : ""}
                        </Typography>
                        {matches_700 && (
                            <ContentCopyIcon color={SUCCESS}/>
                        )}
                    </Stack>
                </Tooltip>
            </TableCell>
            {matches_1300 && (
                <TableCell sx={{color: INHERIT}} align={CENTER}>
                    {invoice.isWithVAT
                        ? (<Typography>
                            {YES_TEXT}
                        </Typography>)
                        : (<Typography>
                            {NO_TEXT}
                        </Typography>)}
                </TableCell>
            )}
            {matches_1050 && (
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
            )}
            <TableCell sx={{color: INHERIT, padding: matches_1050 ? "16px" : 0}}
                       align={CENTER}>
                {matches_700
                    ? (<Chip
                        label={DOWNLOAD_TEXT}
                        component={COMPONENT_A}
                        href={invoice.invoiceFileLink}
                        icon={<DownloadIcon/>}
                        color={SUCCESS}
                        clickable
                    />)
                    : (<IconButton color="primary"
                                   aria-label="download invoice"
                                   component={COMPONENT_A}
                                   href={invoice.invoiceFileLink}>
                        <DownloadIcon/>
                    </IconButton>)}
            </TableCell>
            {matches_1300 && (
                <>
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
                    <TableCell sx={{padding: matches_1050 ? "16px" : "6px"}}>
                        <IconButton aria-label="show comments" onClick={handleCommentClick} color={SUCCESS}>
                            {isShipment
                                ? (<LocalShippingIcon color={SUCCESS}/>)
                                : (STRING_EMPTY)}
                        </IconButton>
                    </TableCell>
                </>
            )}
            <TableCell sx={{padding: matches_1050 ? "16px" : 0}}>
                <IconButton aria-label="show more" onClick={handleMoreClick}>
                    <MoreVertIcon color={SUCCESS}/>
                </IconButton>
            </TableCell>
        </TableRow>
    );
};

export default InvoicesListItem;