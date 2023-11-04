import React, {FC, useId} from "react";
import {useAppDispatch, useAppSelector} from "../hooks/redux";
import {getUser} from "../store/selectors/auth";
import {getDateInMilliseconds} from "../utils/services";
import {Checkbox, FormControlLabel} from "@mui/material";
import {fetchUpdateOrderApproved} from "../store/actionsCreators/orders";
import {IOrder} from "../models/iOrders";

interface IProps {
    order: IOrder
}

const ApprovedOrderCheckbox: FC<IProps> = ({order}) => {
    const checkboxId = useId();
    const dispatch = useAppDispatch();
    const user = useAppSelector(state => getUser(state));
    const handleApprovedChange = () => {
        dispatch(fetchUpdateOrderApproved({
            orderId: order.id,
            newApproved: {
                userId: user.id,
                date: getDateInMilliseconds(),
                isApproved: !order.approved.isApproved,
            },
        }));
    };
    return (
        <>
            <FormControlLabel
                label={""}
                control={<Checkbox checked={order.approved.isApproved}
                                   onChange={handleApprovedChange}
                                   color={"success"}
                                   id={checkboxId}
                                   sx={{"& .MuiSvgIcon-root": {fontSize: 38}}}/>}/>
        </>
    );
};

export default ApprovedOrderCheckbox;