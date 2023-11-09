import React, {FC, useEffect, useId, useState} from "react";
import {useAppDispatch, useAppSelector} from "../hooks/redux";
import Typography from "@mui/material/Typography";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import LoadingButton from "@mui/lab/LoadingButton";
import {
    Stack,
    TextField,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
    Checkbox, FormControlLabel, useMediaQuery,
} from "@mui/material";
import {getSuppliers} from "../store/selectors/suppliers";
import {emptyInvoice} from "../models/iInvoices";
import {getDateInMilliseconds} from "../utils/services";
import {fetchAddInvoice, fetchRemoveFile, fetchUploadFile} from "../store/actionsCreators/invoices";
import {getUser} from "../store/selectors/auth";
import Grid from "@mui/material/Unstable_Grid2";
import PageHeaderWithBackButton from "../components/PageHeaderWithBackButton";
import {routes} from "../utils/routes";
import {useNavigate} from "react-router-dom";
import OrdersList from "../components/OrdersList";
import {resetSelectedOrderPosition} from "../store/reducers/invoices";
import {getSelectedOrderPosition} from "../store/selectors/invoices";
import {getOrders} from "../store/selectors/orders";
import {CENTER, StyledTextField} from "../styles/const";

const InvoicesAddNew: FC = () => {
    const dispatch = useAppDispatch();
    const [inputValue, setInputValue] = useState({
        amount: 0,
        number: "",
    });
    const orders = useAppSelector(state => getOrders(state, true));
    const navigate = useNavigate();
    const [isWithVAT, setIsWithVAT] = useState(true);
    const matches_700 = useMediaQuery("(min-width:700px)");
    const matches_500 = useMediaQuery("(min-width:500px)");
    const user = useAppSelector(state => getUser(state));
    const [selectedSupplierId, setSelectedSupplierId] = useState("");
    const [isUploadFileLoading, setIsUploadFileLoading] = useState(false);
    const selectedPosition = useAppSelector(state => getSelectedOrderPosition(state));
    const [fileName, setFileName] = useState("");
    const [filePatch, setFilePatch] = useState("");
    const [disabled, setDisabled] = useState(true);
    const selectLabelId = useId();
    const selectId = useId();
    const selectSupplier = useId();
    const checkboxId = useId();
    const suppliers = useAppSelector(state => getSuppliers(state));
    useEffect(() => {
        if (selectedSupplierId && filePatch && inputValue.amount && inputValue.number) {
            setDisabled(false);
        } else {
            setDisabled(true);
        }
    }, [selectedSupplierId, filePatch, inputValue.amount, inputValue.number]);
    const updateFile = (name: string, filePatch: string) => {
        setFileName(name);
        setFilePatch(filePatch);
    };
    const suppliersList = suppliers.map(supplier => (
        <MenuItem key={`${supplier.id}_${supplier.name}`}
                  value={supplier.id}>{`${supplier.name} - ${supplier.INN}`}</MenuItem>));
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue({...inputValue, [e.target.name]: e.target.value});
    };
    const handleSupplierChange = (e: SelectChangeEvent) => {
        setSelectedSupplierId(e.target.value as string);
    };
    const handleIsWithVATSelected = () => {
        setIsWithVAT(prev => !prev);
    };
    const handleAddClick = async () => {
        dispatch(fetchAddInvoice({
            invoice: {
                ...emptyInvoice,
                author: {...emptyInvoice.author, date: getDateInMilliseconds(), userId: user.id},
                isWithVAT: isWithVAT,
                supplierId: selectedSupplierId,
                number: inputValue.number,
                amount: +inputValue.amount,
                invoiceFileLink: filePatch,
            },
            orders: orders,
            selectedPosition: selectedPosition,
        }));
        setInputValue({
            amount: 0,
            number: "",
        });
        setIsWithVAT(true);
        setFileName("");
        setFilePatch("");
        setDisabled(true);
        setSelectedSupplierId("");
        navigate(routes.invoices);
        dispatch(resetSelectedOrderPosition());
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
    return (
        <Stack alignItems="center" spacing={matches_700 ? 3 : 1} mt={matches_700 ? 3 : 1} pb={3}>
            <PageHeaderWithBackButton backRoute={routes.invoices}
                                      title={"Новый счёт:"}
                                      isValidate={!disabled}
                                      handleAddClick={handleAddClick}
                                      errorMessage={disabled ? "не все поля заполнены" : ""}/>
            <Grid container spacing={matches_500 ? 3 : 1} sx={{maxWidth: "1374px", width: "100%", padding: 0}}>
                <Grid xs={matches_500 ? 6 : 12}>
                    <FormControl fullWidth>
                        <InputLabel id={selectLabelId}>Поставщик</InputLabel>
                        <Select
                            id={selectId}
                            name={selectSupplier}
                            labelId={selectLabelId}
                            defaultValue={""}
                            value={selectedSupplierId}
                            label={selectLabelId}
                            onChange={handleSupplierChange}
                            sx={{overflow: "hidden"}}
                        >
                            {suppliersList}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid xs={matches_500 ? 6 : 12}>
                    <TextField value={inputValue.number}
                               onChange={handleInputChange}
                               name="number"
                               label="Номер счёта"
                               fullWidth/>
                </Grid>
            </Grid>
            <Grid container spacing={matches_500 ? 3 : 1} sx={{maxWidth: "1374px", width: "100%"}}>
                <Grid xs={matches_500 ? 4 : 6}>
                    <StyledTextField value={inputValue.amount}
                               onChange={handleInputChange}
                               name="amount"
                               type={"number"}
                               label="Сумма"/>
                </Grid>
                <Grid xs={matches_500 ? 4 : 6} pl={4}>
                    <FormControlLabel
                        control={<Checkbox checked={isWithVAT}
                                           onChange={handleIsWithVATSelected}
                                           id={checkboxId}
                                           sx={{"& .MuiSvgIcon-root": {fontSize: 38}}}/>}
                        label="C НДС"/>
                </Grid>
                <Grid xs={matches_500 ? 4 : 12}>
                    <Stack sx={{width: "100%"}} spacing={1} alignItems={CENTER}>
                        <LoadingButton
                            variant="outlined"
                            component="label"
                            loading={isUploadFileLoading}
                            fullWidth
                            startIcon={fileName
                                ? (<AutorenewIcon/>)
                                : (<AttachFileIcon/>)}
                        >
                            {fileName ? "Заменить счёт" : "Прикрепить счёт"}
                            <input
                                type="file"
                                hidden
                                onChange={handleChangeInputFile}
                            />
                        </LoadingButton>
                        {fileName && (
                            <Typography>Файл: {fileName.split("-")[1]}</Typography>
                        )}
                    </Stack>
                </Grid>
            </Grid>
            <Stack spacing={2} sx={{maxWidth: 1350, width: "100%"}}>
                <Typography fontSize={"16px"} fontWeight={600}>
                    Отметьте в заявках, входящие в счёт позиции:
                </Typography>
                <OrdersList isSelectPositionMode orders={orders}/>
            </Stack>
        </Stack>
    );
};

export default InvoicesAddNew;