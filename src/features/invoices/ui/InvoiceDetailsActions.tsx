import React, {FC} from "react";
import Grid from "@mui/material/Unstable_Grid2";
import {Button, Stack, Typography, useMediaQuery} from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import {IInvoice} from "models/iInvoices";
import DeleteIcon from "@mui/icons-material/Delete";
import {useAppDispatch, useAppSelector} from "hooks/redux";
import InvoiceDetailsCancel from "features/invoices/ui/InvoiceDetailsCancel";
import {CENTER, ROW, START} from "styles/const";
import UploadPayment from "features/invoices/ui/UploadPayment";
import {fetchLinkPositions, fetchRemoveFile, fetchUpdateInvoice} from "features/invoices/model/actions";
import {getSelectedOrderPosition} from "features/invoices/model/selectors";
import {getOrders} from "features/orders/model/selectors";

interface IProps {
    invoice: IInvoice;
    isShowOrdersPosition: boolean;
    handleIsShowOrdersPositionChange: () => void;
}

const InvoiceDetailsActions: FC<IProps> = ({
                                               invoice,
                                               isShowOrdersPosition,
                                               handleIsShowOrdersPositionChange,
                                           }) => {
    const {id, invoiceFileLink, paid, cancel} = invoice;
    const dispatch = useAppDispatch();
    const selectedPosition = useAppSelector(getSelectedOrderPosition);
    const allOrders = useAppSelector((state) => getOrders(state, false));
    const matches_700 = useMediaQuery("(min-width:700px)");
    let paymentOrderFileName = "";
    if (paid.paymentOrderFileLink) {
        paymentOrderFileName = paid.paymentOrderFileLink.split("/")[7].split("?")[0];
    }
    const invoiceFileName = invoiceFileLink.split("/")[7].split("?")[0];
    const handleRemovePaymentOrderFile = () => {
        dispatch(fetchRemoveFile(paymentOrderFileName));
        const newPaid = {isPaid: false, userId: "", date: 0, paymentOrderFileLink: ""};
        dispatch(fetchUpdateInvoice({invoiceId: id, newPaid: newPaid}));
    };
    const handleOrdersClick = () => {
        console.log(id);
        if (isShowOrdersPosition) {
            dispatch(fetchLinkPositions({selectedPosition, orders: allOrders, invoiceId: id}));
        }
        handleIsShowOrdersPositionChange();
    };
    return (
        <Grid container sx={{width: "100%", minHeight: "100px"}} alignItems={START} spacing={2}>
            <Grid xs={matches_700 ? 4 : 12}>
                <Stack sx={{width: "100%"}} spacing={matches_700 ? 2 : 1} justifyContent={CENTER}>
                    <Typography color="darkblue" fontWeight={600}>
                        Счёт :
                    </Typography>
                    <Stack direction={"row"} spacing={1}>
                        <Button href={invoiceFileLink} startIcon={<DownloadIcon/>} variant={"contained"}>
                            Скачать
                        </Button>
                    </Stack>
                    <Typography color={"gray"} fontWeight={500}>
                        {invoiceFileName.split("-").slice(1).join("-").substring(0, 35)}
                    </Typography>
                </Stack>
            </Grid>
            <Grid xs={matches_700 ? 6 : 12}>
                <Stack sx={{width: "100%"}} spacing={matches_700 ? 2 : 1} justifyContent={CENTER}>
                    <Typography color="darkblue" fontWeight={600}>
                        Платёжное поручение :
                    </Typography>
                    <Stack direction={"row"} spacing={1}>
                        {paid.paymentOrderFileLink ? (
                            <>
                                <Button href={paid.paymentOrderFileLink} startIcon={<DownloadIcon/>}
                                        variant={"contained"}>
                                    Скачать
                                </Button>
                                <Button
                                    color={"secondary"}
                                    variant={"contained"}
                                    onClick={handleRemovePaymentOrderFile}
                                    startIcon={<DeleteIcon/>}
                                >
                                    Удалить
                                </Button>
                            </>
                        ) : (
                            <UploadPayment invoice={invoice} forDetailsMode/>
                        )}
                    </Stack>
                    {paymentOrderFileName && (
                        <Typography color={"gray"} fontWeight={500}>
                            {paymentOrderFileName.split("-").slice(1).join("-").substring(0, 46)}
                        </Typography>
                    )}
                </Stack>
            </Grid>
            <Grid xs={6}>

                <Stack spacing={matches_700 ? 2 : 1} sx={{width: "100%"}}>
                    <Typography color="darkblue" fontWeight={600}>
                        Действие:
                    </Typography>
                    <Stack direction={ROW} spacing={2}>
                        {paid && !paid.isPaid && (
                            <InvoiceDetailsCancel id={id} cancel={cancel} paid={paid}/>
                        )}
                        <Button color={"primary"} onClick={handleOrdersClick}>
                            {isShowOrdersPosition ? "Прикрепить" : " + Заявки"}
                        </Button>
                    </Stack>
                </Stack>

            </Grid>
        </Grid>
    );
};

export default InvoiceDetailsActions;
