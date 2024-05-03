import React, {useEffect, useState} from "react";
import ShipmentsList from "../components/ShipmentsList";
import ShipmentsInfo from "../components/ShipmentsInfo";
import PageHeaderWithTitleAndButton from "../components/PageHeaderWithTitleAndButton";
import {routes} from "../utils/routes";
import ShipmentsHelper from "../components/ShipmentsHelper";
import PageLayout from "../components/PageLayout";
import {useAppSelector} from "../hooks/redux";
import {getShipments} from "../store/selectors/shipments";
import {useSearchParams} from "react-router-dom";
import ShipmentsFilter from "../components/ShipmentsFilter";
import {ALL} from "../utils/const";
import {IShipments} from "../models/iShipments";

const Shipments = () => {
    const [transportersFilterParams, setTransportersFilterParams] = useSearchParams(ALL)
    const shipments = useAppSelector(state => getShipments(state));
    const [filteredShipments, setFilteredShipments] = useState<IShipments []>(shipments);
    const transportFilter = transportersFilterParams.get("transportFilter") || ALL
    const setTransportersFilter = (value: string) => {
        if (value === ALL) {
            setTransportersFilterParams({})
        } else {
            setTransportersFilterParams({transportFilter: value})
        }
    }
    useEffect(()=> {
        let newFilteredShipments = [...shipments]
        if (transportFilter !== ALL) {
            newFilteredShipments = [...newFilteredShipments.filter(shipment => shipment.transporter === transportFilter)]
        }
        setFilteredShipments(newFilteredShipments)
    }, [transportFilter])
    return (
        <PageLayout maxWidth={1000}>
            <PageHeaderWithTitleAndButton route={routes.addNewShipments}
                                          title={" Отгрузки:"}
                                          buttonText={"Отгрузка"}
                                          maxWidth={"1000px"}/>
            <ShipmentsInfo/>
            <ShipmentsFilter transportFilter={transportFilter}
                             setTransportersFilter={setTransportersFilter}/>
            <ShipmentsList shipments={filteredShipments}/>
            <ShipmentsHelper/>
        </PageLayout>
    );
};

export default Shipments;