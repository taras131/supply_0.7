import React, {useState} from "react";
import {Stack} from "@mui/material";
import PageHeaderWithBackButton from "../components/PageHeaderWithBackButton";
import {routes} from "../utils/routes";


const OrdersAddNew = () => {
    const [isValidate, setIsValidate] = useState(false);
    const handleAddClick = () => {
        setIsValidate(false);
    };
    return (
        <Stack alignItems="center" spacing={4} pt={3}>
            <PageHeaderWithBackButton title={"Новая заявка"}
                                      isValidate={isValidate}
                                      handleAddClick={handleAddClick}
                                      backRoute={routes.orders}/>
            OrdersAddNew
        </Stack>
    );
};

export default OrdersAddNew;