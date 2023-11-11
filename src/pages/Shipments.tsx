import React from "react";
import ShipmentsList from "../components/ShipmentsList";
import ShipmentsInfo from "../components/ShipmentsInfo";
import PageHeaderWithTitleAndButton from "../components/PageHeaderWithTitleAndButton";
import {routes} from "../utils/routes";
import ShipmentsHelper from "../components/ShipmentsHelper";
import PageLayout from "../components/PageLayout";

const Shipments = () => {
    return (
        <PageLayout maxWidth={1000}>
            <PageHeaderWithTitleAndButton route={routes.addNewShipments}
                                          title={" Отгрузки:"}
                                          buttonText={"Отгрузка"}
                                          maxWidth={"1000px"}/>
            <ShipmentsInfo/>
            <ShipmentsList/>
            <ShipmentsHelper/>
        </PageLayout>
    );
};

export default Shipments;