import React, {FC, useEffect, useState} from "react";
import * as XLSX from "xlsx";
import {IOrderItem} from "models/iOrders";
import {useAppDispatch, useAppSelector} from "hooks/redux";
import {
    addOrderItems,
    removeOrderItems,
    updateCurrentOrderMachineryId,
    updateCurrentOrderTitle,
} from "features/orders/model/slice";
import {Button, Stack, Typography} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import {setMessage} from "store/reducers/message";
import {MESSAGE_SEVERITY} from "utils/const";
import {getWordAfter} from "utils/services";
import {getMachinery} from "features/machinery/model/selectors";
import {ROW} from "styles/const";

const ExcelReader: FC = () => {
    const [data, setData] = useState<any[]>([]);
    const [fileName, setFileName] = useState<string>("");
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useAppDispatch();
    const machineryList = useAppSelector(getMachinery);
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setIsLoading(true);
        const file = event.target.files?.[0];
        if (file) {
            setData([]);
            setFileName(file.name.split(".")[0]);
            handleResetClick();

            const reader = new FileReader();
            reader.onload = (e) => {
                const bufferArray = e.target?.result;
                const workbook = XLSX.read(bufferArray, { type: "array" });
                const sheetName = workbook.SheetNames[0];
                const sheet = workbook.Sheets[sheetName];
                const rows = XLSX.utils.sheet_to_json(sheet, { header: 1 });
                const filteredRows = rows.map(row =>
                    row.filter(cell => typeof cell === "string" || typeof cell === "number")
                ).filter(row => row.length > 0); // Remove empty rows

                setData(filteredRows as string[][]);
            };

            reader.readAsArrayBuffer(file);
        }
    };
    const handleResetClick = () => {
        localStorage.removeItem("newOrder");
        dispatch(removeOrderItems());
        dispatch(updateCurrentOrderTitle(""));
        dispatch(updateCurrentOrderMachineryId(""));
    };
    const addNewOrderItems = (orderItems: IOrderItem []) => {
        localStorage.removeItem("newOrder");
        dispatch(removeOrderItems());
        dispatch(addOrderItems(orderItems));
    };
    useEffect(() => {

        if (data.length) {
            let isBodyOrdersStart = false;
            const orderItems: IOrderItem [] = [];
            data.forEach((item: string [], index) => {
                item.forEach(str => {
                    if (str && str.length > 8 && str.includes("VIN")) {
                        const vin = getWordAfter(str, "VIN");
                        machineryList.forEach(machinery => {
                            //    console.log(machinery.vin)
                            if (vin && machinery.vin === vin.trim()) {
                                dispatch(updateCurrentOrderMachineryId(machinery.id));
                            }
                        });
                    }
                });
                if (Number(item[0]) === 1) isBodyOrdersStart = true;
                if (isBodyOrdersStart && !!item[0]) {
                    const id = index;
                    const name = item[1] as string | " ";
                    const catalogNumber = item[2] as string || " ";
                    const count = parseInt(item[3]);
                    const lastRowValue = item.reduceRight((last: any, curr: any) => {
                        if (typeof curr === "string") {
                            return last === null && curr.trim() !== "" ? curr : last;
                        } else {
                            return last;
                        }
                    }, null as string | null);
                    const comment = lastRowValue !== item[3] && lastRowValue !== item[4] ? lastRowValue : "";
                    if (count && name && name.length > 1 || catalogNumber && catalogNumber.length > 1) {
                        orderItems.push(
                            {
                                id: id,
                                name: name,
                                catalogNumber: catalogNumber,
                                count: count,
                                comment: comment,
                                isOrdered: false,
                            });
                    }
                }
            });
            if (orderItems.length) {
                dispatch(updateCurrentOrderTitle(fileName));
                addNewOrderItems(orderItems);
            } else {
                dispatch(setMessage({text: "Не удалось прочитать файл", severity: MESSAGE_SEVERITY.warning}));
            }
        }
        setIsLoading(false);
    }, [data.length]);
    return (
        <>
            {isLoading && (
                <Typography>...Загрузка...</Typography>
            )}
            <Stack direction={ROW} spacing={1}>
                <Button disabled={isLoading} variant={"outlined"} onClick={handleResetClick}>Сбросить</Button>
                <LoadingButton
                    component="label"
                    loading={isLoading}
                    variant="outlined"
                    startIcon={<FileUploadIcon/>}
                >
                    Загрузить файл
                    <input type="file" accept=".xls,.xlsx" hidden onChange={handleFileChange}/>
                </LoadingButton>
            </Stack>

        </>
    );
};

export default ExcelReader;