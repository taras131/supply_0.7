import React, {FC, useEffect, useId, useState} from 'react';
import {useAppDispatch, useAppSelector} from "../hooks/redux";
import {fetchAddSupplier} from "../store/actionsCreators/suppliers";
import ModalWindow from "./ModalWindow";
import Typography from "@mui/material/Typography";
import AttachFileIcon from '@mui/icons-material/AttachFile';
import MergeTypeIcon from '@mui/icons-material/MergeType';
import RedoIcon from '@mui/icons-material/Redo';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import LoadingButton from "@mui/lab/LoadingButton";
import {
    Button,
    Stack,
    TextField,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
    Checkbox, FormControlLabel
} from "@mui/material";
import {getSuppliers} from "../store/selectors/suppliers";
import {emptyInvoice} from "../models/iInvoices";
import {getDateInMilliseconds} from "../utils/services";
import {fetchAddInvoice, fetchRemoveFile, fetchUploadFile} from "../store/actionsCreators/invoices";

interface IProps {
    isOpenModal: boolean
    handleToggleOpen: () => void
}

const InvoicesAddNew: FC<IProps> = ({isOpenModal, handleToggleOpen}) => {
    const dispatch = useAppDispatch()
    const [inputValue, setInputValue] = useState({
        amount: 0,
        number: ""
    })
    const [isWithVAT, setIsWithVAT] = useState(true)
    const [selectedSupplierId, setSelectedSupplierId] = useState("")
    const [isUploadFileLoading, setIsUploadFileLoading] = useState(false)
    const [fileName, setFileName] = useState("")
    const [filePatch, setFilePatch] = useState("")
    const [disabled, setDisabled] = useState(true)
    const selectLabelId = useId()
    const selectId = useId()
    const selectSupplier = useId()
    const checkboxId = useId()
    const suppliers = useAppSelector(state => getSuppliers(state))
    useEffect(() => {
        if (selectedSupplierId && filePatch && inputValue.amount && inputValue.number) {
            setDisabled(false)
        } else {
            setDisabled(true)
        }
    }, [selectedSupplierId, filePatch, inputValue.amount, inputValue.number])
    const updateFile = (name: string, filePatch: string) => {
        setFileName(name)
        setFilePatch(filePatch)
    }
    let suppliersList = suppliers.map(supplier => (
        <MenuItem key={`${supplier.id}_${supplier.name}`}
                  value={supplier.id}>{`${supplier.name} - ${supplier.INN}`}</MenuItem>))
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue({...inputValue, [e.target.name]: e.target.value})
    }
    const handleSupplierChange = (e: SelectChangeEvent) => {
        setSelectedSupplierId(e.target.value as string)
    }
    const handleIsWithVATSelected = () => {
        setIsWithVAT(prev => !prev)
    }
    const handleAddClick = async () => {
        dispatch(fetchAddInvoice({
            ...emptyInvoice,
            author: {...emptyInvoice.author, date: getDateInMilliseconds()},
            isWithVAT: isWithVAT,
            supplierId: selectedSupplierId,
            number: inputValue.number,
            amount: +inputValue.amount,
            invoiceFileLink: filePatch
        }))
        setInputValue({
            amount: 0,
            number: ""
        })
        setIsWithVAT(true)
        setFileName("")
        setFilePatch("")
        setDisabled(true)
        setSelectedSupplierId("")
        handleToggleOpen()
    }
    const handleChangeInputFile = (e: any) => {
        setIsUploadFileLoading(true)
        if (filePatch) {
            dispatch(fetchRemoveFile(fileName))
        }
        dispatch(fetchUploadFile({
            file: e.target.files[0],
            updateFile: updateFile,
            setIsUpdateFileLoading: setIsUploadFileLoading
        }))
        setFileName(e.target.files[0].name)

    }
    return (
        <ModalWindow isOpenModal={isOpenModal} handleToggleOpen={handleToggleOpen} title={"Новый счёт"}>
            <Stack spacing={4} mt={4} mb={2}>
                <FormControl fullWidth sx={{width: "100%"}}>
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
                <TextField value={inputValue.number}
                           onChange={handleInputChange}
                           name="number"
                           label="Номер счёта"/>
                <TextField value={inputValue.amount}
                           onChange={handleInputChange}
                           name="amount"
                           type={"number"}
                           label="Сумма"/>
                <FormControlLabel
                    control={<Checkbox checked={isWithVAT}
                                       onChange={handleIsWithVATSelected}
                                       id={checkboxId}
                                       sx={{'& .MuiSvgIcon-root': {fontSize: 38}}}/>}
                    label="C НДС"/>
                {fileName && (
                    <Typography>Файл: {fileName.split("-")[1]}</Typography>
                )}
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
                <Button onClick={handleAddClick} variant={"contained"} disabled={disabled}>
                    Добавить
                </Button>
                <Typography mt={"-10px"}>
                    {disabled ? "Не все поля заполнены" : ""}
                </Typography>
            </Stack>
        </ModalWindow>
    );
};

export default InvoicesAddNew;