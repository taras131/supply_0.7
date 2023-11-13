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
import OrderDetailsEditHelper from "../components/OrderDetailsEditHelper";

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
        if (isNewOrder && currentOrder.id === "new") {
            if (currentOrder.title || currentOrder.orderItems[0].name || currentOrder.orderItems[0].catalogNumber) {
                localStorage.setItem("newOrder", JSON.stringify(currentOrder));
            }
        }
    }, [currentOrder, isNewOrder]);
    useEffect(() => {
        if (isNewOrder) {
            const savedOrder = localStorage.getItem("newOrder");
            if (savedOrder) {
                dispatch(setCurrentOrder(JSON.parse(savedOrder)));
            } else {
                dispatch(setCurrentOrder(emptyOrder));
            }
            dispatch(setCurrenOrderIsEdit(true));
        } else {
            dispatch(setCurrentOrder(order));
            dispatch(setCurrenOrderIsEdit(false));
        }
    }, [order, isNewOrder]);
    useEffect(() => {
        const filteredOrderItems = currentOrder.orderItems.filter(orderItem => !!orderItem.name || !!orderItem.catalogNumber);
        if (filteredOrderItems.length > 0 && currentOrder.title) {
            setIsValidate(true);
        } else {
            setIsValidate(false);
        }
    }, [currentOrder]);
    const handleAddClick = () => {
        const filteredOrderItems = currentOrder.orderItems.filter(orderItem => !!orderItem.name || !!orderItem.catalogNumber);
        if (isNewOrder) {
            const {id, ...newOrder} = currentOrder;
            dispatch(fetchAddOrder({
                ...newOrder,
                orderItems: filteredOrderItems,
                author: {userId: "", dateCreating: getDateInMilliseconds()},
            }));
            dispatch(setCurrentOrder(emptyOrder));
            localStorage.removeItem("newOrder");
        } else {
            dispatch(fetchUpdateOrder({...currentOrder, orderItems: filteredOrderItems}));
            dispatch(setCurrenOrderIsEdit(false));
        }
        setIsValidate(false);
        navigate(routes.orders);
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
            {isEdit && (
                <OrderDetailsEditHelper/>
            )}
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