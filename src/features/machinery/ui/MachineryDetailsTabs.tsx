import React, {FC, useState} from "react";
import Box from "@mui/material/Box";
import {Stack, Tab, Tabs} from "@mui/material";
import MachineryDetailsDocs from "./MachineryDetailsDocs";
import Comments from "../../../components/common/comments/Comments";
import Button from "@mui/material/Button";
import {MachineryStatus} from "../../../utils/const";
import { MachineryStatusType} from "../../../models/iMachinery";
import {
    fetchAddMachineryComment,
    fetchDeleteMachineryComment,
    fetchUpdateMachinery,
    fetchUpdateMachineryComment,
} from "../model/actions";
import {IComment, INewComment} from "../../../models/iComents";
import {useAppDispatch, useAppSelector} from "../../../hooks/redux";
import {getCurrentMachinery, getMachineryIsLoading} from "../model/selectors";
import {TaskList} from "./tasks/TasksList";

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
    const isLoading = useAppSelector(getMachineryIsLoading);
    const machinery = useAppSelector(getCurrentMachinery);
    const dispatch = useAppDispatch();
    const [value, setValue] = useState<number>(0);
    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };
    const changeMachineryStatusHandler = () => {
        let newStatus: MachineryStatusType = MachineryStatus.disActive;
        if (machinery.status && machinery.status === MachineryStatus.disActive) {
            newStatus = MachineryStatus.active;
        }
        dispatch(fetchUpdateMachinery({...machinery, status: newStatus}));
    };
    const addComment = (text: string) => {
        const newComment: INewComment = {
            text: text,
            is_active: true,
            author_id: 1,
            machinery_id: +machinery.id,
        };
        dispatch(fetchAddMachineryComment(newComment));
    };

    const deleteComment = (comment_id: number) => {
        dispatch(fetchDeleteMachineryComment(comment_id));
    };

    const updateComment = (comment: IComment) => {
        dispatch(fetchUpdateMachineryComment(comment));
    };
    return (
        <Box sx={{width: "100%"}}>
            <Box sx={{borderBottom: 1, borderColor: "divider"}}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    <Tab label="Документы" {...a11yProps(0)} />
                    <Tab label="Заметки" {...a11yProps(1)} />
                    <Tab label="Задачи" {...a11yProps(2)} />
                    <Tab label="Заявки" {...a11yProps(3)} />
                    <Tab label="Действия" {...a11yProps(4)} />
                </Tabs>
            </Box>
            <CustomTabPanel value={value} index={0}>
                {machinery  && (
                    <MachineryDetailsDocs/>
                )}
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
                <Comments comments={machinery?.comments || null}
                          addComment={addComment}
                          deleteComment={deleteComment}
                          updateComment={updateComment}/>
            </CustomTabPanel>
            <CustomTabPanel value={value} index={2}>
                <TaskList/>
            </CustomTabPanel>
            <CustomTabPanel value={value} index={3}>
                Заявки
            </CustomTabPanel>
            <CustomTabPanel value={value} index={4}>
                <Stack>
                    <Button variant="contained"
                            color={machinery && machinery.status && machinery.status === MachineryStatus.disActive
                                ? "success"
                                : "error"}
                            disabled={isLoading}
                            onClick={changeMachineryStatusHandler}
                            sx={{width: "150px"}}>
                        {machinery && machinery.status && machinery.status === MachineryStatus.disActive
                            ? "Востановить"
                            : "Списать"
                        }
                    </Button>
                </Stack>
            </CustomTabPanel>
        </Box>
    );
};

export default MachineryDetailsTabs;