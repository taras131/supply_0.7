import React, {FC} from "react";
import {ICurrentMachinery} from "../../../../models/iMachinery";
import {ButtonGroup} from "@mui/material";
import Button from "@mui/material/Button";
import {MachineryStatus} from "../../utils/const";
import {useAppDispatch} from "../../../../hooks/redux";
import {fetchUpdateMachinery} from "../../model/actions";

interface IProps {
    machinery: ICurrentMachinery;
}

const MachineryReportStatusButtons: FC<IProps> = ({machinery}) => {
    const dispatch = useAppDispatch();
    const handleStatusChange = (newStatus: MachineryStatus) => {
        dispatch(fetchUpdateMachinery({...machinery, status: newStatus}));
    };
    return (
        <ButtonGroup variant="outlined" aria-label="Basic button group">
            <Button color={machinery.status === MachineryStatus.disActive ? "error" : "primary"}
                    variant={machinery.status === MachineryStatus.disActive ? "contained" : "outlined"}
                    onClick={() => handleStatusChange(MachineryStatus.disActive)}>
                {MachineryStatus.disActive}
            </Button>
            <Button
                color={machinery.status === MachineryStatus.repair ? "warning" : "primary"}
                variant={machinery.status === MachineryStatus.repair ? "contained" : "outlined"}
                onClick={() => handleStatusChange(MachineryStatus.repair)}>
                {MachineryStatus.repair}
            </Button>
            <Button color={machinery.status === MachineryStatus.active ? "success" : "primary"}
                    variant={machinery.status === MachineryStatus.active ? "contained" : "outlined"}
                    onClick={() => handleStatusChange(MachineryStatus.active)}>
                {MachineryStatus.active}
            </Button>
        </ButtonGroup>
    );
};

export default MachineryReportStatusButtons;