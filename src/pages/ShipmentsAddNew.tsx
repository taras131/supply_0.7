import React, {FC, useEffect, useId, useState} from "react";
import {
    FormControl,
    MenuItem,
    Paper,
    Select,
    SelectChangeEvent,
    Stack,
    TextField,
    Typography,
    useMediaQuery,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import LoadingButton from "@mui/lab/LoadingButton";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import {fetchRemoveFile, fetchUploadFile} from "../store/actionsCreators/invoices";
import {useAppDispatch, useAppSelector} from "../hooks/redux";
import ShipmentsAddNewInvoiceList from "../components/ShipmentsAddNewInvoiceList";
import {IShipmentsInvoice, TShipmentInvoiceValue, TShipmentsType} from "../models/iShipments";
import {fetchAddShipment} from "../store/actionsCreators/shipments";
import {getUser} from "../store/selectors/auth";
import {getDateInMilliseconds} from "../utils/services";
import {useNavigate} from "react-router-dom";
import {routes} from "../utils/routes";
import PageHeaderWithTitleAndTwoButtons from "../components/PageHeaderWithTitleAndTwoButtons";
import {shipmentTypes} from "../utils/const";
import PageLayout from "../components/PageLayout";

export const transporters = ["Адамант", "Байкал", "Деловые Линии", "Почта", "ПЭК", "СДЭК", "Энергия", "Дмитрий Павлович"];

export interface IInvoiceValue {
    value: TShipmentInvoiceValue,
    title: string
}

export const invoiceValues: IInvoiceValue[] = [
    {value: "partly", title: "Часть"},
    {value: "completely", title: "Весь"}];

const ShipmentsAddNew: FC = () => {
    const dispatch = useAppDispatch();
    const matches_870 = useMediaQuery("(min-width:870px)");
    const matches_700 = useMediaQuery("(min-width:700px)");
    const navigate = useNavigate();
    const user = useAppSelector(state => getUser(state));
    const [transporter, setTransporter] = useState("");
    const [type, setType] = useState<TShipmentsType>(shipmentTypes[0].name);
    const [filePatch, setFilePatch] = useState("");
    const [isUploadFileLoading, setIsUploadFileLoading] = useState(false);
    const [fileName, setFileName] = useState("");
    const [isValidate, setIsValidate] = useState(false);
    const [selectedInvoices, setSelectedInvoices] = useState<IShipmentsInvoice []>([]);
    const [ladingNumber, setLadingNumber] = useState("");
    const selectTransporterId = useId();
    const selectTypeId = useId();
    useEffect(() => {
        if (transporter && type && !isUploadFileLoading && selectedInvoices.length > 0 && ladingNumber) {
            setIsValidate(true);
        } else {
            setIsValidate(false);
        }
    }, [transporter, type, filePatch, isUploadFileLoading, selectedInvoices, ladingNumber]);
    const handleChangeSelectedInvoices = (invoiceId: string) => {
        const isContains = selectedInvoices.find(invoice => invoice.invoiceId === invoiceId) !== undefined;
        if (isContains) {
            setSelectedInvoices(prev => [...prev.filter(shipment => shipment.invoiceId !== invoiceId)]);
        } else {
            setSelectedInvoices(prev => [...prev, {invoiceId: invoiceId, volume: "completely"}]);
        }
    };
    const handleValueChange = (invoiceId: string, newValue: TShipmentInvoiceValue) => {
        setSelectedInvoices(prev => [...prev.map(selectedInvoice => {
            if (selectedInvoice.invoiceId === invoiceId) {
                return {...selectedInvoice, volume: newValue};
            } else {
                return selectedInvoice;
            }
        })]);
    };
    const transporterList = transporters.map(transporter => (
        <MenuItem key={transporter}
                  value={transporter}>{transporter}</MenuItem>));
    const typeList = shipmentTypes.map(type => (
        <MenuItem key={type.name}
                  value={type.name}>{type.value}</MenuItem>));
    const handleAddClick = () => {
        dispatch(fetchAddShipment({
            author: {
                userId: user.id,
                dateCreating: getDateInMilliseconds(),
            },
            receiving: {
                userId: "",
                dateCreating: 0,
                isReceived: false,
            },
            ladingNumber: ladingNumber,
            ladingNumberFilePath: filePatch,
            transporter: transporter,
            type: type,
            invoicesList: selectedInvoices,
        }));
        setFilePatch("");
        setFileName("");
        setTransporter("");
        setType(shipmentTypes[0].name);
        setIsValidate(false);
        setSelectedInvoices([]);
        setLadingNumber("");
        navigate(routes.shipments);
    };
    const handleTransporterChange = (e: SelectChangeEvent) => {
        setTransporter(e.target.value as string);
    };
    const handleTypeChange = (e: SelectChangeEvent) => {
        setType(e.target.value as string);
    };
    const updateFile = (name: string, filePatch: string) => {
        setFileName(name);
        setFilePatch(filePatch);
    };
    const handleChangeInputFile = (e: any) => {
        setIsUploadFileLoading(true);
        if (filePatch) {
            dispatch(fetchRemoveFile(fileName));
        }
        dispatch(fetchUploadFile({
            file: e.target.files[0],
            updateFile: updateFile,
            setIsUpdateFileLoading: setIsUploadFileLoading,
        }));
        setFileName(e.target.files[0].name);
    };
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLadingNumber(e.target.value);
    };
    const handleBackClick = () => {
        navigate(routes.shipments);
    };
    return (
        <PageLayout maxWidth={1000}>
            <PageHeaderWithTitleAndTwoButtons leftButtonText={"Назад"}
                                              rightButtonText={"Сохранить"}
                                              title={"Новая отгрузка"}
                                              handleLeftButtonClick={handleBackClick}
                                              handleRightButtonClick={handleAddClick}
                                              isRightButtonDisabled={!isValidate}/>
            <Paper sx={{maxWidth: "1000px", width: "100%", padding: matches_700 ? "20px" : "4px"}}>
                <Stack spacing={2} sx={{width: "100%"}} pt={2}>
                    <Grid container sx={{width: "100%"}} alignItems="center">
                        <Grid xs={matches_870 ? 3 : 12} spacing={1}>
                            <Typography color="gray" fontWeight={600}>
                                Перевозчик:
                            </Typography>
                        </Grid>
                        <Grid xs={matches_870 ? 9 : 12}>
                            <FormControl fullWidth sx={{width: "100%"}}>
                                <Select
                                    id={selectTransporterId}
                                    defaultValue={""}
                                    value={transporter}
                                    onChange={handleTransporterChange}
                                    sx={{overflow: "hidden"}}
                                >
                                    {transporterList}
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>
                    <Grid container sx={{width: "100%"}} alignItems="center">
                        <Grid xs={matches_870 ? 3 : 12} spacing={1}>
                            <Typography color="gray" fontWeight={600}>
                                Транспортная накладная №
                            </Typography>
                        </Grid>
                        <Grid xs={matches_870 ? 9 : 12}>
                            <TextField value={ladingNumber}
                                       fullWidth
                                       onChange={handleInputChange}
                                       name="ladingNumber"/>
                        </Grid>
                    </Grid>
                    <Grid container sx={{width: "100%"}} alignItems="center">
                        <Grid xs={matches_870 ? 3 : 12} spacing={1}>
                            <Typography color="gray" fontWeight={600}>
                                Тип перевозки:
                            </Typography>
                        </Grid>
                        <Grid xs={matches_870 ? 9 : 12}>
                            <FormControl fullWidth sx={{width: "100%"}}>
                                <Select
                                    id={selectTypeId}
                                    defaultValue={""}
                                    value={type}
                                    onChange={handleTypeChange}
                                    sx={{overflow: "hidden"}}
                                >
                                    {typeList}
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>
                    <Grid container sx={{width: "100%"}} alignItems="center">
                        <Grid xs={matches_870 ? 3 : 12} spacing={1}>
                            <Typography color="gray" fontWeight={600}>
                                Транспортная накладная:
                            </Typography>
                        </Grid>
                        <Grid xs={matches_870 ? 9 : 12}>
                            <LoadingButton
                                sx={{height: "56px"}}
                                variant="outlined"
                                component="label"
                                loading={isUploadFileLoading}
                                fullWidth
                                startIcon={fileName
                                    ? (<AutorenewIcon/>)
                                    : (<AttachFileIcon/>)}
                            >
                                {fileName ? "Заменить накладную" : "Прикрепить накладную"}
                                <input
                                    type="file"
                                    hidden
                                    onChange={handleChangeInputFile}
                                />
                            </LoadingButton>
                            <Typography mt={1}>
                                {fileName ? fileName : ""}
                            </Typography>
                        </Grid>
                    </Grid>
                    <ShipmentsAddNewInvoiceList selectedInvoices={selectedInvoices}
                                                handleChangeSelectedInvoices={handleChangeSelectedInvoices}
                                                handleValueChange={handleValueChange}/>
                </Stack>
            </Paper>
        </PageLayout>
    );
};

export default ShipmentsAddNew;