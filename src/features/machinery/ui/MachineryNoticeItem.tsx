import React, { FC } from "react";
import { INotice } from "../../../models/iMachinery";
import { IconButton, ListItem, ListItemText, Switch } from "@mui/material";
import { convertMillisecondsToDate } from "../../../utils/services";
import DeleteIcon from "@mui/icons-material/Delete";

interface IProps {
  notice: INotice;
  deleteNotice: () => void;
  toggleIsActive: () => void;
}

const MachineryNoticeItem: FC<IProps> = ({ notice, deleteNotice, toggleIsActive }) => {
  return (
    <ListItem
      sx={{ opacity: notice.isActive ? 1 : 0.6 }}
      secondaryAction={
        <IconButton edge="end" aria-label="delete" onClick={deleteNotice}>
          <DeleteIcon />
        </IconButton>
      }
    >
      <Switch
        edge="start"
        onChange={toggleIsActive}
        checked={notice.isActive}
        inputProps={{
          "aria-labelledby": "switch-list-label-wifi",
        }}
      />
      <ListItemText id="switch-list-label-notice" primary={`${notice.text}`} />
    </ListItem>
  );
};

export default MachineryNoticeItem;
