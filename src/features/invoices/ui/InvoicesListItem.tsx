import React, { FC, useEffect, useState } from "react";
import { Chip, IconButton, Stack, TableCell, TableRow, Tooltip, Typography, useMediaQuery } from "@mui/material";
import { IInvoice } from "models/iInvoices";
import { convertMillisecondsToDate, deleteYearFromString, extractAllText } from "utils/services";
import { useAppDispatch, useAppSelector } from "hooks/redux";
import { getSupplierINNById, getSupplierNameById } from "store/selectors/suppliers";
import DownloadIcon from "@mui/icons-material/Download";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { setMessage } from "store/reducers/message";
import {
  AMOUNT_COPY_TEXT,
  CANCEL_TEXT,
  COPY_TEXT,
  DOWNLOAD_TEXT,
  INN_COPY_TEXT,
  MESSAGE_SEVERITY,
  NO_TEXT,
  YES_TEXT,
} from "utils/const";
import { routes } from "utils/routes";
import { useLocation, useNavigate } from "react-router-dom";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import ApprovedInvoiceCheckbox from "features/invoices/ui/ApprovedInvoiceCheckbox";
import {
  APPROVED_GRADIENT,
  BLACK_COLOR,
  CANCEL_GRADIENT,
  CENTER,
  COMPONENT_A,
  CURSOR_POINTER,
  END,
  INHERIT,
  RIGHT,
  ROW,
  SUCCESS,
  SUCCESS_GRADIENT,
  WHITE_COLOR,
} from "styles/const";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import UploadPayment from "features/invoices/ui/UploadPayment";
import { selectCommentsByInvoiceId } from "store/reducers/coments";
import {selectIsShipmentByInvoiceId} from "features/shipments/model/selectors";

interface IProps {
  invoice: IInvoice;
  forShipmentMode: boolean;
}

const InvoicesListItem: FC<IProps> = ({ invoice, forShipmentMode }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const isShipment = useAppSelector(selectIsShipmentByInvoiceId(invoice.id));
  const matches_1300 = useMediaQuery("(min-width:1300px)");
  const matches_1050 = useMediaQuery("(min-width:1050px)");
  const matches_700 = useMediaQuery("(min-width:700px)");
  const matches_470 = useMediaQuery("(min-width:470px)");
  const comments = useAppSelector(selectCommentsByInvoiceId(invoice.id));
  const supplierName = useAppSelector((state) => getSupplierNameById(state, invoice.supplierId));
  const supplierINN = useAppSelector((state) => getSupplierINNById(state, invoice.supplierId));
  const [backgroundGradient, setBackgroundGradient] = useState(WHITE_COLOR);
  const [textColor, setTextColor] = useState(BLACK_COLOR);
  const invoiceCreatedDate = convertMillisecondsToDate(invoice.author.date);
  useEffect(() => {
    setBackgroundGradient(WHITE_COLOR);
    setTextColor(BLACK_COLOR);
    if (invoice.approved.isApproved && !forShipmentMode) {
      setBackgroundGradient(APPROVED_GRADIENT);
      setTextColor(WHITE_COLOR);
    }
    if (invoice.paid.isPaid && !forShipmentMode) {
      setBackgroundGradient(SUCCESS_GRADIENT);
      setTextColor(WHITE_COLOR);
    }
    if (invoice.cancel && invoice.cancel.isCancel) {
      setBackgroundGradient(CANCEL_GRADIENT);
      setTextColor(BLACK_COLOR);
    }
  }, [invoice]);
  const handleINNClick = () => {
    navigator.clipboard.writeText(supplierINN);
    dispatch(setMessage({ text: INN_COPY_TEXT, severity: MESSAGE_SEVERITY.success }));
  };
  const handleAmountClick = () => {
    navigator.clipboard.writeText(invoice.amount);
    dispatch(setMessage({ text: AMOUNT_COPY_TEXT, severity: MESSAGE_SEVERITY.success }));
  };
  const handleCommentClick = () => {
    navigate(`${routes.invoices}/${invoice.id}`, {
      state: {
        isCommentClick: true,
      },
    });
  };
  const handleShipmentClick = () => {
    navigate(`${routes.invoices}/${invoice.id}`, {
      state: {
        isShipmentClick: true,
      },
    });
  };
  const handleMoreClick = () => {
    navigate(`${routes.invoices}/${invoice.id}`, { state: { from: pathname } });
  };
  return (
    <TableRow
      sx={{
        "&:last-child td, &:last-child th": { border: 0 },
        background: backgroundGradient,
        color: textColor,
        padding: 0,
        fontSize: matches_470 ? "14px" : "11px",
      }}
    >
      {!forShipmentMode && (
        <TableCell align={CENTER} sx={{ padding: 0 }}>
          <ApprovedInvoiceCheckbox invoice={invoice} />
        </TableCell>
      )}
      <TableCell sx={{ color: INHERIT, padding: 0 }} align={CENTER}>
        {matches_700 ? invoiceCreatedDate : deleteYearFromString(invoiceCreatedDate)}
      </TableCell>
      <TableCell sx={{ color: INHERIT, padding: matches_1050 ? "8px" : 0 }}>
        {matches_700 ? supplierName : extractAllText(supplierName).slice(0, 12)}
      </TableCell>
      {matches_1050 && (
        <TableCell
          sx={{ cursor: CURSOR_POINTER, color: INHERIT, padding: matches_1050 ? "8px" : "4px" }}
          onClick={handleINNClick}
        >
          <Tooltip title={COPY_TEXT}>
            <Stack direction={ROW} alignItems={CENTER} spacing={1}>
              <Typography>{supplierINN}</Typography>
              {!forShipmentMode && <ContentCopyIcon color={SUCCESS} />}
            </Stack>
          </Tooltip>
        </TableCell>
      )}
      <TableCell
        sx={{ cursor: CURSOR_POINTER, color: INHERIT, padding: matches_1050 ? "8px" : 0 }}
        align={RIGHT}
        onClick={handleAmountClick}
      >
        <Tooltip title={COPY_TEXT}>
          <Stack sx={{ width: "100%" }} direction={ROW} alignItems={CENTER} justifyContent={END} spacing={1}>
            <Typography>
              {new Intl.NumberFormat("ru-RU").format(invoice.amount)} {matches_470 ? " руб." : ""}
            </Typography>
            {matches_700 && !forShipmentMode && <ContentCopyIcon color={SUCCESS} />}
          </Stack>
        </Tooltip>
      </TableCell>
      {matches_1300 && !forShipmentMode && (
        <TableCell sx={{ color: INHERIT, padding: matches_1050 ? "8px" : "4px" }} align={CENTER}>
          {invoice.isWithVAT ? <Typography>{YES_TEXT}</Typography> : <Typography>{NO_TEXT}</Typography>}
        </TableCell>
      )}
      {matches_1050 && (
        <TableCell sx={{ color: INHERIT, padding: matches_1050 ? "8px" : "4px" }} align={CENTER}>
          {forShipmentMode ? (
            invoice.volume && invoice.volume === "completely" ? (
              "Полностью"
            ) : (
              "Частично"
            )
          ) : invoice.paid.isPaid ? (
            convertMillisecondsToDate(invoice.paid.date)
          ) : (
            <Typography color={INHERIT}>{invoice.cancel && invoice.cancel.isCancel ? CANCEL_TEXT : NO_TEXT}</Typography>
          )}
        </TableCell>
      )}
      <TableCell sx={{ color: INHERIT, padding: matches_1050 ? "8px" : "2px" }} align={CENTER}>
        {matches_700 ? (
          <Chip
            label={"Счёт"}
            component={COMPONENT_A}
            href={invoice.invoiceFileLink}
            icon={<DownloadIcon />}
            color={SUCCESS}
            clickable
          />
        ) : (
          <IconButton
            color="primary"
            aria-label="download invoice"
            component={COMPONENT_A}
            href={invoice.invoiceFileLink}
          >
            <DownloadIcon />
          </IconButton>
        )}
      </TableCell>
      {matches_1300 && !forShipmentMode && (
        <>
          <TableCell sx={{ color: INHERIT }} align={CENTER} sx={{ padding: matches_1050 ? "8px" : "4px" }}>
            {invoice.paid.isPaid ? (
              <Chip
                sx={{ width: "100%" }}
                label={DOWNLOAD_TEXT}
                component={COMPONENT_A}
                href={invoice.paid.paymentOrderFileLink}
                icon={<DownloadIcon />}
                color={SUCCESS}
                clickable
              />
            ) : (
              <UploadPayment invoice={invoice} />
            )}
          </TableCell>
          {!forShipmentMode && (
            <TableCell sx={{ padding: 0 }} align={RIGHT}>
              {isShipment && (
                <IconButton aria-label="show shipping" onClick={handleShipmentClick} color={SUCCESS}>
                  <LocalShippingIcon color={SUCCESS} />
                </IconButton>
              )}
              {!isShipment && comments.length > 0 && (
                <IconButton aria-label="show comments" onClick={handleCommentClick} color={SUCCESS}>
                  <ChatBubbleIcon color={SUCCESS} />
                </IconButton>
              )}
            </TableCell>
          )}
        </>
      )}
      <TableCell sx={{ padding: 0 }} align={CENTER}>
        <IconButton aria-label="show more" onClick={handleMoreClick} sx={{ padding: 0 }}>
          <MoreVertIcon color={SUCCESS} />
        </IconButton>
      </TableCell>
    </TableRow>
  );
};

export default InvoicesListItem;
