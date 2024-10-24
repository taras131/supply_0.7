import React, { FC } from "react";
import { TextField } from "@mui/material";
import { NONE } from "styles/const";
import { updateCurrentOrderTitle } from "features/orders/model/slice";
import { useAppDispatch } from "hooks/redux";
import Box from "@mui/material/Box";

interface IProps {
  title: string;
}

const OrderDetailsEditTitle: FC<IProps> = ({ title }) => {
  const dispatch = useAppDispatch();
  const handleTitleChange = (e: any) => {
    dispatch(updateCurrentOrderTitle(e.target.value));
  };
  return (
    <Box sx={{ width: "100%" }} pt={1}>
      <TextField
        value={title}
        name={"title"}
        onChange={handleTitleChange}
        margin={NONE}
        fullWidth
        label={"Заголовок заявки"}
      />
    </Box>
  );
};

export default OrderDetailsEditTitle;
