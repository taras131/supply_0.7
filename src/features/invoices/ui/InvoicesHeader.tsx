import React, {FC, useEffect} from "react";
import {Button, ButtonGroup, Stack, Typography, useMediaQuery} from "@mui/material";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import LoadingButton from "@mui/lab/LoadingButton";
import {getDateInMilliseconds} from "utils/services";
import {getUser} from "store/selectors/auth";
import {setMessage} from "store/reducers/message";
import {MESSAGE_SEVERITY} from "utils/const";
import AddIcon from "@mui/icons-material/Add";
import {useNavigate} from "react-router-dom";
import {routes} from "utils/routes";
import {CENTER, SPACE_BETWEEN} from "styles/const";
import InvoicesInfo from "features/invoices/ui/InvoicesInfo";
import {useAppDispatch, useAppSelector} from "hooks/redux";
import {useUploadFile} from "hooks/useUploadFile";
import {selectInvoices} from "features/invoices/model/slice";
import {fetchUpdateInvoice, fetchUploadFile} from "features/invoices/model/actions";

const InvoicesHeader: FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const matches_1050 = useMediaQuery("(min-width:1050px)");
    const matches_700 = useMediaQuery("(min-width:700px)");
    const { filesWithAmount, onFileChange, paymentErrorMessage, isLoading, resetFiles } = useUploadFile();
    const user = useAppSelector((state) => getUser(state));
    const invoices = useAppSelector(selectInvoices);
    const handleAddInvoiceClick = () => {
        navigate(routes.invoices + "/add_new");
    };
    useEffect(() => {
        if (!filesWithAmount?.length) return;
        (async () => {
            // Чтобы избежать двойного прикрепления к одному и тому же счету с той же суммой в рамках этой операции
            const usedInvoiceIds = new Set<string>();
            for (const { file, amount } of filesWithAmount) {
                // Найти неоплаченный счёт на эту сумму
                const candidates = invoices.filter((inv) => !inv.paid.isPaid && inv.amount === amount);
                if (candidates.length === 0) {
                    dispatch(setMessage({
                        text: `Нет неоплаченных счетов на сумму ${amount} руб. (файл: ${file.name})`,
                        severity: MESSAGE_SEVERITY.error,
                    }));
                    continue;
                }
                // Если кандидатов несколько — сообщаем, что нужно уточнять
                if (candidates.length > 1) {
                    dispatch(setMessage({
                        text: `Найдено несколько неоплаченных счетов на сумму ${amount} руб. Уточните по номеру счета в назначении (файл: ${file.name}).`,
                        severity: MESSAGE_SEVERITY.error,
                    }));
                    continue;
                }
                const currentInvoice = candidates[0];
                if (usedInvoiceIds.has(currentInvoice.id)) {
                    // На всякий случай — защита от повторного обновления одного и того же счета в рамках одной пачки
                    dispatch(setMessage({
                        text: `Счёт уже обработан в этой загрузке (сумма ${amount} руб., файл: ${file.name}).`,
                        severity: MESSAGE_SEVERITY.error,
                    }));
                    continue;
                }
                const onLoadingPaymentOrderFile = (_name: string, filePatch: string) => {
                    const newPaid = {
                        isPaid: true,
                        userId: user.id,
                        date: getDateInMilliseconds(),
                        paymentOrderFileLink: filePatch,
                    };
                    dispatch(fetchUpdateInvoice({ invoiceId: currentInvoice.id, newPaid }));
                };
                // Последовательно — чтобы индикация и порядок были предсказуемыми
                await dispatch(fetchUploadFile({
                    file,
                    updateFile: onLoadingPaymentOrderFile,
                }));
                usedInvoiceIds.add(currentInvoice.id);
                dispatch(setMessage({
                    text: `Платёжное поручение прикреплено (файл: ${file.name})`,
                    severity: MESSAGE_SEVERITY.success,
                }));
            }
            // очистим, чтобы эффект не сработал повторно
            resetFiles();
        })();
    }, [filesWithAmount]);
    useEffect(() => {
        if (!paymentErrorMessage) return;
        dispatch(setMessage({
            text: paymentErrorMessage,
            severity: MESSAGE_SEVERITY.error,
        }));
    }, [paymentErrorMessage]);
    return (
        <Stack sx={{maxWidth: 1350, width: "100%"}} spacing={matches_700 ? 3 : 1}>
            <Stack sx={{width: "100%"}} direction="row" alignItems={CENTER} justifyContent={SPACE_BETWEEN}>
                <Typography variant="h2" fontSize="24px" fontWeight={700}>
                    Счета
                </Typography>
                {matches_1050 && <InvoicesInfo/>}
                <ButtonGroup aria-label="outlined primary button group" size={matches_700 ? "medium" : "small"}>
                    <LoadingButton
                        size={matches_700 ? "medium" : "small"}
                        component="label"
                        loading={isLoading}
                        variant={"outlined"}
                        startIcon={<AttachFileIcon/>}
                    >
                        {isLoading ? ".....Анализ....." : "Платёжное"}
                        <input type="file"
                               accept="application/pdf, .pdf"
                               hidden
                               onChange={onFileChange}
                               multiple/>
                    </LoadingButton>
                    <Button startIcon={<AddIcon/>} variant="contained" size="large" onClick={handleAddInvoiceClick}>
                        Счёт
                    </Button>
                </ButtonGroup>
            </Stack>
            {!matches_1050 && <InvoicesInfo/>}
        </Stack>
    );
};

export default InvoicesHeader;
