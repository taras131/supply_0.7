import React, {useEffect} from "react";
import PageLayout from "../components/PageLayout";
import PageHeaderWithTitleAndTwoButtons from "../components/PageHeaderWithTitleAndTwoButtons";
import {useLocation, useNavigate} from "react-router-dom";
import {routes} from "../utils/routes";
import {useInput} from "../hooks/useInput";
import {TextField} from "@mui/material";

const MachineryAddNew = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const handleBackClick = () => {
        navigate(location.state && location.state.from ? location.state.from : routes.machinery);
    };
    const vin = useInput("", {isEmpty: true, minLength: 17})
    const brand = useInput("", {isEmpty: true, minLength: 3})
    const model = useInput("", {isEmpty: true, minLength: 2})
    const fetchVIN = async () => {
        const url_1 = `https://vpic.nhtsa.dot.gov/api/vehicles/decodevinextended/${vin.value}?format=json`
        const res = await fetch(url_1)
        const decodeRes = await res.json();
        if(decodeRes && decodeRes.Results) {
            brand.set(decodeRes.Results[7].Value)
            model.set(decodeRes.Results[9].Value)
        }
        console.log(decodeRes)
        return decodeRes
    }
    useEffect(() => {
        if (vin.value.length === 17) {
            const car = fetchVIN();
        }
    }, [vin])
    return (
        <PageLayout>
            <PageHeaderWithTitleAndTwoButtons
                leftButtonText={"Назад"}
                rightButtonText={"Сохранить"}
                title={"Новая техника"}
                handleLeftButtonClick={handleBackClick}
                handleRightButtonClick={handleBackClick}/>
            MachineryAddNew
            <TextField onChange={vin.onChange}
                       value={vin.value}
                       label={"VIN номер"}/>
            <TextField onChange={brand.onChange}
                       value={brand.value}
                       label={"Марка"}/>
            <TextField onChange={model.onChange}
                       value={model.value}
                       label={"Модель"}/>
        </PageLayout>
    );
};

export default MachineryAddNew;