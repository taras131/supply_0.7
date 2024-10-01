import React, {useState} from "react";
import PageLayout from "../components/PageLayout";
import PageHeaderWithTitleAndButton from "../components/PageHeaderWithTitleAndButton";
import {routes} from "../utils/routes";
import {useAppSelector} from "../hooks/redux";
import {getMachinery, getMachineryByType} from "../store/selectors/machinery";
import MachineryList from "../components/MachineryList";
import {machineryTypes} from "utils/const";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";

const Machinery = () => {
    const [isVisibleDisActiveMachinery, setIsVisibleDisActiveMachinery] = useState(false)
    const handleChangeIsVisibleDisActiveMachinery = () => {
        setIsVisibleDisActiveMachinery(prev => !prev)
    }
    const machinery = machineryTypes.map(item => {
        return {
            type: item,
            list: useAppSelector((state) => getMachineryByType(state, item, isVisibleDisActiveMachinery)),
        }
    }).filter(item => item.list.length)
    const machineryList = machinery.map(item => {
        return (
            <MachineryList title={item.type} machinery={item.list} key={item.type}/>
        )
    })
    return (
        <PageLayout maxWidth={1000}>
            <PageHeaderWithTitleAndButton route={routes.addNewMachinery} title={"Техника"} buttonText={"Техника"}/>
            {machineryList}
            <FormGroup>
                <FormControlLabel control={<Switch checked={isVisibleDisActiveMachinery}
                                                   onChange={handleChangeIsVisibleDisActiveMachinery}
                                                   inputProps={{'aria-label': 'controlled'}}/>}
                                  label="Показать списанные"/>
            </FormGroup>
        </PageLayout>
    );
};

export default Machinery;
