import React from "react";
import PageLayout from "../components/PageLayout";
import PageHeaderWithTitleAndButton from "../components/PageHeaderWithTitleAndButton";
import {routes} from "../utils/routes";

const Machinery = () => {
    return (
        <PageLayout>
            <PageHeaderWithTitleAndButton route={routes.addNewMachinery} title={"Техника"} buttonText={"Техника"}/>
            Machinery
        </PageLayout>
    );
};

export default Machinery;