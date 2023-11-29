import React, {useEffect, useId, useState} from "react";
import PageLayout from "../components/PageLayout";
import PageHeaderWithTitleAndTwoButtons from "../components/PageHeaderWithTitleAndTwoButtons";
import {useLocation, useNavigate} from "react-router-dom";
import {routes} from "../utils/routes";
import {useInput} from "../hooks/useInput";
import {
    FormControl,
    FormHelperText,
    MenuItem,
    Select,
    SelectChangeEvent,
    TextField,
    useMediaQuery,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import {fetchAddMachinery} from "../store/actionsCreators/machinery";
import {useAppDispatch} from "../hooks/redux";

export const machineryTypes = ["Легковые а/м", "Грузовые а/м", "Спецтехника", "Другое"];
export const yearsManufacture = ["1990", "1991", "1992", "1993", "1994", "1995", "1996", "1997", "1998", "1999",
    "2000", "2001", "2002", "2003", "2004", "2005", "2006", "2007", "2008", "2009",
    "2010", "2011", "2012", "2013", "2014", "2015", "2016", "2017", "2018", "2019",
    "2020", "2021", "2022", "2023", "2024"];

const MachineryAddNew = () => {
    const dispatch = useAppDispatch();
    const location = useLocation();
    const navigate = useNavigate();
    const handleBackClick = () => {
        navigate(location.state && location.state.from ? location.state.from : routes.machinery);
    };
    const vin = useInput("", {isEmpty: true, minLength: 17});
    const brand = useInput("", {isEmpty: true, minLength: 3});
    const model = useInput("", {isEmpty: true, minLength: 2});
    const stateNumber = useInput("", {isEmpty: true, minLength: 8});
    const [type, setType] = useState(machineryTypes[0]);
    const [year, setYear] = useState(yearsManufacture[10]);
    const matches_700 = useMediaQuery("(min-width:700px)");
    const selectTypeId = useId();
    const selectYearId = useId();
    const fetchVIN = async () => {
        const url_1 = `https://vpic.nhtsa.dot.gov/api/vehicles/decodevinextended/${vin.value}?format=json`
        const res = await fetch(url_1);
        const decodeRes = await res.json();
        if (decodeRes && decodeRes.Results) {
            if (decodeRes.Results[7].Value && decodeRes.Results[7].Value.length > 2) {
                brand.set(decodeRes.Results[7].Value);
            }
            if (decodeRes.Results[9].Value && decodeRes.Results[9].Value.length > 2) {
                model.set(decodeRes.Results[9].Value);
            }
        }
    };
    useEffect(() => {
        if (vin.value.length === 17) {
            fetchVIN();
        }
    }, [vin.value]);
    const handleTypeChange = (e: SelectChangeEvent) => {
        setType(e.target.value as string);
    };
    const handleYearChange = (e: SelectChangeEvent) => {
        setYear(e.target.value as string);
    };
    const typeList = machineryTypes.map(type => (
        <MenuItem key={type}
                  value={type}>{type}</MenuItem>));
    const yearManufactureList = yearsManufacture.map(year => (
        <MenuItem key={year}
                  value={year}>{year}</MenuItem>));
    const handleAddClick = () => {
        dispatch(fetchAddMachinery({
            brand: brand.value,
            model: model.value,
            yearManufacture: year,
            type: type,
            vin: vin.value,
            stateNumber: stateNumber.value,
        }));
        navigate(routes.machinery)
    };
    return (
        <PageLayout>
            <PageHeaderWithTitleAndTwoButtons
                leftButtonText={"Назад"}
                rightButtonText={"Сохранить"}
                title={"Новая техника"}
                handleLeftButtonClick={handleBackClick}
                isRightButtonDisabled={!brand.isValid || !model.isValid}
                handleRightButtonClick={handleAddClick}/>
            <Grid container columnSpacing={4} pt={matches_700 ? 1 : 0}>
                <Grid xs={matches_700 ? 6 : 12} sx={{minHeight: "100px"}}>
                    <FormControl fullWidth>
                        <Select
                            id={selectTypeId}
                            defaultValue={""}
                            value={type}
                            onChange={handleTypeChange}
                            sx={{overflow: "hidden"}}
                            fullWidth
                        >
                            {typeList}
                        </Select>
                        <FormHelperText>Тип</FormHelperText>
                    </FormControl>
                </Grid>
                <Grid xs={matches_700 ? 6 : 12} sx={{minHeight: "100px"}}>
                    <TextField onChange={vin.onChange}
                               value={vin.value}
                               fullWidth
                               label={"VIN номер"}
                               error={!!vin.error}
                               helperText={vin.error}/>
                </Grid>
                <Grid xs={matches_700 ? 6 : 12} sx={{minHeight: "100px"}}>
                    <TextField onChange={brand.onChange}
                               value={brand.value}
                               fullWidth
                               label={"Марка"}
                               error={!!brand.error}
                               helperText={brand.error}/>
                </Grid>
                <Grid xs={matches_700 ? 6 : 12} sx={{minHeight: "100px"}}>
                    <TextField onChange={model.onChange}
                               value={model.value}
                               fullWidth
                               label={"Модель"}
                               error={!!model.error}
                               helperText={model.error}/>
                </Grid>
                <Grid xs={matches_700 ? 6 : 12} sx={{minHeight: "100px"}}>
                    <FormControl fullWidth>
                        <Select
                            id={selectYearId}
                            defaultValue={""}
                            value={year}
                            onChange={handleYearChange}
                            sx={{overflow: "hidden"}}
                            fullWidth
                        >
                            {yearManufactureList}
                        </Select>
                        <FormHelperText>Год выпуска</FormHelperText>
                    </FormControl>
                </Grid>
                <Grid xs={matches_700 ? 6 : 12} sx={{minHeight: "100px"}}>
                    <TextField onChange={stateNumber.onChange}
                               value={stateNumber.value}
                               fullWidth
                               label={"Гос номер"}
                               error={!!stateNumber.error}
                               helperText={stateNumber.error}/>
                </Grid>
            </Grid>
        </PageLayout>
    );
};

export default MachineryAddNew;