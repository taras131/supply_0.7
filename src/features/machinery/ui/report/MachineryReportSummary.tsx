import React from "react";
import {getCurrentMachineryProblems, getLastMaintenance, getUpcomingMaintenance} from "../../model/selectors";
import {useAppSelector} from "../../../../hooks/redux";
import ProblemReportItem from "../problems/ProblemReportItem";
import Card from "@mui/material/Card";
import {Stack, Typography} from "@mui/material";
import {convertMillisecondsToDate} from "../../../../utils/services";
import Box from "@mui/material/Box";

const MachineryReportSummary = () => {
    const upcomingMaintenance = useAppSelector(getUpcomingMaintenance);
    const lastMaintenance = useAppSelector(getLastMaintenance);
    const problems = useAppSelector(getCurrentMachineryProblems);
    const lastProblemList = problems.slice(0,3).map(problem => (<ProblemReportItem key={problem.id} problem={problem}/>))
    return (
        <Card sx={{padding: "24px"}}>
            <Typography variant="h6" color="primary">Последние проблемы:</Typography>
            <Stack sx={{marginTop: "8px"}}>
                {lastProblemList}
            </Stack>
            <Typography mt={2} variant="h6" color="primary">Последние ТО:</Typography>
            {lastMaintenance
                ? (<Box sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    width: "100%",
                    padding: "8px",
                    gap: "8px",
                    borderBottom: "1px solid lightGray",
                    marginTop: "8px",
                }}>
                    <Typography variant="subtitle2">
                        {convertMillisecondsToDate(lastMaintenance.updated_date)}
                    </Typography>
                    <Typography variant="subtitle2">
                        {lastMaintenance.title}
                    </Typography>
                    <Typography variant="subtitle2">
                        {lastMaintenance.result_odometer} км.
                    </Typography>
                    <Typography variant="subtitle2">
                        {lastMaintenance.result_operating} ч.
                    </Typography>
                </Box>)
                : (<Typography variant="subtitle2">ТО ещё не проводились</Typography>)}
            <Typography mt={2} variant="h6" color="primary">Предстоящее ТО:</Typography>
            {upcomingMaintenance
                ? (<Box sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    width: "100%",
                    padding: "8px",
                    gap: "8px",
                    borderBottom: "1px solid lightGray",
                    marginTop: "8px",
                }}>
                    <Typography variant="subtitle2">
                        {convertMillisecondsToDate(upcomingMaintenance.due_date)}
                    </Typography>
                    <Typography variant="subtitle2">
                        {upcomingMaintenance.title}
                    </Typography>
                    <Typography variant="subtitle2">
                        {upcomingMaintenance.result_odometer} км.
                    </Typography>
                    <Typography variant="subtitle2">
                        {upcomingMaintenance.result_operating} ч.
                    </Typography>
                </Box>)
                : (<Typography variant="subtitle2">Нет запланированных ТО</Typography>)}
        </Card>
    );
};

export default MachineryReportSummary;