import React from "react";
import PageLayout from "../components/PageLayout";
import PageHeaderWithTitleAndButton from "../components/PageHeaderWithTitleAndButton";
import {routes} from "../utils/routes";
import {useAppSelector} from "../hooks/redux";
import {getMachinery} from "../store/selectors/machinery";
import MachineryList from "../components/MachineryList";

const Machinery = () => {
    const machinery = useAppSelector(state => getMachinery(state))
    return (
        <PageLayout maxWidth={1000}>
            <PageHeaderWithTitleAndButton route={routes.addNewMachinery} title={"Техника"} buttonText={"Техника"}/>
            <MachineryList machinery={machinery}/>
        </PageLayout>
    );
};

export default Machinery;