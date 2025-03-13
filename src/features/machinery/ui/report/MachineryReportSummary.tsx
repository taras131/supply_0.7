import React from "react";
import {
    getCurrentMachineryId,
    getCurrentMachineryProblems,
    getLastMaintenance,
    getUpcomingMaintenance,
} from "../../model/selectors";
import {useAppSelector} from "../../../../hooks/redux";
import ProblemReportItem from "../problems/ProblemReportItem";
import Card from "@mui/material/Card";
import {IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography} from "@mui/material";
import TaskReportItem from "../tasks/TaskReportItem";
import ProblemCard from "../problems/ProblemCard";
import {useProblemDrawer} from "../../../../hooks/useProblemDrawer";
import AddBoxIcon from "@mui/icons-material/AddBox";
import {useNavigate} from "react-router-dom";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";

const MachineryReportSummary = () => {
    const navigate = useNavigate();
    const upcomingMaintenance = useAppSelector(getUpcomingMaintenance);
    const lastMaintenance = useAppSelector(getLastMaintenance);
    const currentMachineryId = useAppSelector(getCurrentMachineryId);
    const problems = useAppSelector(getCurrentMachineryProblems);
    const {drawerState, openDrawer, closeDrawer} = useProblemDrawer();
    const handleProblemClick = (problemId: number) => () => {
        openDrawer("view", problemId);
    };
    const createTaskClickHandler = () => {
        navigate(`/machinery/add_problem/${currentMachineryId}`, {
            state: {taskTypeId: 1},
        });
    };
    const lastProblemList = problems.slice(0, 3).map(problem => (
        <ProblemReportItem key={problem.id}
                           problem={problem}
                           handleProblemClick={handleProblemClick(problem.id)}/>
    ));
    return (
        <Card sx={{padding: "24px"}}>
            <Typography variant="h6" color="primary">Последние проблемы:</Typography>
            <List sx={{width: "100%", backgroundColor: "background.paper"}}>
                {lastProblemList}
            </List>
            <Typography mt={2} variant="h6" color="primary">ТО:</Typography>
            <List sx={{width: "100%", backgroundColor: "background.paper"}}>
                {lastMaintenance
                    ? (<TaskReportItem key={lastMaintenance.id} taskId={lastMaintenance.id}/>)
                    : (<ListItem>
                        <ListItemIcon>
                            <WarningAmberIcon color={"warning"}/>
                        </ListItemIcon>
                        <ListItemText primary="ТО ещё не проводились"/>
                    </ListItem>)}
                {upcomingMaintenance
                    ? (<TaskReportItem key={upcomingMaintenance.id} taskId={upcomingMaintenance.id}/>)
                    : (<ListItem>
                        <ListItemIcon onClick={createTaskClickHandler} sx={{cursor: "pointer"}}>
                            <AddBoxIcon color={"primary"}/>
                        </ListItemIcon>
                        <ListItemText primary="Нет запланированных ТО"/>
                    </ListItem>)}
            </List>
            {drawerState.isOpen && drawerState.problemId && drawerState.mode === "view" && (
                <ProblemCard
                    isOpen={drawerState.isOpen}
                    onClose={closeDrawer}
                    currentProblemId={drawerState.problemId}
                />
            )}
        </Card>
    );
};

export default MachineryReportSummary;