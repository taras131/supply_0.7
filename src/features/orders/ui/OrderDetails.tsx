import React, {useEffect, useState} from "react";
import {Stack, Typography, useMediaQuery} from "@mui/material";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "hooks/redux";
import {setCurrenOrderIsEdit, setCurrentOrder} from "features/orders/model/slice";
import {emptyOrder} from "models/iOrders";
import OrderPositionsList from "features/orders/ui/OrderPositionsList";
import {getDateInMilliseconds} from "utils/services";
import OrderDetailsInfo from "features/orders/ui/OrderDetailsInfo";
import InvoicesList from "features/invoices/ui/InvoicesList";
import {routes} from "utils/routes";
import PageHeaderWithTitleAndTwoButtons from "components/PageHeaderWithTitleAndTwoButtons";
import PageLayout from "components/PageLayout";
import OrderDetailsEditTitle from "features/orders/ui/OrderDetailsEditTitle";
import OrderDetailsEditHelper from "components/OrderDetailsEditHelper";
import {getMachineryById} from "features/machinery/model/selectors";
import TitleWithValue from "components/TitleWithValue";
import {getUser} from "features/auth/model/selectors";
import {CENTER, ROW, SPACE_BETWEEN} from "styles/const";
import OrderApprovedCheckbox from "features/orders/ui/OrderApprovedCheckbox";
import Box from "@mui/material/Box";
import ExcelReader from "components/ExcelReader";
import {
    getCurrentOrder,
    getCurrentOrderIsEdit,
    getOrderById,
    getRelatedInvoicesByOrderID,
} from "features/orders/model/selectors";
import {fetchAddOrder, fetchUpdateOrder} from "features/orders/model/actions";
import OrderChangeCancelledButton from "features/orders/ui/OrderChangeCancelledButton";
import {getUserFullNameById} from "../../users/model/selectors";
import MachineryTable from "../../machinery/ui/MachineryTable";
import MachineryTableRow from "../../machinery/ui/MachineryTableRow";

const OrderDetails = () => {
    const [isValidate, setIsValidate] = useState(false);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const orderId = useParams().orderId || "0";
    const isNewOrder = orderId === "new_order";
    const currentOrder = useAppSelector(getCurrentOrder);
    const order = useAppSelector((state) => getOrderById(state, orderId));
    const isEdit = useAppSelector(getCurrentOrderIsEdit);
    const authorFullName = useAppSelector((state) => getUserFullNameById(state, +currentOrder.author.userId));
    const user = useAppSelector((state) => getUser(state));
    const matches_700 = useMediaQuery("(min-width:700px)");
    const machinery = useAppSelector((state) => {
        if (order && order.machineryId) {
            return getMachineryById(state, order.machineryId);
        } else {
            return "";
        }
    });
    const relatedInvoices = useAppSelector((state) => {
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
        const filteredOrderItems = currentOrder.orderItems.filter(
            (orderItem) => !!orderItem.name || !!orderItem.catalogNumber,
        );
        if (filteredOrderItems.length > 0 && currentOrder.title) {
            setIsValidate(true);
        } else {
            setIsValidate(false);
        }
    }, [currentOrder]);
    const handleAddClick = () => {
        const filteredOrderItems = currentOrder.orderItems.filter(
            (orderItem) => !!orderItem.name || !!orderItem.catalogNumber,
        );
        if (isNewOrder) {
            const {id, ...newOrder} = currentOrder;
            dispatch(
                fetchAddOrder({
                    ...newOrder,
                    orderItems: filteredOrderItems,
                    author: {userId: user.id, dateCreating: getDateInMilliseconds()},
                    machineryId: newOrder.machineryId !== "empty" ? newOrder.machineryId : "",
                }),
            );
            dispatch(setCurrentOrder(emptyOrder));
            localStorage.removeItem("newOrder");
        } else {
            dispatch(
                fetchUpdateOrder({
                    ...currentOrder,
                    orderItems: filteredOrderItems,
                    author: {...currentOrder.author, userId: user.id},
                }),
            );
        }
        dispatch(setCurrenOrderIsEdit(false));
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
        dispatch(setCurrenOrderIsEdit(false));
    };

    return (
        <PageLayout>
            <PageHeaderWithTitleAndTwoButtons
                leftButtonText={isEdit && !isNewOrder ? "Отмена" : "Назад"}
                rightButtonText={isEdit ? "Сохранить" : "Редактировать"}
                title={isNewOrder ? "Новая заявка" : currentOrder.title}
                handleLeftButtonClick={isEdit && !isNewOrder ? toggleIsEdit : handleBackClick}
                handleRightButtonClick={isEdit ? handleAddClick : toggleIsEdit}
                isRightButtonDisabled={!isValidate}
            />
            {isEdit && <OrderDetailsEditTitle title={currentOrder.title}/>}
            <OrderDetailsInfo isEdit={isEdit} currentOrder={currentOrder}/>
            <OrderPositionsList
                orderItems={currentOrder.orderItems}
                isEdit={isEdit}
                orderId={orderId}
                isSelectPositionMode={false}
            />
            {machinery && !isEdit && (
                <>
                    <Box sx={{width: "100%"}}>
                        <Typography fontSize={matches_700 ? "18px" : "14px"} fontWeight={550}>
                            Прикреплённая техника:
                        </Typography>
                    </Box>
                    <MachineryTableRow row={machinery}/>
                </>
            )}
            {relatedInvoices && relatedInvoices.length > 0 && !isEdit && (
                <>
                    <Box sx={{width: "100%"}}>
                        <Typography fontSize={matches_700 ? "18px" : "14px"} fontWeight={550}>
                            Связанные счета:
                        </Typography>
                    </Box>
                    <InvoicesList invoices={relatedInvoices}/>
                </>
            )}
            <Stack direction={ROW} alignItems={CENTER} justifyContent={SPACE_BETWEEN} sx={{width: "100%"}}>
                {authorFullName && (
                    <TitleWithValue width={"200px"} title={"Автор:"}>
                        {authorFullName ? authorFullName : "неизвестен"}
                    </TitleWithValue>
                )}
                <Stack direction={ROW} alignItems={CENTER} spacing={1}>
                    <Typography fontWeight={600}>Одобрена</Typography>
                    <OrderApprovedCheckbox order={currentOrder}/>
                </Stack>
                {isNewOrder
                    ? (<ExcelReader/>)
                    : (<OrderChangeCancelledButton currentOrder={currentOrder}/>)}
            </Stack>
            {isEdit && <OrderDetailsEditHelper isNewOrder={isNewOrder}/>}
        </PageLayout>
    );
};

export default OrderDetails;
