import React, {FC, useId} from "react";
import {useAppDispatch, useAppSelector} from "../hooks/redux";
import {getUser} from "../store/selectors/auth";
import {getDateInMilliseconds} from "../utils/services";
import {Checkbox, FormControlLabel, useMediaQuery} from "@mui/material";
import {fetchUpdateOrderApproved} from "../store/actionsCreators/orders";
import {IOrder} from "../models/iOrders";

interface IProps {
    order: IOrder
}

const ApprovedOrderCheckbox: FC<IProps> = ({order}) => {
    const checkboxId = useId();
    const dispatch = useAppDispatch();
    const user = useAppSelector(state => getUser(state));
    const matches_470 = useMediaQuery("(min-width:470px)");
    const handleApprovedChange = (e: any) => {
        e.stopPropagation();
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
                sx={{margin: 0}}
                control={<Checkbox checked={order.approved.isApproved}
                                   onChange={handleApprovedChange}
                                   color={"success"}
                                   id={checkboxId}
                                   sx={{"& .MuiSvgIcon-root": {fontSize: matches_470 ? 38 : 24}}}/>}/>
        </>
    );
};

export default ApprovedOrderCheckbox;