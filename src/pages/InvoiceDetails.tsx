import React from 'react';
import {Link, useParams} from "react-router-dom";
import {
    Button, ButtonGroup,
    Chip,
    IconButton,
    ListItem,
    ListItemText, Paper,
    Stack,
    Step,
    StepLabel,
    Stepper,
    Typography
} from "@mui/material";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import {useAppSelector} from "../hooks/redux";
import {getInvoiceById} from "../store/selectors/invoices";
import {convertMillisecondsToDate} from "../utils/services";
import List from "@mui/material/List";
import DeleteIcon from '@mui/icons-material/Delete';
import {getSupplierNameById} from "../store/selectors/suppliers";
import DownloadIcon from "@mui/icons-material/Download";
import LoadingButton from "@mui/lab/LoadingButton";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import PublishedWithChangesIcon from '@mui/icons-material/PublishedWithChanges';
import Grid from "@mui/material/Unstable_Grid2";
import {routes} from "../utils/routes";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

const InvoiceDetails = () => {
    const invoiceId = useParams().invoiceId || "0";
    const invoice = useAppSelector(state => getInvoiceById(state, invoiceId))
    const supplierName = useAppSelector(state => getSupplierNameById(state, invoice.supplierId))
    let activeStep = 1
    if (invoice.approved.isApproved) {
        activeStep = 2
    }
    if (invoice.paid.isPaid) {
        activeStep = 3
    }
    const handleChangeInvoiceFile = () => {

    }
    return (
        <Stack alignItems="center">
            <Paper sx={{maxWidth: "1000px", width: "100%", backgroundColor: "white", padding: "20px"}} mt={20}>
                <Stack spacing={5} alignItems="center">
                    <Stack direction={"row"} alignItems={"center"} justifyContent={"space-between"}
                           sx={{width: "100%"}}>
                        <Typography variant={"h2"} fontWeight={700} fontSize={"20px"}>
                            Подробная информация по счёту:
                        </Typography>
                        <Link to={routes.invoices}>
                            <Button fullWidth variant={"contained"} startIcon={<ArrowBackIosIcon/>}>
                                Назад
                            </Button>
                        </Link>
                    </Stack>
                    <Stack sx={{width: "100%"}}>
                        <Grid container sx={{width: "100%", height: "60px"}} alignItems="center">
                            <Grid xs={3}>
                                <Typography color="gray" fontWeight={600}>
                                    № :
                                </Typography>
                            </Grid>
                            <Grid xs={9}>
                                <Typography fontWeight={600}>
                                    {invoice.number}
                                </Typography>
                            </Grid>
                        </Grid>
                        <Grid container sx={{width: "100%", height: "60px"}} alignItems="center">
                            <Grid xs={3}>
                                <Typography color="gray" fontWeight={600}>
                                    Поставщик :
                                </Typography>
                            </Grid>
                            <Grid xs={9}>
                                <Typography fontWeight={600}>
                                    {supplierName}
                                </Typography>
                            </Grid>
                        </Grid>
                        <Grid container sx={{width: "100%", height: "60px"}} alignItems="center">
                            <Grid xs={3}>
                                <Typography color="gray" fontWeight={600}>
                                    Сумма :
                                </Typography>
                            </Grid>
                            <Grid xs={9}>
                                <Typography fontWeight={600}>
                                    {invoice.amount}
                                </Typography>
                            </Grid>
                        </Grid>
                        <Grid container sx={{width: "100%", height: "60px"}} alignItems="center">
                            <Grid xs={3}>
                                <Typography color="gray" fontWeight={600}>
                                    НДС :
                                </Typography>
                            </Grid>
                            <Grid xs={9}>
                                <Typography fontWeight={600}>
                                    {invoice.isWithVAT ? "Да" : "Нет"}
                                </Typography>
                            </Grid>
                        </Grid>
                        <Grid container sx={{width: "100%", height: "60px"}} alignItems="center">
                            <Grid xs={3}>
                                <Typography color="gray" fontWeight={600}>
                                    Счёт :
                                </Typography>
                            </Grid>
                            <Grid xs={9}>
                                <ButtonGroup variant="contained" aria-label="outlined button group">
                                    <Button
                                        href={invoice.invoiceFileLink}
                                        startIcon={(<DownloadIcon/>)}

                                    >
                                        {"Скачать"}
                                    </Button>

                                    <LoadingButton
                                        loading={false}
                                        startIcon={(<PublishedWithChangesIcon/>)}
                                    >
                                        {"Заменить"}
                                        <input
                                            type="file"
                                            hidden
                                            onChange={handleChangeInvoiceFile}
                                        />
                                    </LoadingButton>
                                </ButtonGroup>
                            </Grid>

                        </Grid>
                        <Grid container sx={{width: "100%", height: "60px"}} alignItems="center">
                            <Grid xs={3}>
                                <Typography color="gray" fontWeight={600}>
                                    Платёжное поручение :
                                </Typography>
                            </Grid>
                            <Grid xs={9}>
                                <ButtonGroup variant="contained" aria-label="outlined button group">
                                    {invoice.paid.paymentOrderFileLink
                                        ? (<>
                                            <Button
                                                href={invoice.invoiceFileLink}
                                                startIcon={(<DownloadIcon/>)}

                                            >
                                                {"Скачать"}
                                            </Button>
                                            <LoadingButton
                                                loading={false}
                                                startIcon={(<PublishedWithChangesIcon/>)}
                                            >
                                                {"Заменить"}
                                                <input
                                                    type="file"
                                                    hidden
                                                    onChange={handleChangeInvoiceFile}
                                                />
                                            </LoadingButton>
                                            <Button
                                                color={"secondary"}
                                                href={invoice.invoiceFileLink}
                                                startIcon={(<DeleteIcon/>)}
                                            >
                                                {"Удалить"}
                                            </Button>
                                        </>)
                                        : (<LoadingButton
                                            loading={false}
                                            startIcon={(<PublishedWithChangesIcon/>)}
                                        >
                                            {"Заменить"}
                                            <input
                                                type="file"
                                                hidden
                                                onChange={handleChangeInvoiceFile}
                                            />
                                        </LoadingButton>)}
                                </ButtonGroup>
                            </Grid>
                        </Grid>
                    </Stack>
                    <Box sx={{maxWidth: "1200px", width: '100%', paddingTop: "40px"}}>
                        <Stepper activeStep={activeStep} alternativeLabel>
                            <Step key={1}>
                                <StepLabel>
                                    <Stack spacing={1}>
                                        <Typography fontSize={16} fontWeight={600}>
                                            Добавлен {convertMillisecondsToDate(invoice.author.date)}
                                        </Typography>
                                        <Typography>{invoice.author.userId}</Typography>
                                    </Stack>
                                </StepLabel>
                            </Step>
                            <Step key={2}>
                                <StepLabel>
                                    <Stack spacing={1}>
                                        <Typography fontSize={16} fontWeight={600}>
                                            Одобрен
                                            {invoice.approved.isApproved && (
                                                " " + convertMillisecondsToDate(invoice.approved.date)
                                            )}
                                        </Typography>

                                        <Typography>{invoice.paid.userId}</Typography>
                                    </Stack>
                                </StepLabel>
                            </Step>
                            <Step key={3}>
                                <StepLabel>
                                    <Stack>
                                        <Typography fontSize={16} fontWeight={600}>
                                            Оплачен
                                            {invoice.paid.isPaid && (
                                                " " + convertMillisecondsToDate(invoice.paid.date)
                                            )}
                                        </Typography>
                                        <Typography>{invoice.paid.userId}</Typography>
                                    </Stack>
                                </StepLabel>
                            </Step>
                        </Stepper>
                    </Box>
                </Stack>
            </Paper>
        </Stack>
    );
};

export default InvoiceDetails;