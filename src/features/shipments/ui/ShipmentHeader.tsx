import React, { FC } from "react";
import Grid from "@mui/material/Unstable_Grid2";
import { IconButton, Stack, Typography, useMediaQuery } from "@mui/material";
import { convertMillisecondsToDate, deleteYearFromString } from "utils/services";
import AirplanemodeActiveIcon from "@mui/icons-material/AirplanemodeActive";
import DirectionsSubwayIcon from "@mui/icons-material/DirectionsSubway";
import { IShipments } from "models/iShipments";
import { CENTER, COMPONENT_A, END, ROW, SPACE_BETWEEN, START } from "styles/const";
import DownloadIcon from "@mui/icons-material/Download";

interface IProps {
  shipment: IShipments;
}

const ShipmentHeader: FC<IProps> = ({ shipment }) => {
  const matches_430 = useMediaQuery("(min-width:420px)");
  const matches_600 = useMediaQuery("(min-width:600px)");
  const matches_700 = useMediaQuery("(min-width:700px)");
  const matches_730 = useMediaQuery("(min-width:730px)");
  const createdDate = convertMillisecondsToDate(shipment.author.dateCreating);
  const handleDownloadClick = (e: any) => {
    e.stopPropagation();
  };
  return (
    <Grid sx={{ width: "100%" }} alignItems={CENTER} container spacing={matches_600 ? 1 : 0} columns={18} pr={1}>
      {matches_430 && (
        <Grid xs={2}>
          <Typography sx={{ flexShrink: 0 }} fontWeight={600}>
            {matches_730 ? createdDate : deleteYearFromString(createdDate)}
          </Typography>
        </Grid>
      )}
      <Grid xs={matches_430 ? 8 : 9}>
        <Stack direction={ROW} alignItems={CENTER} justifyContent={SPACE_BETWEEN} sx={{ width: "100%" }}>
          <Typography sx={{ flexShrink: 0 }} fontWeight={600}>
            {shipment.transporter}
          </Typography>
          {shipment.ladingNumberFilePath && (
            <IconButton
              sx={{ padding: 0 }}
              color="primary"
              aria-label="download lading number"
              component={COMPONENT_A}
              onClick={handleDownloadClick}
              href={shipment.ladingNumberFilePath}
              target="_blank"
            >
              <DownloadIcon />
            </IconButton>
          )}
        </Stack>
      </Grid>
      <Grid xs={matches_430 ? 7 : 8}>
        <Typography sx={{ flexShrink: 0 }} fontWeight={600} ml={1}>
          {shipment.ladingNumber}
        </Typography>
      </Grid>
      <Grid xs={1} sx={{ margin: 0, padding: 0 }}>
        <Stack alignItems={CENTER} justifyContent={CENTER}>
          {shipment.type === "air" ? <AirplanemodeActiveIcon /> : <DirectionsSubwayIcon />}
        </Stack>
      </Grid>
    </Grid>
  );
};

export default ShipmentHeader;
