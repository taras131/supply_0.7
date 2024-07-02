import React from "react";
import { useAppSelector } from "hooks/redux";
import PageHeaderWithTitleAndButton from "components/PageHeaderWithTitleAndButton";
import PageLayout from "components/PageLayout";
import { routes } from "utils/routes";
import ShipmentsFilter from "components/ShipmentsFilter";
import ShipmentsInfo from "components/ShipmentsInfo";
import ShipmentsList from "components/ShipmentsList";
import ShipmentsHelper from "components/ShipmentsHelper";
import { selectShipments } from "features/shipments/model/shipmentsSlice";

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
      <ShipmentsInfo />
      <ShipmentsFilter />
      <ShipmentsList shipments={shipments} />
      <ShipmentsHelper />
    </PageLayout>
  );
};

export default Shipments;
