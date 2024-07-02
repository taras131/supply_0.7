import React, { FC } from "react";
import ModalWindow from "./ModalWindow";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";

interface IMessageWindowProps {
  isOpenModal: boolean;
  message: string;
  handleToggleOpen: () => void;
}

const MessageWindow: FC<IMessageWindowProps> = ({ isOpenModal, message, handleToggleOpen }) => {
  const handleOkClick = () => {
    handleToggleOpen();
  };
  return (
    <ModalWindow handleToggleOpen={handleToggleOpen} isOpenModal={isOpenModal} title={"Внимание"}>
      <Stack spacing={2}>
        <Typography fontSize="20px">{message}</Typography>
        <Button onClick={handleOkClick}>Хорошо</Button>
      </Stack>
    </ModalWindow>
  );
};

export default MessageWindow;
