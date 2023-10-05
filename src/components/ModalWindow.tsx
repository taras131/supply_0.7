import React, {FC} from 'react';
import {Modal} from "@mui/material";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import CloseIcon from '@mui/icons-material/Close';
import Grid from "@mui/material/Unstable_Grid2";

interface IProps {
    isOpenModal: boolean
    handleToggleOpen: () => void
    children: React.ReactNode
}

const modalStyle = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 2,
};

const ModalWindow: FC<IProps> = ({isOpenModal, handleToggleOpen, children}) => {
    return (
        <Modal
            open={isOpenModal}
            onClose={handleToggleOpen}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={modalStyle}>
                <Grid container justifyContent="end">
                    <IconButton aria-label="close" onClick={handleToggleOpen}>
                        <CloseIcon/>
                    </IconButton>
                </Grid>
                {children}
            </Box>
        </Modal>
    );
};

export default ModalWindow;