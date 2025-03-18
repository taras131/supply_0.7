import React, {useEffect} from "react";
import {useAppDispatch} from "../../../hooks/redux";
import {useParams} from "react-router-dom";
import {Stack, useMediaQuery} from "@mui/material";
import {fetchGetMachineryById} from "../model/actions";
import MachineryDetailsHeader from "./MachineryDetailsHeader";
import MachineryDetailsTabs from "./MachineryDetailsTabs";

const MachineryDetailsPage = () => {
    const dispatch = useAppDispatch();
    const machineryId = useParams().machineryId || "0";
    const matches_850 = useMediaQuery("(max-width:850px)");
    useEffect(() => {
        dispatch(fetchGetMachineryById(+machineryId));
    }, [dispatch, machineryId]);
    return (
        <Stack sx={{
            maxWidth: "1350px",
            width: "100%",
            marginLeft: "auto",
            marginRight: "auto",
        }}
               spacing={matches_850 ? 1 : 3}>
            <MachineryDetailsHeader/>
            <MachineryDetailsTabs/>
        </Stack>
    );
};

export default MachineryDetailsPage;
