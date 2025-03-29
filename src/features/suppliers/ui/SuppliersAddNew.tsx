import React, {FC, useEffect, useState} from "react";
import {Button, Stack, Typography} from "@mui/material";
import {useAppDispatch} from "../../../hooks/redux";

import {fetchAddSupplier, fetchCompanyDataByInn} from "../model/actions";
import SupplierView from "./SupplierView";
import {useEditor} from "../../../hooks/useEditor";
import {INewSupplier} from "../../../models/iSuppliers";
import {supplierValidate} from "../../../utils/validators";
import {newSupplier} from "../utils/consts";
import SaveIcon from "@mui/icons-material/Save";
import LoadingButton from "@mui/lab/LoadingButton";

interface IProps {
    onClose: (event: React.KeyboardEvent | React.MouseEvent) => void;
}

const SupplierAddNew: FC<IProps> = ({onClose}) => {
    const dispatch = useAppDispatch();
    const [isLoading, setIsLoading] = useState(false);
    const {
        editedValue,
        errors,
        handleFieldChange,
        setEditedValue,
        validateValue,
    } = useEditor<INewSupplier>({initialValue: newSupplier, validate: supplierValidate});
    console.log(errors);
    useEffect(() => {
        const fetchData = async () => {
            if (`${editedValue.INN}`.length > 9 && `${editedValue.INN}`.length < 13) {
                setIsLoading(true);
                const res = await fetchCompanyDataByInn(editedValue.INN);
                if (res && res[0]) {
                    setEditedValue(prev => ({
                        ...prev, name: res[0].value,
                        Legal_address: res[0].data.address.unrestricted_value,
                        kpp: res[0].data.kpp,
                        okato: res[0].data.okato,
                        ogrn: res[0].data.ogrn,
                        okogu: res[0].data.okogu,
                        okpo: res[0].data.okpo,
                    }));
                }
            }
            setIsLoading(false);
        };
        void fetchData();
    }, [editedValue.INN]);
    useEffect(() => {
        validateValue();
    }, [editedValue.name]);
    const saveClickHandler = (e: React.MouseEvent) => {
        dispatch(fetchAddSupplier({...editedValue}));
        onClose(e);
    };
    return (
        <>
            <Typography variant="h5" color="primary" fontSize={18} fontWeight={500} mb={2}>
                Новый поставщик
            </Typography>
            <SupplierView supplier={editedValue}
                          fieldChangeHandler={handleFieldChange}
                          errors={errors}
                          isEditMode={true}/>
            <Stack direction="row" alignItems="center" justifyContent="space-between">
                <Button onClick={onClose} variant="outlined">
                    Назад
                </Button>
                <LoadingButton
                    onClick={saveClickHandler}
                    loading={isLoading}
                    variant="contained"
                    loadingPosition="end"
                    startIcon={<SaveIcon/>}
                    disabled={!!Object.keys(errors).length}
                    color="success"
                >
                    Сохранить
                </LoadingButton>
            </Stack>
        </>
    );
};

export default SupplierAddNew;
