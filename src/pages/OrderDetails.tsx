import React, {useEffect, useState} from "react";
import {Typography} from "@mui/material";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../hooks/redux";
import {
    setCurrenOrderIsEdit,
    setCurrentOrder,
} from "../store/reducers/orders";
import {emptyOrder} from "../models/iOrders";
import {
    getCurrentOrder,
    getCurrentOrderIsEdit,
    getOrderById,
    getRelatedInvoicesByOrderID,
} from "../store/selectors/orders";
import OrderPositionsList from "../components/OrderPositionsList";
import {fetchAddOrder, fetchUpdateOrder} from "../store/actionsCreators/orders";
import {getDateInMilliseconds} from "../utils/services";
import OrderDetailsInfo from "../components/OrderDetailsInfo";
import InvoicesList from "../components/InvoicesList";
import {routes} from "../utils/routes";
import PageHeaderWithTitleAndTwoButtons from "../components/PageHeaderWithTitleAndTwoButtons";
import PageLayout from "../components/PageLayout";
import OrderDetailsEditTitle from "../components/OrderDetailsEditTitle";

const OrderDetails = () => {
    const [isValidate, setIsValidate] = useState(false);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const orderId = useParams().orderId || "0";
    const isNewOrder = orderId === "new_order";
    const currentOrder = useAppSelector(state => getCurrentOrder(state));
    const order = useAppSelector(state => getOrderById(state, orderId));
    const isEdit = useAppSelector(state => getCurrentOrderIsEdit(state));
    const relatedInvoices = useAppSelector(state => {
        if (isNewOrder) {
            return null;
        } else {
            return getRelatedInvoicesByOrderID(state, orderId);
        }
    });
    useEffect(() => {
        if (isNewOrder) {
            dispatch(setCurrentOrder(emptyOrder));
            dispatch(setCurrenOrderIsEdit(true));
        } else {
            dispatch(setCurrentOrder(order));
            dispatch(setCurrenOrderIsEdit(false));
        }
    }, [order]);
    useEffect(() => {
        if (currentOrder.title.length > 4 && currentOrder.orderItems[0].name.length > 2) {
            setIsValidate(true);
        } else {
            setIsValidate(false);
        }
    }, [currentOrder]);
    const handleAddClick = () => {
        if (isNewOrder) {
            const {id, ...newOrder} = currentOrder;
            dispatch(fetchAddOrder({...newOrder, author: {userId: "", dateCreating: getDateInMilliseconds()}}));
            dispatch(setCurrentOrder(emptyOrder));
        } else {
            dispatch(fetchUpdateOrder(currentOrder));
            dispatch(setCurrenOrderIsEdit(false));
        }
        setIsValidate(false);
    };

    const toggleIsEdit = () => {
        dispatch(setCurrenOrderIsEdit(!isEdit));
    };
    const handleBackClick = () => {
        if (location.state && location.state.from) {
            navigate(location.state.from);
        } else {
            navigate(routes.orders);
        }
    };
    return (
        <PageLayout>
            <PageHeaderWithTitleAndTwoButtons leftButtonText={isEdit && !isNewOrder ? "Отмена" : "Назад"}
                                              rightButtonText={isEdit ? "Сохранить" : "Редактировать"}
                                              title={isNewOrder ? "Новая заявка" : currentOrder.title}
                                              handleLeftButtonClick={isEdit && !isNewOrder ? toggleIsEdit : handleBackClick}
                                              handleRightButtonClick={isEdit ? handleAddClick : toggleIsEdit}
                                              isRightButtonDisabled={!isValidate}/>
            {isEdit && (
                <OrderDetailsEditTitle title={currentOrder.title}/>
            )}
            <OrderDetailsInfo isEdit={isEdit}
                              currentOrder={currentOrder}
                              isNewOrder={isNewOrder}/>
            <OrderPositionsList orderItems={currentOrder.orderItems}
                                isEdit={isEdit}
                                orderId={orderId}
                                isSelectPositionMode={false}/>
            {relatedInvoices && relatedInvoices.length > 0 && !isEdit && (
                <>
                    <Typography fontSize={"20px"} fontWeight={600}>
                        Связанные счета:
                    </Typography>
                    <InvoicesList invoices={relatedInvoices}/>
                </>
            )}
        </PageLayout>
    );
};

export default OrderDetails;