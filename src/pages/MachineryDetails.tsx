import React from "react";
import PageLayout from "../components/PageLayout";
import PageHeaderWithTitleAndButton from "../components/PageHeaderWithTitleAndButton";
import {useAppSelector} from "../hooks/redux";
import {getMachineryById} from "../store/selectors/machinery";
import {useParams} from "react-router-dom";
import {routes} from "../utils/routes";
import {Stack, Typography} from "@mui/material";
import TitleWithValue from "../components/TitleWithValue";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import Box from "@mui/material/Box";
import OrdersList from "../components/OrdersList";
import {getRelatedOrdersByMachineryId} from "../store/selectors/orders";

const MachineryDetails = () => {
    const machineryId = useParams().machineryId || "0"
    const machinery = useAppSelector(state => getMachineryById(state, machineryId))[0]
    const relatedOrders = useAppSelector(state => getRelatedOrdersByMachineryId(state, machineryId));
    return (
        <PageLayout>
            <PageHeaderWithTitleAndButton title={`${machinery.brand} ${machinery.model}`}
                                          buttonText={"Назад"}
                                          route={routes.machinery}
                                          icon={<ArrowBackIosIcon/>}/>
            <Box sx={{width: "100%"}}>
                <Stack spacing={2} sx={{maxWidth: "500px", width: "100%"}}>
                    <TitleWithValue title={"Тип:"} value={machinery.type}/>
                    <TitleWithValue title={"VIN:"} value={machinery.vin}/>
                    <TitleWithValue title={"Год выпуска:"} value={machinery.yearManufacture}/>
                    <TitleWithValue title={"Гос. номер:"} value={machinery.stateNumber}/>
                </Stack>
            </Box>
            {relatedOrders && relatedOrders.length > 0 && (
                <Stack sx={{width: "100%"}} spacing={1}>
                    <Typography fontSize={"16px"} fontWeight={600}>
                        Заявки на запчасти:
                    </Typography>
                    <OrdersList orders={relatedOrders}/>
                </Stack>
            )}
        </PageLayout>
    );
};

export default MachineryDetails;