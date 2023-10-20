import React, {FC} from "react";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Unstable_Grid2";
import {deepPurple} from "@mui/material/colors";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import {CENTER, SECONDARY_TEXT_COLOR, SPACE_BETWEEN, START} from "../utils/const";
import {useAppSelector} from "../hooks/redux";
import {IComment} from "../models/iComents";
import {getAllUserById} from "../store/selectors/auth";
import {convertMillisecondsToDate} from "../utils/services";

interface IProps extends IComment {
    userId: string
}

const InvoiceDetailsCommentsItem: FC<IProps> = ({
                                                    authorId,
                                                    text,
                                                    dateCreation,
                                                }) => {
    const user = useAppSelector(state => getAllUserById(state, authorId));
    return (
        <Stack spacing={2}>
            <Grid container spacing={1} alignItems={CENTER} justifyContent={SPACE_BETWEEN}>
                <Grid container alignItems={CENTER} justifyContent={START} spacing={1}>
                    <Avatar sx={{bgcolor: deepPurple[500]}}>
                        {`${user.firstName.split("")[0]}${user.middleName.split("")[0]}`}
                    </Avatar>
                    <Stack ml={1}>
                        <Typography fontSize={"14px"}>
                            {`${user.firstName} ${user.middleName}`}
                        </Typography>
                        <Typography fontSize={"12px"} color={SECONDARY_TEXT_COLOR}>
                            {convertMillisecondsToDate(dateCreation)}
                        </Typography>
                    </Stack>
                </Grid>
            </Grid>
            <Typography fontSize={"18px"} fontWeight={500}>
                {text}
            </Typography>
        </Stack>
    );
};

export default InvoiceDetailsCommentsItem;