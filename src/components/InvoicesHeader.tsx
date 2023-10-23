import React, {FC, useEffect, useState} from "react";
import {Button, ButtonGroup, Checkbox, FormControlLabel, FormGroup, Stack, Typography} from "@mui/material";
import InvoicesAddNew from "./InvoicesAddNew";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import LoadingButton from "@mui/lab/LoadingButton";
import {pdfjs} from "react-pdf";
import pdfWorker from "pdfjs-dist/build/pdf.worker.entry";
import {useAppDispatch, useAppSelector} from "../hooks/redux";
import {getInvoices} from "../store/selectors/invoices";
import {getDateInMilliseconds} from "../utils/services";
import {fetchUpdateInvoice, fetchUploadFile} from "../store/actionsCreators/invoices";
import {getUser} from "../store/selectors/auth";
import {setMessage} from "../store/reducers/message";
import {MESSAGE_SEVERITY} from "../utils/const";
import AddIcon from "@mui/icons-material/Add";

// Установка пути к рабочему потоку
pdfjs.GlobalWorkerOptions.workerSrc = pdfWorker;

interface IProps {
    isShowCanceledInvoice: boolean
    isShowPaidInvoice: boolean
    handleCanceledInvoiceChange: () => void
    handlePaidInvoiceChange: () => void
}

const InvoicesHeader: FC<IProps> = ({
                                        isShowCanceledInvoice,
                                        isShowPaidInvoice,
                                        handleCanceledInvoiceChange,
                                        handlePaidInvoiceChange,
                                    }) => {
    const dispatch = useAppDispatch();
    const [isOpenAddNewModal, setIsOpenAddNewModal] = useState(false);
    const [file, setFile] = useState<null | File>(null);
    const [isUploadFileLoading, setIsUploadFileLoading] = useState(false);
    const user = useAppSelector(state => getUser(state));
    const invoices = useAppSelector(state => getInvoices(state, false, false));
    const toggleIsOpenAddNewModal = () => {
        setIsOpenAddNewModal(prev => !prev);
    };
    const [text, setText] = useState("");
    useEffect(() => {
        let amount = 0;
        if (text.length > 0) {
            const textArr = text.split(" ");
            for (let i = 0; i < textArr.length - 1; i++) {
                if (textArr[i] === "Сумма") {
                    amount = +textArr[i + 1].split("-").join(".");
                }
            }
        }
        const currentInvoice = invoices.filter(invoice => invoice.amount === amount)[0];
        if (currentInvoice && currentInvoice.id && file) {
            const onLoadingPaymentOrderFile = (name: string, filePatch: string) => {
                const newPaid = {
                    isPaid: true, userId: user.id, date: getDateInMilliseconds(), paymentOrderFileLink: filePatch,
                };
                dispatch(fetchUpdateInvoice({invoiceId: currentInvoice.id, newPaid: newPaid}));
            };
            dispatch(fetchUploadFile({
                file: file,
                updateFile: onLoadingPaymentOrderFile,
                setIsUpdateFileLoading: setIsUploadFileLoading,
            }));
            dispatch(setMessage({
                text: "Платёжное поручение успешно прикреплено",
                severity: MESSAGE_SEVERITY.success,
            }));
        }
        if (file && !amount) {
            dispatch(setMessage({text: "Не удалось распознать сумму", severity: MESSAGE_SEVERITY.error}));
        } else {
            if (file && !currentInvoice) {
                dispatch(setMessage({
                    text: `Нет неоплаченных счетов с суммой ${amount}`,
                    severity: MESSAGE_SEVERITY.error,
                }));
            }
        }
        setFile(null);
        setIsUploadFileLoading(false);
    }, [text]);

    const handleFileChange = async (event: any) => {
        setIsUploadFileLoading(true);
        const file = event.target.files[0];
        if (file) {
            try {
                setFile(file);
                const fileReader = new FileReader();
                fileReader.onload = async () => {
                    const url = fileReader.result;
                    const pdf = await pdfjs.getDocument(url).promise;
                    const totalPages = pdf.numPages;
                    let fullText = "";

                    for (let pageNum = 1; pageNum <= totalPages; pageNum++) {
                        const page = await pdf.getPage(pageNum);
                        const content = await page.getTextContent();
                        const pageText = content.items.map((item) => item.str).join(" ");
                        fullText += pageText + " ";
                    }
                    setText(fullText);
                };

                fileReader.readAsDataURL(file);
            } catch (error) {
                alert("Ошибка при чтении PDF файла:", error);
                setIsUploadFileLoading(false);
            }
        }
    };

    return (
        <Stack sx={{maxWidth: 1350, width: "100%"}} direction="row" alignItems="center"
               justifyContent="space-between">
            <Typography variant="h2" fontSize="24px" fontWeight={700}>
                Счета
            </Typography>
            <FormGroup sx={{width: "100%"}}>
                <Stack sx={{width: "100%"}} direction={"row"} alignItems={"center"} justifyContent={"space-around"}>
                    <FormControlLabel
                        control={<Checkbox checked={isShowCanceledInvoice}
                                           onChange={handleCanceledInvoiceChange}/>}
                        label="показать отменённые"/>
                    <FormControlLabel
                        control={<Checkbox checked={isShowPaidInvoice}
                                           onChange={handlePaidInvoiceChange}/>}
                        label="показать оплаченные"/>
                </Stack>
            </FormGroup>
            <ButtonGroup aria-label="outlined primary button group">
                <LoadingButton
                    component="label"
                    loading={isUploadFileLoading}
                    variant={"outlined"}
                    startIcon={(<AttachFileIcon/>)}>
                    {isUploadFileLoading
                        ? ".....Анализ....."
                        : "Платёжное"}
                    <input
                        type="file"
                        accept="application/pdf"
                        hidden
                        onChange={handleFileChange}
                    />
                </LoadingButton>
                <Button startIcon={(<AddIcon/>)}
                        variant="contained"
                        size="large"
                        onClick={toggleIsOpenAddNewModal}>
                    Счёт
                </Button>
            </ButtonGroup>
            <InvoicesAddNew isOpenModal={isOpenAddNewModal} handleToggleOpen={toggleIsOpenAddNewModal}/>
        </Stack>
    );
};

export default InvoicesHeader;