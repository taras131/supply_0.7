import React from "react";
import {useAppSelector} from "hooks/redux";
import PageHeaderWithTitleAndButton from "components/PageHeaderWithTitleAndButton";
import PageLayout from "components/PageLayout";
import {routes} from "utils/routes";
import ShipmentsFilter from "features/shipments/ui/ShipmentsFilter";
import ShipmentsInfo from "features/shipments/ui/ShipmentsInfo";
import ShipmentsList from "features/shipments/ui/ShipmentsList";
import ShipmentsHelper from "features/shipments/ui/ShipmentsHelper";
import {Typography} from "@mui/material";
import {selectShipments} from "features/shipments/model/selectors";

const Shipments = () => {
    const shipments = useAppSelector(selectShipments);
    return (
        <PageLayout maxWidth={1000}>
            <PageHeaderWithTitleAndButton
                route={routes.addNewShipments}
                title={" Отгрузки:"}
                buttonText={"Отгрузка"}
                maxWidth={"1000px"}
            />
            <ShipmentsInfo/>
            <ShipmentsFilter/>
            {shipments.length
                ? (<ShipmentsList shipments={shipments}/>)
                : (<Typography pb={4} pt={4} fontSize={28}> ничего не найдено, измените условия поиска</Typography>)}
            <ShipmentsHelper/>
        </PageLayout>
    );
};

export default Shipments;
