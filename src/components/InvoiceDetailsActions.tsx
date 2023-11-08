import React, {FC, useState} from "react";
import Grid from "@mui/material/Unstable_Grid2";
import {Button, Stack, Typography, useMediaQuery} from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import LoadingButton from "@mui/lab/LoadingButton";
import PublishedWithChangesIcon from "@mui/icons-material/PublishedWithChanges";
import {IInvoice} from "../models/iInvoices";
import DeleteIcon from "@mui/icons-material/Delete";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import {getDateInMilliseconds} from "../utils/services";
import {
    fetchRemoveFile,
    fetchUpdateInvoice,
    fetchUploadFile,
} from "../store/actionsCreators/invoices";
import {useAppDispatch, useAppSelector} from "../hooks/redux";
import {getUser} from "../store/selectors/auth";
import DoDisturbAltIcon from "@mui/icons-material/DoDisturbAlt";


const InvoiceDetailsActions: FC<IInvoice> = ({id, invoiceFileLink, paid, cancel}) => {
    const user = useAppSelector(state => getUser(state));
    const dispatch = useAppDispatch();
    const matches_700 = useMediaQuery("(min-width:700px)");
    const matches_470 = useMediaQuery("(min-width:470px)");
    const [isLoading, setIsLoading] = useState(false);
    let paymentOrderFileName = "";
    if (paid.paymentOrderFileLink) {
        paymentOrderFileName = paid.paymentOrderFileLink.split("/")[7].split("?")[0];
    }
    const invoiceFileName = invoiceFileLink.split("/")[7].split("?")[0];
    const onLoadingPaymentOrderFile = (name: string, filePatch: string) => {
        const newPaid = {
            isPaid: true, userId: user.id, date: getDateInMilliseconds(), paymentOrderFileLink: filePatch,
        };
        dispatch(fetchUpdateInvoice({invoiceId: id, newPaid: newPaid}));
    };
    const handleRemovePaymentOrderFile = () => {
        dispatch(fetchRemoveFile(paymentOrderFileName));
        const newPaid = {isPaid: false, userId: "", date: 0, paymentOrderFileLink: ""};
        dispatch(fetchUpdateInvoice({invoiceId: id, newPaid: newPaid}));
    };
    const handleChangePaymentOrderFile = (e: any) => {
        setIsLoading(true);
        if (paymentOrderFileName) {
            handleRemovePaymentOrderFile();
        }
        dispatch(fetchUploadFile({
            file: e.target.files[0],
            updateFile: onLoadingPaymentOrderFile,
            setIsUpdateFileLoading: setIsLoading,
        }));
    };

    return (
        <Grid container sx={{width: "100%", minHeight: "100px"}} alignItems="start" spacing={2}>
            <Grid xs={matches_700 ? 6 : 12}>
                <Stack spacing={2}>
                    <Typography color="darkblue" fontWeight={600}>
                        Счёт :
                    </Typography>
                    <Stack direction={"row"} spacing={1}>
                        <Button
                            href={invoiceFileLink}
                            startIcon={(<DownloadIcon/>)}
                            variant={"contained"}
                        >
                            Скачать
                        </Button>
                    </Stack>
                    <Typography color={"gray"} fontWeight={500}>
                        {(invoiceFileName.split("-").slice(1)).join("-").substring(0, 35)}
                    </Typography>
                </Stack>
            </Grid>
            <Grid xs={matches_700 ? 6 : 12}>
                <Stack spacing={2}>
                    <Typography color="darkblue" fontWeight={600}>
                        Платёжное поручение :
                    </Typography>
                    <Stack direction={"row"} spacing={1}>
                        {paid.paymentOrderFileLink
                            ? (<>
                                <Button href={paid.paymentOrderFileLink}
                                        startIcon={(<DownloadIcon/>)}
                                        variant={"contained"}>
                                    Скачать
                                </Button>
                                {matches_470 && (
                                    <LoadingButton
                                        loading={isLoading}
                                        component="label"
                                        variant={"outlined"}
                                        startIcon={(<PublishedWithChangesIcon/>)}
                                    >
                                        Заменить
                                        <input
                                            type="file"
                                            hidden
                                            onChange={handleChangePaymentOrderFile}
                                        />
                                    </LoadingButton>
                                )}
                                <Button
                                    color={"secondary"}
                                    variant={"contained"}
                                    onClick={handleRemovePaymentOrderFile}
                                    startIcon={(<DeleteIcon/>)}
                                >
                                    Удалить
                                </Button>
                            </>)
                            : (<LoadingButton
                                component="label"
                                disabled={cancel && cancel.isCancel}
                                loading={isLoading}
                                variant={"outlined"}
                                startIcon={(cancel && cancel.isCancel
                                    ? (<DoDisturbAltIcon/>)
                                    : (<AttachFileIcon/>))}
                            >
                                {cancel && cancel.isCancel
                                    ? "Отменён"
                                    : "Загрузить"}
                                <input
                                    type="file"
                                    accept="image/*, application/pdf"
                                    hidden
                                    onChange={handleChangePaymentOrderFile}
                                />
                            </LoadingButton>)}
                    </Stack>
                    {paymentOrderFileName && (
                        <Typography color={"gray"} fontWeight={500}>
                            {paymentOrderFileName.split("-").slice(1).join("-").substring(0, 46)}
                        </Typography>
                    )}
                </Stack>
            </Grid>
        </Grid>
    );
};

export default InvoiceDetailsActions;