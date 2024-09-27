import React, {useState} from "react";
import PageLayout from "../components/PageLayout";
import {useAppDispatch, useAppSelector} from "../hooks/redux";
import {getMachineryById} from "../store/selectors/machinery";
import {useNavigate, useParams} from "react-router-dom";
import {routes} from "../utils/routes";
import {ListSubheader, Stack, Typography} from "@mui/material";
import TitleWithValue from "../components/TitleWithValue";
import OrdersList from "../components/OrdersList";
import {getRelatedOrdersByMachineryId} from "../store/selectors/orders";
import PageHeaderWithTitleAndTwoButtons from "../components/PageHeaderWithTitleAndTwoButtons";
import MachineryAddNotice from "../components/MachineryAddNotice";
import MachineryNoticeItem from "../components/MachineryNoticeItem";
import List from "@mui/material/List";
import {fetchUpdateMachinery} from "../store/actionsCreators/machinery";
import {getIsAuth, getUser} from "../store/selectors/auth";
import MessageWindow from "../components/MessageWindow";
import Button from "@mui/material/Button";
import {MachineryStatus} from "utils/const";
import {MachineryStatusType} from "models/iMachinery";

const errorDeleteNoticeMessage = "Авторизируйтесь для удаления заметки.";

const MachineryDetails = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const machineryId = useParams().machineryId || "0";
    const [isOpenAddNoticeModal, setIsOpenNoticeNewModal] = useState(false);
    const [isOpenErrorMessageWindow, setIsOpenErrorMessageWindow] = useState(false);
    const user = useAppSelector((state) => getUser(state));
    const isAuth = useAppSelector(getIsAuth
    )
    const toggleIsOpenAddNoticeModal = () => {
        setIsOpenNoticeNewModal((prev) => !prev);
    };
    const toggleIsOpenErrorMessageWindow = () => {
        setIsOpenErrorMessageWindow((prev) => !prev);
    };
    const machinery = useAppSelector((state) => getMachineryById(state, machineryId))[0];
    const relatedOrders = useAppSelector((state) => getRelatedOrdersByMachineryId(state, machineryId));
    const handleBackClick = () => {
        navigate(routes.machinery);
    };
    const toggleIsActive = (createdDate: number) => () => {
        if (machinery.notices && machinery.notices.length) {
            const newNotices = machinery.notices.map((notice) =>
                notice.createdDate === createdDate
                    ? {
                        ...notice,
                        isActive: !notice.isActive,
                    }
                    : notice,
            );
            dispatch(fetchUpdateMachinery({...machinery, notices: newNotices}));
        }
    };
    const deleteNotice = (createdDate: number) => () => {
        if (user && user.id) {
            if (machinery.notices && machinery.notices.length) {
                const newNotices = machinery.notices.filter((notice) => notice.createdDate !== createdDate);
                dispatch(fetchUpdateMachinery({...machinery, notices: newNotices}));
            }
        } else {
            toggleIsOpenErrorMessageWindow();
        }
    };
    const handleChangeStatus = () => {
        if (isAuth) {
            let newStatus: MachineryStatusType = MachineryStatus.disActive
            if (machinery.status && machinery.status === MachineryStatus.disActive) {
                newStatus = MachineryStatus.active
            }
            dispatch(fetchUpdateMachinery({...machinery, status: newStatus}));
        }
    };
    const noticesList = machinery.notices?.map((notice) => (
        <MachineryNoticeItem
            key={notice.createdDate}
            notice={notice}
            deleteNotice={deleteNotice(notice.createdDate)}
            toggleIsActive={toggleIsActive(notice.createdDate)}
        />
    ));
    return (
        <PageLayout>
            <PageHeaderWithTitleAndTwoButtons
                title={`${machinery.brand} ${machinery.model}`}
                rightButtonText={"+ Заметка"}
                leftButtonText={"Назад"}
                handleLeftButtonClick={handleBackClick}
                handleRightButtonClick={toggleIsOpenAddNoticeModal}
            />
            <Stack sx={{width: "100%", paddingTop: "50px", justifyContent: "space-between"}} direction="row"
                   spacing={2}>
                <Stack spacing={2} sx={{maxWidth: "500px", width: "100%"}}>
                    <TitleWithValue title={"Тип:"} value={machinery.type}/>
                    <TitleWithValue title={"VIN:"} value={machinery.vin}/>
                    <TitleWithValue title={"Год выпуска:"} value={machinery.yearManufacture}/>
                    <TitleWithValue title={"Гос. номер:"} value={machinery.stateNumber}/>
                </Stack>
                <Stack spacing={2} sx={{
                    justifyContent: "space-between",
                    alignItems: "flex-end",
                    maxWidth: "300px",
                    width: "100%",
                }}>
                    <TitleWithValue title={"Статус:"}
                                    value={machinery.status && machinery.status === MachineryStatus.disActive
                                        ? MachineryStatus.disActive
                                        : MachineryStatus.active}/>
                    <Stack>
                        <Button variant="outlined" color="error" disabled={!isAuth} onClick={handleChangeStatus}>
                            {machinery.status && machinery.status === MachineryStatus.disActive
                                ? "Востановить"
                                : "Списать"
                            }
                        </Button>
                        {!isAuth && (
                            <Typography fontSize={"12px"}>Авторизуйтесь</Typography>
                        )}
                    </Stack>

                </Stack>
            </Stack>
            {machinery.notices && machinery.notices.length && (
                <List sx={{width: "100%", bgcolor: "background.paper"}}
                      subheader={<ListSubheader>Заметки:</ListSubheader>}>
                    {noticesList}
                </List>
            )}
            {relatedOrders && relatedOrders.length > 0 && (
                <Stack sx={{width: "100%"}} spacing={1}>
                    <Typography fontSize={"16px"} fontWeight={600}>
                        Заявки на запчасти:
                    </Typography>
                    <OrdersList orders={relatedOrders}/>
                </Stack>
            )}
            <MachineryAddNotice isOpenModal={isOpenAddNoticeModal} handleToggleOpen={toggleIsOpenAddNoticeModal}/>
            <MessageWindow
                isOpenModal={isOpenErrorMessageWindow}
                handleToggleOpen={toggleIsOpenErrorMessageWindow}
                message={errorDeleteNoticeMessage}
            />
        </PageLayout>
    );
};

export default MachineryDetails;
