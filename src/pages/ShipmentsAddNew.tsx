import React, {FC, useEffect, useId, useState} from "react";
import {FormControl, MenuItem, Paper, Select, SelectChangeEvent, Stack, TextField, Typography} from "@mui/material";
import ShipmentsAddNewHeader from "../components/ShipmentsAddNewHeader";
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

const transporters = ["Адамант", "Байкал", "Деловые Линии", "Почта", "ПЭК", "СДЭК", "Энергия"];

export interface IType {
    name: TShipmentsType,
    value: string
}

const types: IType [] = [{name: "air", value: "Авиа"}, {name: "railway", value: "ЖД"}];

export interface IInvoiceValue {
    value: TShipmentInvoiceValue,
    title: string
}

export const invoiceValues: IInvoiceValue[] = [
    {value: "partly", title: "Частично"},
    {value: "completely", title: "Полностью"}];

const ShipmentsAddNew: FC = () => {
    const dispatch = useAppDispatch();
    const user = useAppSelector(state => getUser(state));
    const [transporter, setTransporter] = useState("");
    const [type, setType] = useState<TShipmentsType>(types[0].name);
    const [filePatch, setFilePatch] = useState("");
    const [isUploadFileLoading, setIsUploadFileLoading] = useState(false);
    const [fileName, setFileName] = useState("");
    const [isValidate, setIsValidate] = useState(false);
    const [selectedInvoices, setSelectedInvoices] = useState<IShipmentsInvoice []>([]);
    const [ladingNumber, setLadingNumber] = useState("");
    const selectTransporterId = useId();
    const selectTypeId = useId();
    useEffect(() => {
        if (transporter && type && filePatch && !isUploadFileLoading && selectedInvoices.length > 0 && ladingNumber) {
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
    const typeList = types.map(type => (
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
    return (
        <Stack style={{minHeight: "calc(100vh - 120px"}} alignItems="center">
            <ShipmentsAddNewHeader isValidate={isValidate} handleAddClick={handleAddClick}/>
            <Paper sx={{maxWidth: "850px", width: "100%", padding: "20px"}}>
                <Stack spacing={2} sx={{width: "100%"}}>
                    <Grid container sx={{width: "100%"}} alignItems="center">
                        <Grid xs={3}>
                            <Typography color="gray" fontWeight={600}>
                                Перевозчик:
                            </Typography>
                        </Grid>
                        <Grid xs={9} spacing={2}>
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
                        <Grid xs={3}>
                            <Typography color="gray" fontWeight={600}>
                                Транспортная накладная №
                            </Typography>
                        </Grid>
                        <Grid xs={9} spacing={2}>
                            <TextField value={ladingNumber}
                                       onChange={handleInputChange}
                                       name="ladingNumber"/>
                        </Grid>
                    </Grid>
                    <Grid container sx={{width: "100%"}} alignItems="center">
                        <Grid xs={3}>
                            <Typography color="gray" fontWeight={600}>
                                Тип перевозки:
                            </Typography>
                        </Grid>
                        <Grid xs={9} spacing={2}>
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
                        <Grid xs={3}>
                            <Typography color="gray" fontWeight={600}>
                                Транспортная накладная:
                            </Typography>
                        </Grid>
                        <Grid xs={9} spacing={2}>
                            <LoadingButton
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
        </Stack>
    );
};

export default ShipmentsAddNew;