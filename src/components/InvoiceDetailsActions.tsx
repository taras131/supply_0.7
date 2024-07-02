import React, { FC } from "react";
import Grid from "@mui/material/Unstable_Grid2";
import { Button, Stack, Typography, useMediaQuery } from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import { IInvoice } from "../models/iInvoices";
import DeleteIcon from "@mui/icons-material/Delete";
import { fetchRemoveFile, fetchUpdateInvoice } from "../store/actionsCreators/invoices";
import { useAppDispatch } from "../hooks/redux";
import InvoiceDetailsCancel from "./InvoiceDetailsCancel";
import { CENTER, START } from "../styles/const";
import UploadPayment from "./UploadPayment";

interface IProps {
  invoice: IInvoice;
}

const InvoiceDetailsActions: FC<IProps> = ({ invoice }) => {
  const { id, invoiceFileLink, paid, cancel } = invoice;
  const dispatch = useAppDispatch();
  const matches_700 = useMediaQuery("(min-width:700px)");
  let paymentOrderFileName = "";
  if (paid.paymentOrderFileLink) {
    paymentOrderFileName = paid.paymentOrderFileLink.split("/")[7].split("?")[0];
  }
  const invoiceFileName = invoiceFileLink.split("/")[7].split("?")[0];
  const handleRemovePaymentOrderFile = () => {
    dispatch(fetchRemoveFile(paymentOrderFileName));
    const newPaid = { isPaid: false, userId: "", date: 0, paymentOrderFileLink: "" };
    dispatch(fetchUpdateInvoice({ invoiceId: id, newPaid: newPaid }));
  };
  return (
    <Grid container sx={{ width: "100%", minHeight: "100px" }} alignItems={START} spacing={2}>
      <Grid xs={matches_700 ? 4 : 12}>
        <Stack sx={{ width: "100%" }} spacing={matches_700 ? 2 : 1} justifyContent={CENTER}>
          <Typography color="darkblue" fontWeight={600}>
            Счёт :
          </Typography>
          <Stack direction={"row"} spacing={1}>
            <Button href={invoiceFileLink} startIcon={<DownloadIcon />} variant={"contained"}>
              Скачать
            </Button>
          </Stack>
          <Typography color={"gray"} fontWeight={500}>
            {invoiceFileName.split("-").slice(1).join("-").substring(0, 35)}
          </Typography>
        </Stack>
      </Grid>
      <Grid xs={matches_700 ? 4 : 12}>
        <Stack sx={{ width: "100%" }} spacing={matches_700 ? 2 : 1} justifyContent={CENTER}>
          <Typography color="darkblue" fontWeight={600}>
            Платёжное поручение :
          </Typography>
          <Stack direction={"row"} spacing={1}>
            {paid.paymentOrderFileLink ? (
              <>
                <Button href={paid.paymentOrderFileLink} startIcon={<DownloadIcon />} variant={"contained"}>
                  Скачать
                </Button>
                <Button
                  color={"secondary"}
                  variant={"contained"}
                  onClick={handleRemovePaymentOrderFile}
                  startIcon={<DeleteIcon />}
                >
                  Удалить
                </Button>
              </>
            ) : (
              <UploadPayment invoice={invoice} forDetailsMode />
            )}
          </Stack>
          {paymentOrderFileName && (
            <Typography color={"gray"} fontWeight={500}>
              {paymentOrderFileName.split("-").slice(1).join("-").substring(0, 46)}
            </Typography>
          )}
        </Stack>
      </Grid>
      <Grid xs={4}>
        {paid && !paid.isPaid && (
          <Stack spacing={matches_700 ? 2 : 1} sx={{ width: "100%" }} justifyContent={CENTER}>
            <Typography color="darkblue" fontWeight={600}>
              Действие:
            </Typography>
            <InvoiceDetailsCancel id={id} cancel={cancel} paid={paid} />
          </Stack>
        )}
      </Grid>
    </Grid>
  );
};

export default InvoiceDetailsActions;
