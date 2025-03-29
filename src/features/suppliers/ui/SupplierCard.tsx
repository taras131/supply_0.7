import React, {FC, useEffect, useState} from "react";
import {useEditor} from "../../../hooks/useEditor";
import {ISupplier} from "../../../models/iSuppliers";
import {supplierValidate} from "../../../utils/validators";
import {useAppDispatch, useAppSelector} from "../../../hooks/redux";
import {selectSupplierById} from "../model/selectors";
import {defaultSupplier} from "../utils/consts";
import {Typography} from "@mui/material";
import SupplierView from "./SupplierView";
import ActionsEditButtons from "../../../components/common/ActionsEditButtons";
import {fetchUpdateSupplier} from "../model/actions";

interface IProps {
    currentSupplierId: number;
    onClose: (event: React.KeyboardEvent | React.MouseEvent) => void;
}

const SupplierCard: FC<IProps> = ({currentSupplierId, onClose}) => {
    const currentSupplier = useAppSelector(state => selectSupplierById(state, currentSupplierId));
    const dispatch = useAppDispatch();
    const [isEditMode, setIsEditMode] = useState(false);
    const {
        editedValue,
        errors,
        handleFieldChange,
        setEditedValue,
    } = useEditor<ISupplier>({initialValue: currentSupplier || defaultSupplier, validate: supplierValidate});
    useEffect(() => {
        if (currentSupplier) {
            setEditedValue(currentSupplier);
        }
    }, [currentSupplier]);
    const toggleIsEditMode = () => {
        setIsEditMode(prev => !prev);
    };
    const saveClickHandler = () => {
        dispatch(fetchUpdateSupplier({...editedValue}));
        toggleIsEditMode();
    };
    return (
        <>
            <Typography variant="h5" color="primary" fontSize={18} fontWeight={500} mb={2}>
                Поставщик
            </Typography>
            <SupplierView supplier={editedValue}
                          fieldChangeHandler={handleFieldChange}
                          errors={errors}
                          isEditMode={isEditMode}/>
            <ActionsEditButtons isEditMode={isEditMode}
                                disabled={!!Object.keys(errors).length}
                                toggleIsEditMode={toggleIsEditMode}
                                onClose={onClose}
                                saveClickHandler={saveClickHandler}/>
        </>
    );
};

export default SupplierCard;