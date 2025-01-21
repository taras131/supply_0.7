import React, {useState} from "react";
import PageLayout from "../../../components/PageLayout";
import PageHeaderWithTitleAndButton from "../../../components/PageHeaderWithTitleAndButton";
import {routes} from "utils/routes";
import MachineryList from "./MachineryList";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import {machineryTypes} from "../model/slice";

const Machinery = () => {
    const [isVisibleDisActiveMachinery, setIsVisibleDisActiveMachinery] = useState(false);
    const handleChangeIsVisibleDisActiveMachinery = () => {
        setIsVisibleDisActiveMachinery(prev => !prev);
    };
    const machineryList = machineryTypes.map(type => {
        return (
            <MachineryList type={type} key={type.id}/>
        );
    });
    return (
        <PageLayout maxWidth={1000}>
            <PageHeaderWithTitleAndButton route={routes.addNewMachinery} title={"Техника"} buttonText={"Техника"}/>
            {machineryList}
            <FormGroup>
                <FormControlLabel control={<Switch checked={isVisibleDisActiveMachinery}
                                                   onChange={handleChangeIsVisibleDisActiveMachinery}
                                                   inputProps={{"aria-label": "controlled"}}/>}
                                  label="Показать списанные"/>
            </FormGroup>
        </PageLayout>
    );
};

export default Machinery;
