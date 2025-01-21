import React, { FC, useEffect, useState } from "react";
import { Button, ButtonGroup, Stack, Typography, useMediaQuery } from "@mui/material";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import LoadingButton from "@mui/lab/LoadingButton";
import { getDateInMilliseconds } from "utils/services";
import { getUser } from "features/auth/model/selectors";
import { setMessage } from "store/reducers/message";
import { MESSAGE_SEVERITY } from "utils/const";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";
import { routes } from "utils/routes";
import { CENTER, SPACE_BETWEEN } from "styles/const";
import InvoicesInfo from "features/invoices/ui/InvoicesInfo";
import { useAppDispatch, useAppSelector } from "hooks/redux";
import { useUploadFile } from "hooks/useUploadFile";
import {selectInvoices} from "features/invoices/model/slice";
import {fetchUpdateInvoice, fetchUploadFile} from "features/invoices/model/actions";

const InvoicesHeader: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [isUploadFileLoading, setIsUploadFileLoading] = useState(false);
  const matches_1050 = useMediaQuery("(min-width:1050px)");
  const matches_700 = useMediaQuery("(min-width:700px)");
  const { file, onFileChange, paymentErrorMessage, amount, isLoading } = useUploadFile();
  const user = useAppSelector((state) => getUser(state));
  const invoices = useAppSelector(selectInvoices);
  const handleAddInvoiceClick = () => {
    navigate(routes.invoices + "/add_new");
  };
  useEffect(() => {
    if (file && !paymentErrorMessage && amount) {
      const currentInvoice = invoices.filter((invoice) => invoice.amount === amount)[0];
      if (currentInvoice) {
        const onLoadingPaymentOrderFile = (name: string, filePatch: string) => {
          const newPaid = {
            isPaid: true,
            userId: user.id,
            date: getDateInMilliseconds(),
            paymentOrderFileLink: filePatch,
          };
          dispatch(fetchUpdateInvoice({ invoiceId: currentInvoice.id, newPaid: newPaid }));
        };
        dispatch(
          fetchUploadFile({
            file: file,
            updateFile: onLoadingPaymentOrderFile,
            setIsUpdateFileLoading: setIsUploadFileLoading,
          }),
        );
        dispatch(
          setMessage({
            text: "Платёжное поручение успешно прикреплено",
            severity: MESSAGE_SEVERITY.success,
          }),
        );
      } else {
        dispatch(
          setMessage({
            text: `Нет неоплаченных счетов на сумму ${amount} руб.`,
            severity: MESSAGE_SEVERITY.error,
          }),
        );
      }
    } else {
      if (file && paymentErrorMessage) {
        dispatch(
          setMessage({
            text: paymentErrorMessage,
            severity: MESSAGE_SEVERITY.error,
          }),
        );
      }
    }
  }, [file, isLoading, paymentErrorMessage, amount]);
  return (
    <Stack sx={{ maxWidth: 1350, width: "100%" }} spacing={matches_700 ? 3 : 1}>
      <Stack sx={{ width: "100%" }} direction="row" alignItems={CENTER} justifyContent={SPACE_BETWEEN}>
        <Typography variant="h2" fontSize="24px" fontWeight={700}>
          Счета
        </Typography>
        {matches_1050 && <InvoicesInfo />}
        <ButtonGroup aria-label="outlined primary button group" size={matches_700 ? "medium" : "small"}>
          <LoadingButton
            size={matches_700 ? "medium" : "small"}
            component="label"
            loading={isLoading}
            variant={"outlined"}
            startIcon={<AttachFileIcon />}
          >
            {isUploadFileLoading ? ".....Анализ....." : "Платёжное"}
            <input type="file" accept="application/pdf" hidden onChange={onFileChange} />
          </LoadingButton>
          <Button startIcon={<AddIcon />} variant="contained" size="large" onClick={handleAddInvoiceClick}>
            Счёт
          </Button>
        </ButtonGroup>
      </Stack>
      {!matches_1050 && <InvoicesInfo />}
    </Stack>
  );
};

export default InvoicesHeader;
