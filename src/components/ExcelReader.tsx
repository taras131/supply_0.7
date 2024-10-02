import React, {FC, useEffect, useState} from 'react';
import * as XLSX from 'xlsx';
import {IOrderItem} from "models/iOrders";
import {useAppDispatch} from "hooks/redux";
import {addOrderItems, removeOrderItems, updateCurrentOrderTitle} from "store/reducers/orders";
import {Button, ButtonGroup} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import FileUploadIcon from '@mui/icons-material/FileUpload';

const ExcelReader: FC = () => {
    const [data, setData] = useState<any[]>([]);
    const [fileName, setFileName] = useState<string>("");
    const dispatch = useAppDispatch()
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];

        if (file) {
            setData([])
            setFileName(file.name.split(".")[0])
            const reader = new FileReader();
            reader.onload = (e) => {
                const bufferArray = e.target?.result;

                const workbook = XLSX.read(bufferArray, {type: 'array'});
                const sheetName = workbook.SheetNames[0];
                const sheet = workbook.Sheets[sheetName];

                // Convert sheet to array of arrays
                const rows = XLSX.utils.sheet_to_json(sheet, {header: 1});

                setData(rows as string[][]);
            };
            reader.readAsArrayBuffer(file);
        }
    };
    const handleResetClick = () => {
        localStorage.removeItem("newOrder")
        dispatch(removeOrderItems())
    }
    const addNewOrderItems = (orderItems: IOrderItem []) => {
        localStorage.removeItem("newOrder")
        dispatch(removeOrderItems())
        dispatch(addOrderItems(orderItems))
    }
    useEffect(() => {
        if (data.length) {
            let isBodyOrdersStart = false
            const orderItems: IOrderItem [] = []
            data.forEach((item, index) => {
                console.log(item)
                if (item[0] == 1) isBodyOrdersStart = true
                if (isBodyOrdersStart && !!item[0]) {
                    const id = index
                    const name = item[1] as string | " "
                    const catalogNumber = item[2] as string || " "
                    const count = parseInt(item[3])
                    const lastRowValue = item.reduceRight((last: any, curr: any) => {
                        return last === null && curr.trim() !== '' ? curr : last;
                    }, null as string | null);
                    const comment = lastRowValue !== item[3] && lastRowValue !== item[4] ? lastRowValue : ""
                    if (count && name && name.length > 1 || catalogNumber && catalogNumber.length > 1) {
                        orderItems.push(
                            {
                                id: id,
                                name: name,
                                catalogNumber: catalogNumber,
                                count: count,
                                comment: comment,
                                isOrdered: false,
                            })
                    }
                }
            })
            if (orderItems.length) {
                dispatch(updateCurrentOrderTitle(fileName))
                addNewOrderItems(orderItems)
            }
        }
    }, [data.length])

    return (
        <ButtonGroup variant="outlined" aria-label="Basic button group">
            <Button onClick={handleResetClick}>Сбросить</Button>
            <LoadingButton
                variant="contained"
                component="label"
                loading={false}
                fullWidth
                startIcon={<FileUploadIcon/>}
            >
                Загрузить файл
                <input type="file" hidden onChange={handleFileChange}/>
            </LoadingButton>
        </ButtonGroup>
    );
};

export default ExcelReader;