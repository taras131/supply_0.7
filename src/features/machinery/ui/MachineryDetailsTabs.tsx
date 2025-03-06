import React, {FC, useEffect, useState} from "react";
import Box from "@mui/material/Box";
import {Tab, Tabs} from "@mui/material";
import MachineryDetailsDocs from "./docs/MachineryDetailsDocs";
import Comments from "../../../components/common/comments/Comments";
import {useAppSelector} from "../../../hooks/redux";
import {getCurrentMachinery} from "../model/selectors";
import {TaskList} from "./tasks/TasksList";
import Problems from "./problems/Problems";
import MachineryReport from "./report/MachineryReport";
import {useLocation, useNavigate} from "react-router-dom";

interface CustomTabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function CustomTabPanel(props: CustomTabPanelProps) {
    const {children, value, index, ...other} = props;
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && <Box sx={{p: 3}}>{children}</Box>}
        </div>
    );
}

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        "aria-controls": `simple-tabpanel-${index}`,
    };
}

const MachineryDetailsTabs: FC = () => {
    const machinery = useAppSelector(getCurrentMachinery);
    const location = useLocation();
    const navigate = useNavigate();
    const queryParams = new URLSearchParams(location.search);
    const initialTab = parseInt(queryParams.get("tab") || "0", 10);
    const [value, setValue] = useState<number>(initialTab);
    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
        navigate(`?tab=${newValue}`, {replace: true});
    };
    useEffect(() => {
        setValue(initialTab);
    }, [initialTab]);
    return (
        <Box sx={{width: "100%"}}>
            <Box sx={{borderBottom: 1, borderColor: "divider"}}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    <Tab label="Обзор" {...a11yProps(0)} />
                    <Tab label="Документы" {...a11yProps(1)} />
                    <Tab label="Проблемы" {...a11yProps(2)} />
                    <Tab label="Задачи" {...a11yProps(3)} />
                    <Tab label="Заявки" {...a11yProps(4)} />
                    <Tab label="Заметки" {...a11yProps(5)} />
                </Tabs>
            </Box>
            <CustomTabPanel value={value} index={0}>
                <MachineryReport/>
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
                <MachineryDetailsDocs/>
            </CustomTabPanel>
            <CustomTabPanel value={value} index={2}>
                <Problems problems={machinery?.problems || null}/>
            </CustomTabPanel>
            <CustomTabPanel value={value} index={3}>
                <TaskList/>
            </CustomTabPanel>
            <CustomTabPanel value={value} index={4}>
                Заявки
            </CustomTabPanel>
            <CustomTabPanel value={value} index={5}>
                <Comments comments={machinery?.comments || null}/>
            </CustomTabPanel>
        </Box>
    );
};

export default MachineryDetailsTabs;