import React, { FC } from "react";
import { IMachinery } from "../models/iMachinery";
import { Badge, Chip, IconButton, Stack, TableCell, TableRow, Tooltip, Typography, useMediaQuery } from "@mui/material";
import {
  CENTER,
  END,
  INHERIT,
  LEFT,
  RIGHT,
  ROW,
  SPACE_BETWEEN,
  SUCCESS,
  StyledTableCell,
  StyledTableRow,
  StyledBadge,
  CURSOR_POINTER,
} from "../styles/const";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { COPY_TEXT, MESSAGE_SEVERITY, VIN_COPY_TEXT } from "../utils/const";
import { setMessage } from "../store/reducers/message";
import { useAppDispatch } from "../hooks/redux";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { routes } from "../utils/routes";
import { useNavigate } from "react-router-dom";

interface IProps {
  machinery: IMachinery;
}

const MachineryListItem: FC<IProps> = ({ machinery }) => {
  const matches_1050 = useMediaQuery("(min-width:1050px)");
  const matches_700 = useMediaQuery("(min-width:700px)");
  const navigate = useNavigate();
  const matches_600 = useMediaQuery("(min-width:600px)");
  const matches_500 = useMediaQuery("(min-width:500px)");
  const matches_450 = useMediaQuery("(min-width:450px)");
  const dispatch = useAppDispatch();
  const handleVINClick = () => {
    navigator.clipboard.writeText(machinery.vin);
    dispatch(setMessage({ text: VIN_COPY_TEXT, severity: MESSAGE_SEVERITY.success }));
  };
  const handleMoreClick = () => {
    navigate(`${routes.machinery}/${machinery.id}`);
  };
  const activeNoticeCount = machinery.notices?.filter((notice) => notice.isActive).length || 0;
  return (
    <StyledTableRow sx={{ width: "100%" }}>
      <StyledTableCell component="th" scope="row" sx={{ padding: matches_700 ? "8px" : "4px" }} align={LEFT}>
        {machinery.brand}
      </StyledTableCell>
      <StyledTableCell sx={{ padding: matches_700 ? "8px" : "1px" }} align={LEFT}>
        {machinery.model}
      </StyledTableCell>
      <StyledTableCell
        sx={{ cursor: CURSOR_POINTER, color: INHERIT, padding: matches_1050 ? "8px" : 0 }}
        align={RIGHT}
        onClick={handleVINClick}
      >
        <Tooltip title={COPY_TEXT}>
          <Stack sx={{ width: "100%" }} direction={ROW} alignItems={CENTER} justifyContent={END} spacing={1}>
            <Typography>{machinery.vin}</Typography>
            {matches_700 && <ContentCopyIcon color={SUCCESS} />}
          </Stack>
        </Tooltip>
      </StyledTableCell>
      {matches_500 && (
        <StyledTableCell sx={{ padding: matches_700 ? "8px" : "1px" }} align={CENTER}>
          {machinery.yearManufacture}
        </StyledTableCell>
      )}
      {matches_450 && (
        <StyledTableCell sx={{ padding: matches_700 ? "8px" : "1px" }} align={CENTER}>
          {matches_600 ? machinery.stateNumber : machinery.stateNumber.slice(1, 4)}
        </StyledTableCell>
      )}
      {matches_700 && (
        <StyledTableCell sx={{ padding: matches_700 ? "8px" : "1px" }} align={CENTER}>
          {machinery.type}
        </StyledTableCell>
      )}
      {matches_700 && (
        <StyledTableCell sx={{ padding: matches_700 ? "8px" : "1px" }} align={CENTER}>
          {activeNoticeCount ? (
            <Badge
              sx={{ cursor: "pointer" }}
              badgeContent={activeNoticeCount}
              color="primary"
              onClick={handleMoreClick}
            />
          ) : (
            "Нет"
          )}
        </StyledTableCell>
      )}
      <StyledTableCell sx={{ padding: matches_700 ? "8px" : 0 }} align={CENTER}>
        <IconButton aria-label="show more" onClick={handleMoreClick} sx={{ padding: 0 }}>
          <MoreVertIcon color={SUCCESS} />
        </IconButton>
      </StyledTableCell>
    </StyledTableRow>
  );
};

export default MachineryListItem;
